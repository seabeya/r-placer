export function checkInputs(url: string, x: string, y: string): { status: boolean; message: string } {
  // Inputs are not empty:
  if (url === '' || x === '' || y === '') {
    return { status: false, message: 'Inputs cannot be empty' };
  }

  const nX = Number(x);
  const nY = Number(y);

  // X and Y are numbers:
  if (isNaN(nX) || isNaN(nY)) {
    return { status: false, message: 'X and Y must be numbers' };
  }

  // X and Y are integers:
  if (!Number.isInteger(nX) || !Number.isInteger(nY)) {
    return { status: false, message: 'X and Y must be integers' };
  }

  // X and Y are within the limit (+1_000_000_000, -1_000_000_000):
  if (nX < -1_000_000_000 || nX > 1_000_000_000 || nY < -1_000_000_000 || nY > 1_000_000_000) {
    return { status: false, message: 'X and Y must be within the range of -/+1,000,000,000' };
  }

  return { status: true, message: 'Inputs are valid' };
}
