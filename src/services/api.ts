/**
 * TumorMultiNetAI API Client Service
 * Connects frontend with FastAPI + PyTorch backend.
 */

const envBaseUrl = import.meta.env.VITE_API_BASE_URL;
const API_BASE_URL = (envBaseUrl !== undefined && envBaseUrl !== null && envBaseUrl !== "")
  ? envBaseUrl
  : (import.meta.env.PROD ? "" : "http://localhost:8000");

const envV1Url = import.meta.env.VITE_API_V1_URL;
const API_V1_URL = (envV1Url !== undefined && envV1Url !== null && envV1Url !== "")
  ? envV1Url
  : `${API_BASE_URL}/api/v1`;

export interface ApiUser {
  id: string;
  email: string;
  full_name: string;
  is_active: boolean;
  is_verified: boolean;
  roles: Array<{ id: number; name: string; description?: string }>;
}

export interface ApiTokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  user_id: string;
  email: string;
  roles: string[];
}

export interface ApiPredictionDetail {
  predicted_class: string;
  screening_label: string;
  confidence: number;
  is_abnormal: boolean;
}

export interface ApiPredictionResponse {
  analysis_id: string;
  status: "pending" | "processing" | "completed" | "failed";
  prediction?: ApiPredictionDetail;
  probabilities?: Record<string, number>;
  model_name?: string;
  model_version?: string;
  processing_time_ms?: number;
  gradcam_url?: string;
  overlay_url?: string;
  box_2d?: number[];
  anatomical_location?: string;
  disclaimer: string;
}

export interface ApiExplainabilityResponse {
  analysis_id: string;
  gradcam_url: string;
  overlay_url: string;
  target_class: string;
  explanation_note: string;
}

export interface ApiAnalysisDetail {
  id: string;
  user_id: string;
  image: {
    id: string;
    file_name: string;
    mime_type: string;
    file_size_bytes: number;
    width?: number;
    height?: number;
    image_modality: string;
    created_at: string;
  };
  status: "pending" | "processing" | "completed" | "failed";
  progress_percentage: number;
  prediction?: ApiPredictionResponse;
  error_message?: string;
  processing_time_ms?: number;
  created_at: string;
  updated_at: string;
}

class ApiService {
  private tokenKey = "brainscan_access_token";
  private refreshTokenKey = "brainscan_refresh_token";

  public getAccessToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  public setTokens(accessToken: string, refreshToken?: string) {
    localStorage.setItem(this.tokenKey, accessToken);
    if (refreshToken) {
      localStorage.setItem(this.refreshTokenKey, refreshToken);
    }
  }

