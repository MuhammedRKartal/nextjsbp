import { ClientRequestOptions } from '@/types';
import { NextResponse } from 'next/server';

interface RouteParams {
  params: {
    slug: string[];
  };
}

async function proxyRequest(...args) {
  const [req, { params }] = args as [req: Request, params: RouteParams];
  const { searchParams } = new URL(req.url);

  const commerceUrl = process.env.BACKEND_URL;

  const options: ClientRequestOptions = {
    useTrailingSlash: true,
    useFormData: false,
    contentType: 'application/json',
    accept: 'application/json',
    responseType: 'json'
  };

  const slug = `${params.slug.join('/')}`;
  const options_ = JSON.parse(
    decodeURIComponent((searchParams.get('options') as string) ?? '{}')
  );
  const urlSearchParams = new URLSearchParams();

  Object.assign(options, options_);

  Array.from(searchParams.keys())
    .filter((key) => !['slug', 'options'].includes(key))
    .forEach((key) => {
      urlSearchParams.append(key, `${searchParams.get(key)}`);
    });

  const extraHeaders = Object.fromEntries(req.headers.entries());

  [
    'x-forwarded-host',
    'x-forwarded-for',
    'x-forwarded-proto',
    'x-forwarded-port',
    'origin',
    'host',
    'referer',
    'accept',
    'content-length',
    'content-type'
  ].forEach((header) => delete extraHeaders[header]);

  const fetchOptions = {
    method: req.method,
    headers: {
      ...extraHeaders,
      'X-Requested-With': 'XMLHttpRequest',
      Referer: commerceUrl,
      Accept: options.accept,
      auth_token: process.env.AUTH_TOKEN
    }
  } as RequestInit;

  if (options.contentType && fetchOptions.headers) {
    fetchOptions.headers['Content-Type'] = options.contentType;
  }

  if (req.method !== 'GET') {
    const formData = new URLSearchParams();
    let body = {};

    try {
      body = await req.json();
    } catch (error) {}

    Object.keys(body ?? {}).forEach((key) => {
      if (body[key]) {
        formData.append(key, body[key]);
      }
    });
    fetchOptions.body = !options.useFormData ? JSON.stringify(body) : formData;
  }

  let url = `${commerceUrl}/${slug.replace(/,/g, '/')}`;

  if (!options.useTrailingSlash) {
    url = url.replace(/\/$/, '');
  }

  if (urlSearchParams.toString().length) {
    url += `?${urlSearchParams.toString()}`;
  }

  try {
    const request = await fetch(url, fetchOptions);

    let response = {} as any;

    try {
      response = await (options.responseType === 'text'
        ? request.text()
        : request.json());
    } catch (error) {}

    const setCookieHeader = request.headers.get('set-cookie');
    const responseHeaders: any = {};

    if (setCookieHeader) {
      responseHeaders['set-cookie'] = setCookieHeader;
    }

    const statusCode = new RegExp(/^20./).test(request.status.toString())
      ? 200
      : request.status;

    console.log('RERRRRRRRR', request.headers);

    return NextResponse.json(
      options.responseType === 'text' ? { result: response } : response,
      { status: statusCode, headers: responseHeaders }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function GET(...args) {
  return proxyRequest(...args);
}

export async function POST(...args) {
  return proxyRequest(...args);
}

export async function PUT(...args) {
  return proxyRequest(...args);
}

export async function PATCH(...args) {
  return proxyRequest(...args);
}

export async function DELETE(...args) {
  return proxyRequest(...args);
}

export async function HEAD(...args) {
  return proxyRequest(...args);
}
