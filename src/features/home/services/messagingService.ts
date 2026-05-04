import { api } from "../../../shared/services/api";

export interface UrlTrackingPayload {
  payload: string;
  format: string;
}

export interface MediaFormat {
  type: string;
  quality: string;
}

export interface FormatResponse {
  audio: MediaFormat[];
  video: MediaFormat[];
}

function normalizeFormat(data: any): FormatResponse {
  const audio = Array.isArray(data.audio)
    ? data.audio.map((item: any) => ({
      type: item.type,
      quality: item.quality,
    }))
    : []

  const video = Array.isArray(data.video)
    ? data.video.map((item: any) => ({
      type: item.type,
      quality: item.quality,
    }))
    : []

  return {
    audio,
    video
  }
}

export const MessagingService = {
  async getMediaFormat() {
    const { data } = await api.get("/messaging/formats");

    if (!data.success) {
      throw new Error(data.message || "error when retrieving the information.");
    }

    return normalizeFormat(data.response);
  },

  async sendMessage(payload: UrlTrackingPayload) {
    const { data } = await api.post("/messaging/url_tracking", payload);

    if (!data.success) {
      throw new Error(data.message || "error sending message");
    }

    return data;
  },

  async getMessagingStatus() {
    const { data } = await api.get("/messaging/source-messaging-status");

    if (!data.success) {
      throw new Error(data.message || "error sending message");
    }

    return data.response;
  },
}
