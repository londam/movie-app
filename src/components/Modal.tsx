"use client";
import { useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Modal({ children }: { children: React.ReactNode }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const onOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      console.log("[onClick] Click happened!", e.target); // <-- ADD THIS
      if (e.target === overlay.current) {
        console.log("[onClick] Clicked exactly on overlay, closing...");
        onDismiss();
      } else {
        console.log("[onClick] Clicked inside modal, not closing.");
      }
    },
    [onDismiss]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      console.log("[onKeyDown] Key pressed:", e.key); // <-- ADD THIS
      if (e.key === "Escape") {
        console.log("[onKeyDown] Escape pressed, closing...");
        onDismiss();
      }
    },
    [onDismiss]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-black/60 p-10 pointer-events-auto z-50"
      onClick={onOverlayClick}
    >
      <div
        className="bg-neutral-900 p-6 rounded-lg sm:w-10/12 md:w-8/12 lg:w-2/5"
        onClick={(e) => e.stopPropagation()} // <-- NEW! prevents click from bubbling inside modal
      >
        {children}
      </div>
    </div>
  );
}
