import { ClientRequestOptions } from "@/types";
import { parseCookies } from "@/utils";
import { NextResponse } from "next/server";

interface RouteParams {
  params: {
    slug: string[];
  };
}

async function proxyRequest(req: Request, routeParams: RouteParams) {
  const { params } = routeParams;
  const { searchParams } = new URL(req.url);

  const backendUrl: string = `${process.env.BACKEND_URL}`;
  const cookies: { [key: string]: string } = parseCookies(req.headers.get("cookie") ?? "");

  const access_token: string | undefined = cookies["access_token"];

  const options: ClientRequestOptions = {
    useTrailingSlash: true,
    useFormData: false,
    contentType: "application/json",
    accept: "application/json",
    responseType: "json",
  };

  const slug: string = `${params.slug.join("/")}`;

  const options_: any = JSON.parse(decodeURIComponent(searchParams.get("options") ?? "{}"));
  const urlSearchParams = new URLSearchParams();

  Object.assign(options, options_);

  Array.from(searchParams.keys())
    .filter(key => !["slug", "options"].includes(key))
    .forEach(key => {
      urlSearchParams.append(key, `${searchParams.get(key)}`);
    });

  const extraHeaders: Record<string, string> = Object.fromEntries(req.headers.entries());

  [
    "x-forwarded-host",
    "x-forwarded-for",
    "x-forwarded-proto",
    "x-forwarded-port",
    "origin",
    "host",
    "referer",
    "accept",
    "content-length",
    "content-type",
  ].forEach(header => delete extraHeaders[header]);

  const fetchOptions: RequestInit = {
    method: req.method,
    headers: {
      ...extraHeaders,
      "X-Requested-With": "XMLHttpRequest",
      Referer: backendUrl,
      Accept: options.accept ?? "",
      Authorization: access_token ? `Bearer ${access_token}` : "",
      auth_token: process.env.AUTH_TOKEN,
    },
  };

  if (options.contentType && fetchOptions.headers) {
    (fetchOptions.headers as Record<string, string>)["Content-Type"] = options.contentType;
  }

  if (req.method !== "GET") {
    const formData = new URLSearchParams();

    let body: any = {};

    try {
      body = await req.json();
    } catch (error) {}

    Object.keys(body ?? {}).forEach(key => {
      if (body[key]) {
        formData.append(key, body[key]);
      }
    });

    fetchOptions.body = !options.useFormData ? JSON.stringify(body) : formData;
  }

  let url = `${backendUrl}/${slug.replace(/,/g, "/")}`;

  if (!options.useTrailingSlash) {
    url = url.replace(/\/$/, "");
  }

  if (urlSearchParams.toString().length) {
    url += `?${urlSearchParams.toString()}`;
  }

  try {
    const request = await fetch(url, fetchOptions);

    let response = {} as any;

    try {
      response = await (options.responseType === "text" ? request.text() : request.json());
    } catch (error) {}

    const setCookieHeader = request.headers.get("set-cookie");
    const responseHeaders: Record<string, string> = {};

    if (setCookieHeader) {
      responseHeaders["set-cookie"] = setCookieHeader;
    }

    const statusCode = new RegExp(/^20./).test(request.status.toString()) ? 200 : request.status;

    return NextResponse.json(options.responseType === "text" ? { result: response } : response, {
      status: statusCode,
      headers: responseHeaders,
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function GET(req: Request, params: RouteParams) {
  return proxyRequest(req, params);
}

export async function POST(req: Request, params: RouteParams) {
  return proxyRequest(req, params);
}

export async function PUT(req: Request, params: RouteParams) {
  return proxyRequest(req, params);
}

export async function PATCH(req: Request, params: RouteParams) {
  return proxyRequest(req, params);
}

export async function DELETE(req: Request, params: RouteParams) {
  return proxyRequest(req, params);
}

export async function HEAD(req: Request, params: RouteParams) {
  return proxyRequest(req, params);
}
