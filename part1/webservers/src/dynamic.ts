import * as server from "https://deno.land/std@0.127.0/http/server.ts";

const serverConfig = {
  port: 3000,
};

interface IDataItem {
  id: string;
  name: string;
}

const data: IDataItem[] = [
  { id: crypto.randomUUID(), name: "First" },
  { id: crypto.randomUUID(), name: "Second" },
  { id: crypto.randomUUID(), name: "Third" },
  { id: crypto.randomUUID(), name: "Fourth" },
  { id: crypto.randomUUID(), name: "Fifth" },
];

const template = (items: IDataItem[], error?: string) => `
  <form method="post" action="/items">
    <input type="text" name="item" />
    <button type="reset">Reset</button>
    <button type="submit">Add Item</button>
  </form>
  ${error ? `<p><font color="red">${error}</font></p>` : ""}
  <ul>
    ${items.map((item) => `<li>${item.id} - ${item.name}</li>`).join("\n")}
  </ul>
  `;

const indexHandler = (request: Request) => {
  const url = new URL(request.url);
  const error = url.searchParams.get("error") || undefined;

  return new Response(template(data, error), {
    status: 200,
    headers: {
      "Content-Type": "text/html",
    },
  });
};

const createHandler = async (request: Request) => {
  const body = await request.formData();
  const item = body.get("item") || "";

  if (item) {
    data.push({
      id: crypto.randomUUID(),
      name: item as string,
    });
  }

  const error = item === "" ? "?error=Item cannot be blank" : "";

  return new Response("", {
    status: 303,
    headers: {
      Location: `/items${error}`,
    },
  });
};

type RequestHandler = (request: Request) => Response | Promise<Response>;

interface MethodHandler {
  [key: string]: RequestHandler;
}

const handlers: { [key: string]: MethodHandler } = {
  GET: {
    "/": indexHandler,
    "/items": indexHandler,
  },
  POST: {
    "/items": createHandler,
  },
};

await server.serve(async (request: Request) => {
  const methodHandler = handlers[request.method];

  if (!methodHandler) {
    return new Response("Method Not Alloweds", { status: 405 });
  }

  const pathname = new URL(request.url).pathname;
  const handler = await methodHandler[pathname];

  if (handler) {
    return handler(request);
  }

  return new Response("Not Found", {
    status: 404,
  });
}, serverConfig);
