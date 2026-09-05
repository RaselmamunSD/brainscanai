import { useState, useEffect } from "react";
import { ArrowLeft, Target, TrendingUp, BarChart3, PieChart, Activity, Cpu, Sparkles, ShieldCheck, Zap, Server } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { performanceMetrics, classMetrics, rocCurveData, trainingHistory, confusionMatrixData } from "@/data/modelMetrics";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from "recharts";
import api from "@/services/api";

const metricCards = [
  { label: "Overall Accuracy", value: performanceMetrics.accuracy, icon: Target, color: "text-primary", badge: "Test Set Benchmark" },
  { label: "Precision Rate", value: performanceMetrics.precision, icon: TrendingUp, color: "text-cyan-500", badge: "Low False Positives" },
  { label: "Recall (Sensitivity)", value: performanceMetrics.recall, icon: Activity, color: "text-accent", badge: "High Tumor Catch" },
  { label: "Weighted F1 Score", value: performanceMetrics.f1Score, icon: BarChart3, color: "text-emerald-500", badge: "Harmonic Balance" },
];

const confusionLabels = ["Glioma", "Meningioma", "Pituitary", "No Tumor"];

const Analytics = () => {
  const [backendHealth, setBackendHealth] = useState<any>(null);

  useEffect(() => {
    api.checkHealth().then((data) => setBackendHealth(data)).catch(() => {});
  }, []);

  // Process confusion matrix for grid display
  const confusionGrid = confusionLabels.map((actual) =>
    confusionLabels.map((predicted) => {
      const cell = confusionMatrixData.find(
        (d) => d.actual === actual && d.predicted === predicted
      );
      return cell?.value || 0;
    })
  );

  const maxValue = Math.max(...confusionMatrixData.map((d) => d.value));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 sm:pt-28 pb-16">
        <div className="container mx-auto px-4">
          
          {/* Header */}
          <div className="mb-6 sm:mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-2 text-sm font-medium"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Link>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-foreground">
                Deep Learning Model Telemetry & Benchmarks
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Rigorous statistical validation and performance analytics on multimodal Brain MRI cohorts
              </p>
            </div>

            {/* Telemetry pill */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-card border border-border text-xs font-semibold shadow-sm">
              <Server className="h-4 w-4 text-primary" />
              <span>Model: ResNet-50 v1.0.0</span>
            </div>
          </div>

          {/* Key Metrics KPI Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-8">
            {metricCards.map((metric) => (
              <Card key={metric.label} className="glass-panel border border-border/80 hover-lift">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 rounded-xl medical-gradient text-primary-foreground shadow-sm">
                      <metric.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted font-medium text-muted-foreground">
                      {metric.badge}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-muted-foreground">{metric.label}</p>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className={`text-2xl sm:text-3xl font-extrabold ${metric.color}`}>
                      {metric.value.toFixed(1)}
                    </span>
                    <span className="text-sm font-semibold text-muted-foreground">%</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts Row 1: ROC Curve & Training History */}
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 mb-8">
            
            {/* ROC Curve */}
            <Card className="glass-panel border border-border/80">
              <CardHeader className="p-5 pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg font-bold">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Receiver Operating Characteristic (ROC)
                  </CardTitle>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-bold">
                    AUC: {performanceMetrics.auc}%
                  </span>
                </div>
              </CardHeader>
              <CardContent className="p-5 pt-2">
                <div className="h-64 sm:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={rocCurveData}>
                      <defs>
                        <linearGradient id="rocGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="fpr" 
                        label={{ value: 'False Positive Rate (1 - Specificity)', position: 'bottom', offset: -5 }}
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={11}
                      />
                      <YAxis 
                        dataKey="tpr" 
                        label={{ value: 'True Positive Rate (Sensitivity)', angle: -90, position: 'insideLeft' }}
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={11}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '10px',
                          fontSize: '12px'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="tpr" 
                        stroke="hsl(var(--primary))" 
                        fill="url(#rocGradient)"
                        strokeWidth={2.5}
                        name="Model Sensitivity"
                      />
                      <Line 
                        type="linear" 
                        dataKey="fpr" 
                        stroke="hsl(var(--muted-foreground))" 
                        strokeDasharray="4 4"
                        dot={false}
                        name="Chance Baseline"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-3 p-2.5 bg-muted/60 rounded-xl text-xs text-muted-foreground flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary shrink-0" />
                  <span>An AUC score of <strong>{performanceMetrics.auc}%</strong> confirms superior discriminatory power across all 4 tumor categories.</span>
                </div>
              </CardContent>
            </Card>

            {/* Training Convergence History */}
            <Card className="glass-panel border border-border/80">
              <CardHeader className="p-5 pb-2">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg font-bold">
                  <Activity className="h-5 w-5 text-secondary" />
                  Neural Network Training Convergence
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 pt-2">
                <div className="h-64 sm:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trainingHistory}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="epoch" 
                        label={{ value: 'Epochs (Adam Optimizer)', position: 'bottom', offset: -5 }}
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={11}
                      />
                      <YAxis 
                        yAxisId="left"
                        label={{ value: 'Cross-Entropy Loss', angle: -90, position: 'insideLeft' }}
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={11}
                      />
                      <YAxis 
                        yAxisId="right" 
                        orientation="right"
                        label={{ value: 'Validation Accuracy (%)', angle: 90, position: 'insideRight' }}
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={11}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '10px',
                          fontSize: '12px'
                        }}
                      />
                      <Line 
                        yAxisId="left" 
                        type="monotone" 
                        dataKey="trainLoss" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                        name="Train Loss"
                        dot={false}
                      />
                      <Line 
                        yAxisId="left" 
                        type="monotone" 
                        dataKey="valLoss" 
                        stroke="hsl(var(--secondary))" 
                        strokeWidth={2}
                        strokeDasharray="4 4"
                        name="Val Loss"
                        dot={false}
                      />
                      <Line 
                        yAxisId="right" 
                        type="monotone" 
                        dataKey="valAcc" 
                        stroke="hsl(var(--success))" 
                        strokeWidth={2.5}
                        name="Val Accuracy (%)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-3 p-2.5 bg-muted/60 rounded-xl text-xs text-muted-foreground flex items-center gap-2">
                  <Zap className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Early stopping triggered at epoch 30 with minimal generalization gap (0.8%).</span>
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Charts Row 2: Confusion Matrix & Per-Class Performance */}
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 mb-8">
            
            {/* Confusion Matrix */}
            <Card className="glass-panel border border-border/80">
              <CardHeader className="p-5 pb-2">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg font-bold">
                  <PieChart className="h-5 w-5 text-accent" />
                  Multiclass Confusion Matrix
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5">
                <div className="overflow-x-auto">
                  <div className="min-w-[320px]">
                    <div className="grid grid-cols-5 gap-1.5">
                      <div className="p-2 text-xs font-bold text-muted-foreground text-center">True \ Pred</div>
                      {confusionLabels.map((label) => (
                        <div key={`col-${label}`} className="p-2 text-xs font-bold text-primary text-center truncate">
                          {label}
                        </div>
                      ))}

                      {confusionGrid.map((row, i) => (
                        <>
                          <div key={`row-lbl-${i}`} className="p-2 text-xs font-bold text-foreground flex items-center">
                            {confusionLabels[i]}
                          </div>
                          {row.map((value, j) => {
                            const intensity = value / maxValue;
                            const isDiagonal = i === j;
                            return (
                              <div
                                key={`cell-${i}-${j}`}
                                className="aspect-square flex flex-col items-center justify-center rounded-xl transition-all shadow-sm"
                                style={{
                                  backgroundColor: isDiagonal
                                    ? `hsl(var(--primary) / ${0.25 + intensity * 0.75})`
                                    : `hsl(var(--destructive) / ${0.1 + intensity * 0.5})`,
                                  color: intensity > 0.4 ? "white" : "hsl(var(--foreground))",
                                }}
                              >
                                <span className="font-mono font-extrabold text-sm">{value}</span>
                                <span className="text-[9px] opacity-75">{isDiagonal ? "True Pos" : "Error"}</span>
                              </div>
                            );
                          })}
                        </>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Per-Class Metrics */}
            <Card className="glass-panel border border-border/80">
              <CardHeader className="p-5 pb-2">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg font-bold">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Per-Class Precision, Recall & F1
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5">
                <div className="h-64 sm:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={classMetrics} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis type="number" domain={[90, 100]} stroke="hsl(var(--muted-foreground))" fontSize={11} />
                      <YAxis dataKey="name" type="category" width={85} stroke="hsl(var(--muted-foreground))" fontSize={11} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '10px',
                          fontSize: '12px'
                        }}
                      />
                      <Bar dataKey="precision" name="Precision (%)" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                      <Bar dataKey="recall" name="Recall (%)" fill="hsl(var(--secondary))" radius={[0, 4, 4, 0]} />
                      <Bar dataKey="f1" name="F1 Score (%)" fill="hsl(var(--accent))" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Architecture Specifications Card */}
          <Card className="glass-panel border border-border/80">
            <CardHeader className="p-5">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Cpu className="h-5 w-5 text-primary" />
                Inference Engine & Preprocessing Architecture
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0">
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-muted/60 border border-border">
                  <h4 className="text-sm font-bold text-foreground mb-1">Deep Learning Backbone</h4>
                  <p className="text-xs text-muted-foreground">
                    ResNet-50 with 4 Conv Blocks, AdaptiveAvgPool2d, and a 4-class classification head fine-tuned on multimodal MRI datasets.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-muted/60 border border-border">
                  <h4 className="text-sm font-bold text-foreground mb-1">Preprocessing & Normalization</h4>
                  <p className="text-xs text-muted-foreground">
                    224x224 interpolation, CLAHE contrast enhancement on the L-channel, and ImageNet distribution standardisation.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-muted/60 border border-border">
                  <h4 className="text-sm font-bold text-foreground mb-1">Explainable AI (Grad-CAM)</h4>
                  <p className="text-xs text-muted-foreground">
                    Gradient extraction on the final convolutional layer producing Jet Colormap activation heatmaps and blended overlays.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Analytics;
