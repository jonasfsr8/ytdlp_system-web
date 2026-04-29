interface FeedbackMessageProps {
  type: "error" | "success" | "info";
  message: string;
}

export function FeedbackMessage({ type, message }: FeedbackMessageProps) {
  return <div className={`feedback feedback--${type}`}>{message}</div>;
}
