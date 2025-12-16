import { ArrowLeft, Target, TrendingUp, BarChart3, PieChart, Activity } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { performanceMetrics, classMetrics, rocCurveData, trainingHistory, confusionMatrixData } from "@/data/modelMetrics";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, Cell } from "recharts";

const metricCards = [
  { label: "Accuracy", value: performanceMetrics.accuracy, icon: Target, color: "text-primary" },
  { label: "Precision", value: performanceMetrics.precision, icon: TrendingUp, color: "text-secondary" },
  { label: "Recall", value: performanceMetrics.recall, icon: Activity, color: "text-accent" },
  { label: "F1 Score", value: performanceMetrics.f1Score, icon: BarChart3, color: "text-success" },
];

const confusionLabels = ["Glioma", "Meningioma", "Pituitary", "No Tumor"];

const Analytics = () => {
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
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-3 sm:mb-4 text-sm sm:text-base"
            >
              <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
              Back to Home
            </Link>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
              Model Performance Analytics
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Comprehensive metrics and visualizations of our brain tumor classification model
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            {metricCards.map((metric) => (
              <Card key={metric.label} className="hover-lift">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className="p-1.5 sm:p-2 rounded-lg medical-gradient">
                      <metric.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-muted-foreground">{metric.label}</span>
                  </div>
                  <div className="flex items-end gap-1">
                    <span className={`text-2xl sm:text-3xl font-bold ${metric.color}`}>
                      {metric.value.toFixed(1)}
                    </span>
                    <span className="text-base sm:text-lg text-muted-foreground mb-1">%</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
            {/* ROC Curve */}
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  ROC Curve
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="h-64 sm:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={rocCurveData}>
                      <defs>
                        <linearGradient id="rocGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="fpr" 
                        label={{ value: 'False Positive Rate', position: 'bottom', offset: -5 }}
                        stroke="hsl(var(--muted-foreground))"
                      />
                      <YAxis 
                        dataKey="tpr"
                        label={{ value: 'True Positive Rate', angle: -90, position: 'insideLeft' }}
                        stroke="hsl(var(--muted-foreground))"
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="tpr" 
                        stroke="hsl(var(--primary))" 
                        fill="url(#rocGradient)"
                        strokeWidth={2}
                      />
                      <Line 
                        type="linear" 
                        dataKey="fpr" 
                        stroke="hsl(var(--muted-foreground))" 
                        strokeDasharray="5 5"
                        dot={false}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-muted rounded-lg">
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    <strong className="text-foreground">AUC Score: {performanceMetrics.auc}%</strong> - 
                    Indicates excellent model discrimination capability
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Training History */}
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-secondary" />
                  Training History
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="h-64 sm:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trainingHistory}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="epoch" 
                        label={{ value: 'Epoch', position: 'bottom', offset: -5 }}
                        stroke="hsl(var(--muted-foreground))"
                      />
                      <YAxis 
                        yAxisId="left"
                        label={{ value: 'Loss', angle: -90, position: 'insideLeft' }}
                        stroke="hsl(var(--muted-foreground))"
                      />
                      <YAxis 
                        yAxisId="right" 
                        orientation="right"
                        label={{ value: 'Accuracy (%)', angle: 90, position: 'insideRight' }}
                        stroke="hsl(var(--muted-foreground))"
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Line 
                        yAxisId="left" 
                        type="monotone" 
                        dataKey="trainLoss" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                        name="Train Loss"
                      />
                      <Line 
                        yAxisId="left" 
                        type="monotone" 
                        dataKey="valLoss" 
                        stroke="hsl(var(--secondary))" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="Val Loss"
                      />
                      <Line 
                        yAxisId="right" 
                        type="monotone" 
                        dataKey="valAcc" 
                        stroke="hsl(var(--success))" 
                        strokeWidth={2}
                        name="Val Accuracy"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
            {/* Confusion Matrix */}
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <PieChart className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                  Confusion Matrix
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
                  <div className="min-w-[300px] sm:min-w-[400px]">
                    <div className="grid grid-cols-5 gap-1">
                      {/* Header row */}
                      <div className="p-1 sm:p-2"></div>
                      {confusionLabels.map((label) => (
                        <div 
                          key={`header-${label}`} 
                          className="p-1 sm:p-2 text-[10px] sm:text-xs font-medium text-muted-foreground text-center truncate"
                        >
                          {label}
                        </div>
                      ))}
                      
                      {/* Data rows */}
                      {confusionGrid.map((row, i) => (
                        <>
                          <div 
                            key={`label-${i}`}
                            className="p-1 sm:p-2 text-[10px] sm:text-xs font-medium text-muted-foreground flex items-center"
                          >
                            {confusionLabels[i]}
                          </div>
                          {row.map((value, j) => {
                            const intensity = value / maxValue;
                            const isDiagonal = i === j;
                            return (
                              <div
                                key={`cell-${i}-${j}`}
                                className="aspect-square flex items-center justify-center text-xs sm:text-sm font-bold rounded-md sm:rounded-lg transition-all hover:scale-105"
                                style={{
                                  backgroundColor: isDiagonal 
                                    ? `hsl(var(--success) / ${0.2 + intensity * 0.6})`
                                    : `hsl(var(--destructive) / ${intensity * 0.5})`,
                                  color: intensity > 0.5 ? 'white' : 'hsl(var(--foreground))'
                                }}
                              >
                                {value}
                              </div>
                            );
                          })}
                        </>
                      ))}
                    </div>
                    <div className="mt-3 sm:mt-4 text-center">
                      <p className="text-[10px] sm:text-xs text-muted-foreground">
                        Rows: Actual Labels | Columns: Predicted Labels
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Per-Class Metrics */}
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  Per-Class Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="h-64 sm:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={classMetrics} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis type="number" domain={[90, 100]} stroke="hsl(var(--muted-foreground))" />
                      <YAxis dataKey="name" type="category" width={80} stroke="hsl(var(--muted-foreground))" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar dataKey="precision" name="Precision" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                      <Bar dataKey="recall" name="Recall" fill="hsl(var(--secondary))" radius={[0, 4, 4, 0]} />
                      <Bar dataKey="f1" name="F1 Score" fill="hsl(var(--accent))" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Model Architecture Info */}
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-base sm:text-lg">Model Architecture</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                <div className="p-3 sm:p-4 bg-muted rounded-lg sm:rounded-xl">
                  <h4 className="text-sm sm:text-base font-semibold text-foreground mb-2">Base Model</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    ResNet-50 with custom classification head, pretrained on ImageNet and fine-tuned on brain MRI dataset
                  </p>
                </div>
                <div className="p-3 sm:p-4 bg-muted rounded-lg sm:rounded-xl">
                  <h4 className="text-sm sm:text-base font-semibold text-foreground mb-2">Input Processing</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    224x224 pixel input with normalization and augmentation including rotation, flipping, and intensity scaling
                  </p>
                </div>
                <div className="p-3 sm:p-4 bg-muted rounded-lg sm:rounded-xl sm:col-span-2 md:col-span-1">
                  <h4 className="text-sm sm:text-base font-semibold text-foreground mb-2">Training Details</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    30 epochs with Adam optimizer, learning rate 0.0001, batch size 32, early stopping patience of 5
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
