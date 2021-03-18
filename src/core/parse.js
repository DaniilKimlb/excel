export function parse(value = '') {
  try {
    if (value.startsWith('=')) {
      return eval(value.slice(1));
    }
    return value;
  } catch {
    return value;
  }
}
