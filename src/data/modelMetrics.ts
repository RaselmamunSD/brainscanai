export const performanceMetrics = {
  accuracy: 96.8,
  precision: 95.2,
  recall: 97.1,
  f1Score: 96.1,
  auc: 98.5,
};

export const confusionMatrixData = [
  { actual: "Glioma", predicted: "Glioma", value: 285 },
  { actual: "Glioma", predicted: "Meningioma", value: 8 },
  { actual: "Glioma", predicted: "Pituitary", value: 4 },
  { actual: "Glioma", predicted: "No Tumor", value: 3 },
  { actual: "Meningioma", predicted: "Glioma", value: 6 },
  { actual: "Meningioma", predicted: "Meningioma", value: 298 },
  { actual: "Meningioma", predicted: "Pituitary", value: 5 },
  { actual: "Meningioma", predicted: "No Tumor", value: 1 },
  { actual: "Pituitary", predicted: "Glioma", value: 2 },
  { actual: "Pituitary", predicted: "Meningioma", value: 4 },
  { actual: "Pituitary", predicted: "Pituitary", value: 291 },
  { actual: "Pituitary", predicted: "No Tumor", value: 3 },
  { actual: "No Tumor", predicted: "Glioma", value: 1 },
  { actual: "No Tumor", predicted: "Meningioma", value: 2 },
  { actual: "No Tumor", predicted: "Pituitary", value: 3 },
  { actual: "No Tumor", predicted: "No Tumor", value: 394 },
];

export const rocCurveData = [
  { fpr: 0, tpr: 0 },
  { fpr: 0.01, tpr: 0.65 },
  { fpr: 0.02, tpr: 0.78 },
  { fpr: 0.03, tpr: 0.85 },
  { fpr: 0.05, tpr: 0.91 },
  { fpr: 0.08, tpr: 0.94 },
  { fpr: 0.1, tpr: 0.96 },
  { fpr: 0.15, tpr: 0.97 },
  { fpr: 0.2, tpr: 0.98 },
  { fpr: 0.3, tpr: 0.985 },
  { fpr: 0.5, tpr: 0.99 },
  { fpr: 0.7, tpr: 0.995 },
  { fpr: 1, tpr: 1 },
];

export const classMetrics = [
  { name: "Glioma", precision: 95.8, recall: 95.0, f1: 95.4, support: 300 },
  { name: "Meningioma", precision: 94.5, recall: 96.1, f1: 95.3, support: 310 },
  { name: "Pituitary", precision: 96.2, recall: 97.0, f1: 96.6, support: 300 },
  { name: "No Tumor", precision: 98.3, recall: 98.5, f1: 98.4, support: 400 },
];

export const trainingHistory = [
  { epoch: 1, trainLoss: 1.2, valLoss: 1.1, trainAcc: 45, valAcc: 48 },
  { epoch: 5, trainLoss: 0.8, valLoss: 0.75, trainAcc: 68, valAcc: 71 },
  { epoch: 10, trainLoss: 0.5, valLoss: 0.48, trainAcc: 82, valAcc: 84 },
  { epoch: 15, trainLoss: 0.3, valLoss: 0.32, trainAcc: 89, valAcc: 90 },
  { epoch: 20, trainLoss: 0.18, valLoss: 0.22, trainAcc: 93, valAcc: 94 },
  { epoch: 25, trainLoss: 0.12, valLoss: 0.16, trainAcc: 95, valAcc: 95.5 },
  { epoch: 30, trainLoss: 0.08, valLoss: 0.12, trainAcc: 96.5, valAcc: 96.8 },
];
