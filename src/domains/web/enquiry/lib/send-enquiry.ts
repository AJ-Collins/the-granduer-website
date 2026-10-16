/** Sends the form to /api/enquiry. Returns true on success. Pass the same key when retrying one logical submission. */
export async function sendEnquiry(
  kind: "viewing" | "proposal",
  form: HTMLFormElement,
  key?: string,
): Promise<boolean> {
  try {
    const fd = new FormData(form);
    const data: Record<string, FormDataEntryValue | string[]> = Object.fromEntries(fd);

    // Several services can be ticked; keep them all as an array.
    const services = fd.getAll("services");
    if (services.length) data.services = services.map(String);

    // Lead attribution from the landing URL.
    const params = new URLSearchParams(window.location.search);
    const attribution: Record<string, string> = {};
    for (const [key, param] of [["source", "utm_source"], ["medium", "utm_medium"], ["campaign", "utm_campaign"]] as const) {
      const value = params.get(param);
      if (value) attribution[key] = value;
    }

    const res = await fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(key && { "Idempotency-Key": key }) },
      body: JSON.stringify({ kind, data, ...attribution }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export type Status = "idle" | "sending" | "done" | "error";
