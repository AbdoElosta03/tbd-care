import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge class names with Tailwind conflict handling. */

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
