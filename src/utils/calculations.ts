export const calculateMean = (values: number[]): number => {
  const mean = values.reduce((a, b) => a + b, 0) / values.length;

  return Number(mean.toFixed(2));
};

export const calculateMedian = (values: number[]): number => {
  const { length } = values;

  values.sort((a, b) => a - b);

  if (length % 2 === 0) {
    return Number(((values[length / 2 - 1] + values[length / 2]) / 2).toFixed(2));
  }

  return Number(values[(length - 1) / 2].toFixed(2));
};

export const calculateStandardDeviation = (values: number[]): number => {
  const average = calculateMean(values);
  const squareDiffs = values.map((value: number): number => {
    const diff = value - average;

    return diff * diff;
  });

  const variance = calculateMean(squareDiffs);
  const standardDeviation = Math.sqrt(variance);

  return Number(standardDeviation.toFixed(2));
};
