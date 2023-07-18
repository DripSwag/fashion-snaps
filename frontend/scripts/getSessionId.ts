import { CookiesStatic } from "js-cookie";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export function getSessionIdServer(cookie: ReadonlyRequestCookies): string {
  if (cookie.get("sessionId") !== undefined) {
    //Should be safe, Idk why but even when checking for undefined, it still thinks it can be undefined
    //@ts-ignore
    return cookie.get("sessionId").value;
  } else {
    return "";
  }
}

export function getSessionidClient(cookie: string | undefined) {
  if (typeof cookie === "string") {
    return cookie;
  } else {
    return "";
  }
}
