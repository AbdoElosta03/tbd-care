"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

/** Single-open FAQ accordion used on the homepage. */

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="story-faq-list">
      {items.map((item) => {
        const open = openId === item.id;

        return (
          <div key={item.id} className="story-faq-item">
            <button
              type="button"
              className="story-faq-trigger"
              aria-expanded={open}
              onClick={() => setOpenId(open ? null : item.id)}
            >
              <span>{item.question}</span>
              <span className="story-faq-icon" aria-hidden="true" />
            </button>
            <div className={cn("story-faq-panel", open && "is-open")}>
              <div>
                <p>{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
