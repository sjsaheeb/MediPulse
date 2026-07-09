export function cn(...inputs: (string | undefined | null | boolean | Record<string, boolean>)[]) {
  const classes: string[] = [];
  inputs.forEach((input) => {
    if (!input) return;
    if (typeof input === 'string') {
      classes.push(input);
    } else if (typeof input === 'object') {
      Object.entries(input).forEach(([key, value]) => {
        if (value) classes.push(key);
      });
    }
  });
  return classes.join(' ');
}

export function getBloodPressureStage(systolic: number, diastolic: number) {
  if (systolic < 120 && diastolic < 80)
    return { stage: 'Normal', color: 'text-success', bgColor: 'bg-success/15' };
  if (systolic >= 120 && systolic <= 129 && diastolic < 80)
    return { stage: 'Elevated', color: 'text-warning', bgColor: 'bg-warning/15' };
  if ((systolic >= 130 && systolic <= 139) || (diastolic >= 80 && diastolic <= 89))
    return { stage: 'Stage 1 Hypertension', color: 'text-warning', bgColor: 'bg-warning/15' };
  if (systolic >= 140 || diastolic >= 90)
    return { stage: 'Stage 2 Hypertension', color: 'text-destructive', bgColor: 'bg-destructive/15' };
  return { stage: 'Unknown', color: 'text-muted-foreground', bgColor: 'bg-muted' };
}

export function getBloodSugarCategory(sugarMgDl: number) {
  if (sugarMgDl < 70)
    return { category: 'Hypoglycemia', color: 'text-destructive', bgColor: 'bg-destructive/15' };
  if (sugarMgDl <= 100)
    return { category: 'Normal (Fasting)', color: 'text-success', bgColor: 'bg-success/15' };
  if (sugarMgDl <= 140)
    return { category: 'Normal (Post-Meal)', color: 'text-success', bgColor: 'bg-success/15' };
  if (sugarMgDl <= 199)
    return { category: 'Pre-Diabetes', color: 'text-warning', bgColor: 'bg-warning/15' };
  return { category: 'Diabetic / High', color: 'text-destructive', bgColor: 'bg-destructive/15' };
}
