/**
 * Read JSON data from localStorage.
 *
 * localStorage can fail in private browsing or when storage is disabled, so
 * every read falls back to a safe default value.
 */
export function readJsonFromStorage(key, fallbackValue) {
  try {
    const savedValue = localStorage.getItem(key);
    return savedValue === null ? fallbackValue : JSON.parse(savedValue);
  } catch {
    return fallbackValue;
  }
}

/**
 * Save an array or object in localStorage.
 * The page continues to work for the current visit if saving is unavailable.
 */
export function writeJsonToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // No action is needed. The in-memory value still works until page reload.
  }
}
