export const getPercentForRange = (value: number, min: number, max: number): number => {
  return ((value - min) * 100) / (max - min)
}
