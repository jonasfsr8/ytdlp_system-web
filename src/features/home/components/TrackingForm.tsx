import { useState, type SubmitEvent } from "react";
import toast from "react-hot-toast";
import { MessagingService, type FormatResponse } from "../services/messagingService";
import { Button } from "../../../shared/components/Button";
import { FeedbackMessage } from "../../../shared/components/FeedbackMessage";
import { InputField, SelectField } from "../../../shared/components/FormField";
import { useAsyncAction } from "../../../shared/hooks/useAsyncAction";

interface MediaFormProps {
  formats: FormatResponse | null;
}

export function TrackingForm({ formats }: MediaFormProps) {
  const { execute, isLoading, error, clearError } = useAsyncAction();
  const [payload, setPayload] = useState("");
  const [format, setFormat] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccessMessage(null);

    try {
      await execute(() => MessagingService.sendMessage({ payload, format }));
    } catch {
      return;
    }

    setSuccessMessage("URL sent for processing successfully.");
    toast.success("Request sent");

    setPayload("");
    setFormat("");
  }

  const allFormats = formats
    ? [...formats.audio, ...formats.video]
    : [];

  const formatOptions = allFormats.map((item) => ({
    label: `${item.type} - ${item.quality}`,
    value: `${item.quality}`,
  }));

  return (
    <form className="panel stack-lg" onSubmit={handleSubmit}>
      <div className="panel__header">
        <h2>URL tracking</h2>
        <p>Submit a URL and choose the format.</p>
      </div>

      {error && <FeedbackMessage type="error" message={error} />}
      {successMessage && (
        <FeedbackMessage type="success" message={successMessage} />
      )}

      <InputField
        label="URL"
        type="url"
        value={payload}
        onChange={(e) => {
          clearError();
          setSuccessMessage(null);
          setPayload(e.target.value);
        }}
        required
      />

      <SelectField
        label="Format"
        value={format}
        onChange={(e) => {
          clearError();
          setSuccessMessage(null);
          setFormat(e.target.value);
        }}
        options={formatOptions}
        placeholder="Select a format"
        required
      />

      <Button type="submit" isLoading={isLoading}>
        Process URL
      </Button>
    </form>
  );
}
