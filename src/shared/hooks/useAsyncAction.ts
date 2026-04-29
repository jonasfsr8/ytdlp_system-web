import { useState } from "react";
import { getErrorMessage } from "../utils/https";

export function useAsyncAction() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function execute<T>(action: () => Promise<T>) {
    try {
      setIsLoading(true);
      setError(null);
      return await action();
    } catch (error) {
      const message = getErrorMessage(error);
      setError(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  function clearError() {
    setError(null);
  }

  return {
    execute,
    isLoading,
    error,
    clearError,
  };
}