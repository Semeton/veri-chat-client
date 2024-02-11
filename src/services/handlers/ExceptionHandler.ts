class ExceptionHandler {
  static handleException(callback: () => void): void {
    try {
      callback();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
}

export default ExceptionHandler.handleException;
