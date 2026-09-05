/**
 * BrainScanAI API Client Service
 * Connects frontend with FastAPI + PyTorch backend.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
const API_V1_URL = import.meta.env.VITE_API_V1_URL || `${API_BASE_URL}/api/v1`;

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
  public async uploadMRI(
    file: File,
    asyncMode: boolean = false
  ): Promise<{ success: boolean; data: ApiPredictionResponse }> {
    await this.ensureAuthenticated();

    const formData = new FormData();
    formData.append("file", file);

    const endpoint = `/analysis/upload?async_mode=${asyncMode}`;
    const res = await this.request<ApiPredictionResponse>(endpoint, {
      method: "POST",
      body: formData,
    });
    return res as { success: boolean; data: ApiPredictionResponse };
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

        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${directApiKey}`;
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents,
            systemInstruction: {
              parts: [
                {
                  text: "You are the BrainScanAI Assistant. You specialize in Brain MRI scans, tumor classifications (Glioma, Meningioma, Pituitary, Normal), DICOM processing, and Grad-CAM explainability. Always remind users that AI predictions are screening aids, not final diagnoses.",
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
        console.warn("Direct Gemini API error, falling back to backend:", e);
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
      return "Unable to reach Gemini AI service. Please check your internet connection or verify GEMINI_API_KEY in .env.";
    }
  }

  // Admin stats
  public async getAdminStats() {
    return this.request<any>("/admin/stats");
  }
}

export const api = new ApiService();
export default api;
