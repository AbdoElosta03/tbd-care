import type { Locale } from "@/i18n/config";

export type ContactPayload = {
  fullName: string;
  email: string;
  phone: string;
  message: string;
  locale?: Locale;
};

export async function submitContact(_payload: ContactPayload): Promise<void> {
  void _payload;
}
