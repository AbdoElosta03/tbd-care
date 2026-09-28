import Image from "next/image";
import { cn } from "@/lib/utils";

/** Decorative app screenshots; parent is `aria-hidden`. */

const phoneShots = [
  { src: "/image/TBD-APP-IMAGE-2.webp", className: "app-phone--left" },
  { src: "/image/TBD-APP-IMAGE.webp", className: "app-phone--center" },
  { src: "/image/TBD-APP-IMAGE-3.webp", className: "app-phone--right" },
] as const;

function PhoneShell({ className, src }: { className: string; src: string }) {
  return (
    <div className={cn("app-phone", className)}>
      <div className="app-phone-bezel">
        <div className="app-phone-screen">
          <Image src={src} alt="" fill sizes="(min-width: 900px) 11rem, 8rem" className="app-phone-shot" />
        </div>
      </div>
    </div>
  );
}

export function PhoneScreens() {
  return (
    <div className="app-phone-stage app-phone-stage--trio" aria-hidden="true">
      {phoneShots.map((shot) => (
        <PhoneShell key={shot.src} className={shot.className} src={shot.src} />
      ))}
    </div>
  );
}
