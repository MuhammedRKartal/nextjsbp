import { ClientRequestOptions } from "@/types";

export function getCookie(name: string) {
  if (typeof document === "undefined") {
    return null;
  }

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts?.pop()?.split(";").shift();
  }
  return null;
}

export function parseCookies(cookie, sep?, eq?) {
  sep = sep || /;\s*/;
  eq = eq || "=";

  return (cookie || "").split(sep).reduce((result, entry) => {
    const [key, value] = entry.split(eq, 2);
    result[key] = decodeURIComponent(value);
    return result;
  }, {});
}

export function setCookie(name: string, val: string) {
  const date = new Date();
  const value = val;

  date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);

  document.cookie = name + "=" + value + "; expires=" + date.toUTCString() + "; path=/";
}

export function removeCookie(name: string) {
  const date = "Thu, 01 Jan 1970 00:00:00 UTC";

  document.cookie = `${name}=; expires=${date}; path=/;`;
}

export function buildClientRequestUrl(path: string, options?: ClientRequestOptions) {
  let url = `/api/client${path}`;

  if (options) {
    if (url.includes("?")) {
      url += "&";
    } else {
      url += "?";
    }

    url += `options=${encodeURIComponent(JSON.stringify(options))}`;
  }

  return url;
}

export function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function getContrastColor(color) {
  const r = parseInt(color.substr(1, 2), 16);
  const g = parseInt(color.substr(3, 2), 16);
  const b = parseInt(color.substr(5, 2), 16);

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.5 ? "#000000" : "#ffffff";
}

export function formatPhoneNumber(phoneNumber: string) {
  phoneNumber = phoneNumber?.replace(/\D/g, "");

  return phoneNumber?.replace(/(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})/, "+$1 $2 $3 $4 $5");
}

export function blurBackground() {
  if (typeof document !== "undefined") {
    document?.getElementById("main")?.classList?.add("blur-sm");
    document?.getElementById("header")?.classList?.add("blur-sm");
    document?.getElementById("footer")?.classList?.add("blur-sm");
  }
}

export function removeBlur() {
  if (typeof document !== "undefined") {
    document?.getElementById("main")?.classList?.remove("blur-sm");
    document?.getElementById("header")?.classList?.remove("blur-sm");
    document?.getElementById("footer")?.classList?.remove("blur-sm");
  }
}
