"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Mail, MessageCircle, Phone, User } from "lucide-react";
import StatusButton from "@/components/animata/button/status-button";
import { buttonClassName } from "@/components/ui/button";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";

/** Shared join/contact form. Compact uses banner CSS; default uses Tailwind. Submit is local-only. */

type JoinField = {
  name: string;
  label: string;
  type: string;
  autoComplete: string;
};

export type JoinFormCopy = {
  submitLabel: string;
  resetLabel: string;
  success: string;
  successLabel?: string;
};

type JoinFormProps = {
  copy: JoinFormCopy;
  fields: readonly JoinField[];
  messageField?: { name: string; label: string };
  compact?: boolean;
  className?: string;
  locale?: Locale;
};

function fieldDirection(locale: Locale | undefined): "rtl" | "ltr" {
  return (locale ?? "ar") === "ar" ? "rtl" : "ltr";
}

const compactIcons: Record<string, ReactNode> = {
  fullName: <User aria-hidden="true" />,
  email: <Mail aria-hidden="true" />,
  phone: <Phone aria-hidden="true" />,
  message: <MessageCircle aria-hidden="true" />,
  companyName: <User aria-hidden="true" />,
  contactName: <User aria-hidden="true" />,
  specialty: <User aria-hidden="true" />,
};

const wait = async (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function JoinForm({
  copy,
  fields,
  messageField,
  compact = false,
  className,
  locale = "ar",
}: JoinFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const shellClassName = compact
    ? "join-banner-form"
    : cn("join-form-shell space-y-5", className);

  const fieldClassName = compact
    ? "join-banner-field join-form-field"
    : cn(
        "join-form-field min-h-11 w-full rounded-xl border border-border bg-card px-3 text-foreground",
      );

  const textareaRows = compact ? 4 : 5;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (compact) {
      if (status !== "idle") {
        return;
      }
      setStatus("loading");
      await wait(1500);
      setStatus("success");
      await wait(1500);
      setSubmitted(true);
      setStatus("idle");
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={compact ? shellClassName : cn(shellClassName, className)}>
        <p role="status" className="leading-7 text-muted">
          {copy.success}
        </p>
        <button
          type="button"
          className={`${buttonClassName("secondary")} mt-6`}
          onClick={() => setSubmitted(false)}
        >
          {copy.resetLabel}
        </button>
      </div>
    );
  }

  return (
    <form
      className={compact ? (className ? `${shellClassName} ${className}` : shellClassName) : shellClassName}
      onSubmit={handleSubmit}
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      {fields.map((field) =>
        compact ? (
          <label key={field.name} className="join-banner-control" htmlFor={field.name}>
            <span className="sr-only">{field.label}</span>
            <span className="join-banner-control__icon">{compactIcons[field.name] ?? compactIcons.fullName}</span>
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              autoComplete={field.autoComplete}
              required
              placeholder={field.label}
              dir={fieldDirection(locale)}
              className={fieldClassName}
            />
          </label>
        ) : (
          <div key={field.name}>
            <label htmlFor={field.name} className="text-sm font-medium">
              {field.label}
            </label>
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              autoComplete={field.autoComplete}
              required
              placeholder={field.label}
              dir={fieldDirection(locale)}
              className={`${fieldClassName} mt-2`}
            />
          </div>
        ),
      )}
      {messageField ? (
        compact ? (
          <label className="join-banner-control join-banner-control--area" htmlFor={messageField.name}>
            <span className="sr-only">{messageField.label}</span>
            <span className="join-banner-control__icon">{compactIcons.message}</span>
            <textarea
              id={messageField.name}
              name={messageField.name}
              required
              rows={textareaRows}
              placeholder={messageField.label}
              dir={fieldDirection(locale)}
              className={fieldClassName}
            />
          </label>
        ) : (
          <div>
            <label htmlFor={messageField.name} className="text-sm font-medium">
              {messageField.label}
            </label>
            <textarea
              id={messageField.name}
              name={messageField.name}
              required
              rows={textareaRows}
              placeholder={messageField.label}
              dir={fieldDirection(locale)}
              className={`${fieldClassName} mt-2 py-3`}
            />
          </div>
        )
      ) : null}
      {compact ? (
        <StatusButton
          idleLabel={copy.submitLabel}
          successLabel={copy.successLabel ?? copy.submitLabel}
          status={status}
        />
      ) : (
        <button type="submit" className={buttonClassName("primary")}>
          {copy.submitLabel}
        </button>
      )}
    </form>
  );
}
