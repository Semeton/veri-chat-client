class LocalStorageStore {
  /**
   * Stores the provided JSON data in localStorage.
   *
   * @param {Record<string, any>} jsonData - The JSON data to store, in key-value pair format.
   */
  static storeData(jsonData: Record<string, any>): void {
    Object.entries(jsonData).forEach(([key, value]) => {
      const stringValue = JSON.stringify(value);
      localStorage.setItem(key, stringValue);
    });
  }

  /**
   * Retrieves the value of the specified key from localStorage.
   *
   * @param {string} key - The key of the data to retrieve.
   * @returns {any} The value associated with the key, or null if the key does not exist.
   */
  static getValue(key: string): any {
    const stringValue = localStorage.getItem(key);
    if (!stringValue) {
      return "";
    }
    return JSON.parse(stringValue);
  }

  static deleteValue(key: string): void {
    localStorage.removeItem(key);
  }
}

export default LocalStorageStore;