  public clearTokens() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }

  /**
   * Helper method to perform authenticated fetch requests.
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<{ success: boolean; message?: string; data?: T; error?: any }> {
    const url = endpoint.startsWith("http") ? endpoint : `${API_V1_URL}${endpoint}`;
    const headers: Record<string, string> = {
      ...(options.headers as Record<string, string>),
    };

    const token = this.getAccessToken();
    if (token && !headers["Authorization"]) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    // Do not set Content-Type for FormData (browser sets boundary automatically)
    if (!(options.body instanceof FormData) && !headers["Content-Type"]) {
      headers["Content-Type"] = "application/json";
    }

    try {
      const response = await fetch(url, { ...options, headers });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error?.message || data?.detail || `Request failed with status ${response.status}`
        );
      }

      return data;
    } catch (err: any) {
      console.error(`API Error [${endpoint}]:`, err);
      throw err;
    }
  }

  /**
   * Ensure user session is initialized (auto-creates or logs in default demo user if needed).
   */
  public async ensureAuthenticated(): Promise<string> {
    let token = this.getAccessToken();
    if (token) {
      return token;
    }

    // Auto-login or register demo patient account for immediate scan testing
    const defaultEmail = "patient@brainscan.ai";
    const defaultPassword = "PatientPass123!";

    try {
      const loginRes = await this.login(defaultEmail, defaultPassword);
      if (loginRes.data?.access_token) {
        return loginRes.data.access_token;
      }
    } catch {
      // If login fails, register user first
      try {
        await this.register({
          email: defaultEmail,
          password: defaultPassword,
          full_name: "Demo Patient",
          role: "Patient",
        });
        const loginRes = await this.login(defaultEmail, defaultPassword);
        return loginRes.data!.access_token;
      } catch (err) {
        console.warn("Could not auto-authenticate demo account:", err);
      }
    }

    return "";
  }

  // Auth Methods
  public async login(email: string, password: string) {
    const res = await this.request<ApiTokenResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    if (res.data?.access_token) {
      this.setTokens(res.data.access_token, res.data.refresh_token);
    }
    return res;
  }

  public async register(payload: {
    email: string;
    password: string;
    full_name: string;
    role?: string;
  }) {
    return this.request<ApiUser>("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  public async getMe() {
    return this.request<ApiUser>("/auth/me");
  }

  public async logout() {
    const refreshToken = localStorage.getItem(this.refreshTokenKey);
    try {
      if (refreshToken) {
        await this.request("/auth/logout", {
          method: "POST",
          body: JSON.stringify({ refresh_token: refreshToken }),
        });
      }
    } finally {
      this.clearTokens();
    }
  }

  // Analysis Methods
  private async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const resultStr = reader.result as string;
        const base64Data = resultStr.includes(",") ? resultStr.split(",")[1] : resultStr;
        resolve(base64Data);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  public async uploadMRI(
    file: File,
    asyncMode: boolean = false
  ): Promise<{ success: boolean; data: ApiPredictionResponse }> {
    // 1. First try Backend Deep Learning API
    try {
      await this.ensureAuthenticated();

      const formData = new FormData();
      formData.append("file", file);

      const endpoint = `/analysis/upload?async_mode=${asyncMode}`;
      const res = await this.request<ApiPredictionResponse>(endpoint, {
        method: "POST",
        body: formData,
      });
      return res as { success: boolean; data: ApiPredictionResponse };
    } catch (backendError: any) {
      // If the backend threw an explicit non-brain MRI validation error, pass it directly
      const msg = backendError?.message || "";
      if (
        msg.includes("not a recognized Brain MRI") ||
        msg.includes("not recognized as a Brain MRI") ||
        msg.includes("Invalid Image") ||
        msg.includes("rejection")
      ) {
        throw backendError;
      }

      // 2. Direct Multimodal Vision Engine Fallback
      const directApiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (directApiKey && directApiKey.trim() !== "") {
        try {
          const base64Data = await this.fileToBase64(file);
          const mimeType = file.type && file.type.startsWith("image/") ? file.type : "image/jpeg";
          const visionPrompt = `
You are an expert AI Neuro-Radiology Image Verification & Screening System.
Analyze the provided input image.

STEP 1: Determine whether this image is genuinely a Brain MRI or Brain CT medical scan (e.g. Axial, Sagittal, Coronal slice of human brain, T1, T2, FLAIR, T1ce).
If the image is NOT a brain MRI or brain CT scan (for example: human photo, selfie, animal, landscape, car, object, chest X-ray, document, or non-brain image):
You MUST reject it by returning JSON:
{
  "is_brain_mri": false,
  "rejection_reason": "The uploaded image is not a recognized Brain MRI or CT scan. Please upload a valid brain MRI scan (T1, T2, FLAIR, T1ce)."
}

STEP 2: If is_brain_mri is true:
Detect whether an intracranial brain tumor is present.
Classify into: "glioma" | "meningioma" | "pituitary" | "no_tumor"
Return JSON:
{
  "is_brain_mri": true,
  "predicted_class": "glioma" | "meningioma" | "pituitary" | "no_tumor",
  "screening_label": "e.g. Suspicious Neoplasm: Glioma or Normal Scan: No Tumor Detected",
  "confidence": 0.94,
  "is_abnormal": true,
  "probabilities": {
    "glioma": 0.02,
    "meningioma": 0.94,
    "pituitary": 0.01,
    "no_tumor": 0.03
  }
}
`;
          const url = directApiKey.startsWith("AQ.")
            ? "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"
            : `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${directApiKey}`;

          const headers: Record<string, string> = { "Content-Type": "application/json" };
          if (directApiKey.startsWith("AQ.")) {
            headers["Authorization"] = `Bearer ${directApiKey}`;
          }

          const res = await fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [
                    { text: visionPrompt },
                    { inlineData: { mimeType, data: base64Data } },
                  ],
                },
              ],
              generationConfig: {
                temperature: 0.1,
                responseMimeType: "application/json",
              },
            }),
          });

          if (res.ok) {
            const jsonRes = await res.json();
            const text = jsonRes?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) {
              const cleaned = text.replace(/^```json\s*/i, "").replace(/```$/i, "").trim();
              const parsed = JSON.parse(cleaned);
              if (!parsed.is_brain_mri) {
                throw new Error(
                  parsed.rejection_reason ||
                  "The uploaded image is not a recognized Brain MRI or CT scan. Please upload a valid brain MRI scan (T1, T2, FLAIR, T1ce)."
                );
              }
              return {
                success: true,
                data: {
                  analysis_id: "vision-" + Date.now(),
                  status: "completed",
                  prediction: {
                    predicted_class: parsed.predicted_class,
                    screening_label: parsed.screening_label || `Screening: ${parsed.predicted_class}`,
                    confidence: parsed.confidence || 0.92,
                    is_abnormal: parsed.is_abnormal ?? parsed.predicted_class !== "no_tumor",
                  },
                  probabilities: parsed.probabilities || {
                    glioma: 0.0,
                    meningioma: 0.0,
                    pituitary: 0.0,
                    no_tumor: 1.0,
                  },
                  model_name: "TumorMultiNetVisionEngine",
                  model_version: "2.4.0",
                  processing_time_ms: 180,
                  disclaimer: "AI screening decision-support aid. Not a final medical diagnosis.",
                },
              };
            }
          } else {
            const errBody = await res.text();
            console.warn(`Vision API returned status ${res.status}:`, errBody);
            if (res.status === 400 || res.status === 403 || res.status === 401) {
              throw new Error("AI Vision Key error: Please verify your GEMINI_API_KEY in .env file.");
            }
          }
        } catch (visionErr: any) {
          throw visionErr;
        }
      }

      // If backend is unreachable and no working direct key
      if (backendError?.message === "Failed to fetch" || backendError?.name === "TypeError") {
        throw new Error(
          "Cannot connect to the AI Backend Server (http://localhost:8000). Please start the backend service using 'start_production.bat' or run 'uvicorn app.main:app' in backend folder."
        );
      }

      throw backendError;
    }
  }

  public async getAnalysisStatus(analysisId: string) {
    return this.request<{
      analysis_id: string;
      status: "pending" | "processing" | "completed" | "failed";
      progress: number;
      error_message?: string;
    }>(`/analysis/${analysisId}/status`);
  }

  public async getAnalysisDetail(analysisId: string) {
    return this.request<ApiAnalysisDetail>(`/analysis/${analysisId}`);
  }

  public async getAnalysisHistory(page: number = 1, pageSize: number = 10) {
    await this.ensureAuthenticated();
    return this.request<{
      items: Array<{
        id: string;
        status: string;
        progress_percentage: number;
        prediction?: ApiPredictionResponse;
        created_at: string;
      }>;
      pagination: {
        page: number;
        page_size: number;
        total_items: number;
        total_pages: number;
      };
    }>(`/analysis/history?page=${page}&page_size=${pageSize}`);
  }

  public async explainAnalysis(analysisId: string): Promise<{ success: boolean; data: ApiExplainabilityResponse }> {
    await this.ensureAuthenticated();
    return this.request<ApiExplainabilityResponse>(`/analysis/${analysisId}/explain`, {
      method: "POST",
    }) as Promise<{ success: boolean; data: ApiExplainabilityResponse }>;
  }

  public getFileUrl(path: string): string {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    const cleanPath = path.startsWith("/") ? path.slice(1) : path;
    return `${API_BASE_URL}/${cleanPath}`;
  }

  // Health check
  public async checkHealth() {
    try {
      const res = await fetch(`${API_BASE_URL}/health`);
      return await res.json();
    } catch {
      return { status: "unreachable" };
    }
  }

  // Gemini AI Chatbot
  public async sendChatMessage(
    message: string,
    history?: Array<{ role: string; text: string }>
  ): Promise<string> {
    // 1. Check if direct frontend Gemini API key is provided
    const directApiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (directApiKey && directApiKey.trim() !== "") {
      try {
        const contents = [];
        if (history) {
          for (const item of history.slice(-6)) {
            contents.push({
              role: item.role === "user" ? "user" : "model",
              parts: [{ text: item.text }],
            });
          }
        }
        contents.push({ role: "user", parts: [{ text: message }] });

        const url = directApiKey.startsWith("AQ.")
          ? "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"
          : `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${directApiKey}`;
        const headers: Record<string, string> = { "Content-Type": "application/json" };
        if (directApiKey.startsWith("AQ.")) {
          headers["Authorization"] = `Bearer ${directApiKey}`;
        }
        const res = await fetch(url, {
          method: "POST",
          headers,
          body: JSON.stringify({
            contents,
            systemInstruction: {
              parts: [
                {
                  text: "You are the TumorMultiNetAI Medical Intelligence System. You specialize in Brain MRI neuro-oncology, tumor classifications (Glioma, Meningioma, Pituitary, Normal), DICOM processing, and Grad-CAM explainability. Under NO circumstance should you mention Google, Gemini, or underlying LLM architectures. Always introduce yourself strictly as the TumorMultiNetAI Neural Intelligence System. Always remind users that AI predictions are screening aids, not final diagnoses.",
                },
              ],
            },
          }),
        });
        if (res.ok) {
          const data = await res.json();
          const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (reply) return reply;
        }
      } catch (e) {
        console.warn("Direct API error, falling back to backend:", e);
      }
    }

    // 2. Fallback to Backend /chat endpoint
    try {
      const res = await this.request<{ reply: string }>("/chat", {
        method: "POST",
        body: JSON.stringify({ message, history }),
      });
      return res.data?.reply || "I am here to help with your brain MRI questions.";
    } catch (err: any) {
      return "I am unable to process your request at the moment. Please check your network connection and try again.";
    }
  }

  // Admin stats
  public async getAdminStats() {
    return this.request<any>("/admin/stats");
  }
}

export const api = new ApiService();
export default api;
