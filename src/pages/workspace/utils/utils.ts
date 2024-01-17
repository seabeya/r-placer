export function getInputsFromURL(queryString: string) {
  const urlParams = new URLSearchParams(queryString);

  const url = urlParams.get('url') || '';
  const x = urlParams.get('x') || '';
  const y = urlParams.get('y') || '';

  return { url, x, y };
}
