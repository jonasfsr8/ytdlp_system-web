import { useEffect, useState } from "react";
import { MessagingService, type FormatResponse } from "../services/messagingService";
import { getErrorMessage } from "../../../shared/utils/https";

export function useFormats() {
  const [formats, setFormats] = useState<FormatResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadFormats() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await MessagingService.getMediaFormat();
        setFormats(data);

      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setIsLoading(false);
      }
    }

    loadFormats();
  }, []);

  return {
    formats,
    isLoading,
    error,
  };
}