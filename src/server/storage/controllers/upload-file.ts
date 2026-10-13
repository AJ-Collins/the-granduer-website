import { fail, ok } from "../../http/api-response";
import { enforceRateLimit } from "../../rate-limit/enforce-rate-limit";
import type { SessionUser } from "../../auth/services/session-claims";
import { InvalidUploadFormError, readUploadForm } from "../requests/read-upload-form";
import { saveUpload } from "../services/save-upload";
import { UploadRejectedError } from "../services/upload-rejected-error";

export async function uploadFile(req: Request, user: SessionUser): Promise<Response> {
  const limit = await enforceRateLimit(req, ["uploads"], { userId: user.id });
  if (limit.blocked) return limit.blocked;
  try {
    const form = await readUploadForm(req);
    const asset = await saveUpload(form.file, form.prefix);
    return ok({ id: asset.id, key: asset.key, url: asset.url }, { status: 201 });
  } catch (e) {
    if (e instanceof InvalidUploadFormError || e instanceof UploadRejectedError) {
      return fail("BAD_REQUEST", e.message, { status: e.status });
    }
    throw e;
  }
}
