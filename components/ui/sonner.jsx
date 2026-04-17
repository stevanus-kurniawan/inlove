"use client";

import { Toaster as Sonner } from "sonner";

/**
 * Dark, high-contrast toasts (Sonner — common pairing with shadcn-style apps).
 */
export function Toaster(props) {
  return (
    <Sonner
      theme="dark"
      position="bottom-center"
      closeButton
      className="!z-[200]"
      toastOptions={{
        unstyled: false,
        classNames: {
          toast:
            "group toast !bg-slate-950 !text-white !border !border-slate-700 !shadow-xl",
          title: "!text-white !font-medium",
          description: "!text-slate-300",
          actionButton:
            "!bg-white !text-slate-950 !font-semibold",
          cancelButton: "!text-slate-400",
          closeButton: "!text-slate-400 hover:!text-white",
        },
      }}
      {...props}
    />
  );
}
