
exports.calculateAverage = (data) => {
  if (!data.length) return 0;
  const sum = data.reduce((acc, val) => acc + val.price, 0);
  return parseFloat((sum / data.length).toFixed(4));  
};

exports.calculateCorrelation = (dataX, dataY) => {
  const n = Math.min(dataX.length, dataY.length);
  const X = dataX.slice(0, n).map(x => x.price);
  const Y = dataY.slice(0, n).map(y => y.price);
  const avgX = X.reduce((a, b) => a + b) / n;
  const avgY = Y.reduce((a, b) => a + b) / n;

  let numerator = 0, sumX = 0, sumY = 0;

  for (let i = 0; i < n; i++) {
    numerator += (X[i] - avgX) * (Y[i] - avgY);
    sumX += Math.pow(X[i] - avgX, 2);
    sumY += Math.pow(Y[i] - avgY, 2);
  }

  const denominator = Math.sqrt(sumX * sumY);
  return parseFloat((numerator / denominator).toFixed(4));  // Returns Pearson correlation
};
