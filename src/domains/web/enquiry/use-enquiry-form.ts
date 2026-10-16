"use client";

import { useRef, useState } from "react";
import { sendEnquiry, type Status } from "./lib/send-enquiry";

export function useEnquiryForm(
  kind: "viewing" | "proposal",
  onSubmitted?: (ok: boolean) => void,
) {
  const [status, setStatus] = useState<Status>("idle");
  const keyRef = useRef(crypto.randomUUID());
  const callbackRef = useRef(onSubmitted);
  callbackRef.current = onSubmitted;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    const ok = await sendEnquiry(kind, form, keyRef.current);
    if (ok) keyRef.current = crypto.randomUUID();
    setStatus(ok ? "done" : "error");
    callbackRef.current?.(ok);
  }

  return { status, onSubmit };
}
