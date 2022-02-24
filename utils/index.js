/**
 * Handleize
 * @param {string} str
 * @returns {string} handleized version of string
 */
export function handleize(str) {
  return str
    .toLowerCase()
    .replace(/[^\w\u00C0-\u024f]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
