import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";

/**
 * Resolves the origin of the current request so route head() can build
 * absolute URLs (e.g. for og:image). x-forwarded-host is only trusted on
 * the sandbox's localhost rewrite; elsewhere it is client-spoofable, so
 * the request URL is used.
 */
export const getRequestOrigin = createServerFn({ method: "GET" }).handler(() => {
  const request = getRequest();
  const url = new URL(request.url);
  const sandboxHost =
    url.hostname === "localhost" ? request.headers.get("x-forwarded-host") : null;
  return sandboxHost ? `https://${sandboxHost}` : url.origin;
});
