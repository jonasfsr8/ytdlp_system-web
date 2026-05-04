import { useEffect, useState } from "react";
import { MessagingService } from "../services/messagingService";

export function useMessagingStatus() {
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function fetchStatus() {
    try {
      const status = await MessagingService.getMessagingStatus();
      setIsOnline(status);
    } catch (err: any) {
      setError(err.message);
      setIsOnline(false);
    }
  }

  useEffect(() => {
    fetchStatus();

    const interval = setInterval(fetchStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  return { isOnline, error };
}