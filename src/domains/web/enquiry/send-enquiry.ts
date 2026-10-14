/** Sends the form to /api/enquiry. Returns true on success. Pass the same key when retrying one logical submission. */
export async function sendEnquiry(
  kind: "viewing" | "proposal",
  form: HTMLFormElement,
  key?: string,
): Promise<boolean> {
  try {
    const fd = new FormData(form);
    const data: Record<string, FormDataEntryValue> = Object.fromEntries(fd);

    // Several services can be ticked; keep them all as one string.
    const services = fd.getAll("services");
    if (services.length) data.services = services.join(", ");

    const res = await fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(key && { "Idempotency-Key": key }) },
      body: JSON.stringify({ kind, data }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export type Status = "idle" | "sending" | "done" | "error";
