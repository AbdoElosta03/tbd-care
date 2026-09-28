"use client";

import { CheckCircle2, CircleDashed } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

/** Submit button with idle / loading / success states for the compact form. */

type StatusButtonStatus = "idle" | "loading" | "success";

type StatusButtonProps = {
  idleLabel: string;
  successLabel: string;
  status: StatusButtonStatus;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
};

export default function StatusButton({
  idleLabel,
  successLabel,
  status,
  className,
  type = "submit",
  disabled = false,
}: StatusButtonProps) {
  const isBusy = status !== "idle";

  return (
    <button
      type={type}
      disabled={disabled || isBusy}
      className={cn(
        "group/status relative h-10 min-w-40 overflow-hidden rounded-full bg-white px-6 text-sm font-semibold text-primary transition-colors duration-300 hover:bg-sky-50 disabled:opacity-90",
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={status}
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ duration: 0.075 }}
          className="flex items-center justify-center gap-1"
        >
          {status === "success" && (
            <motion.span
              className="h-fit w-fit"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.075, type: "spring" }}
            >
              <CheckCircle2 className="h-4 w-4 fill-white stroke-primary group-hover/status:stroke-primary" />
            </motion.span>
          )}

          {status === "loading" ? (
            <CircleDashed className="h-4 w-4 animate-spin" />
          ) : status === "success" ? (
            successLabel
          ) : (
            idleLabel
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
