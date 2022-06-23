import * as server from "https://deno.land/std@0.127.0/http/server.ts";
import * as path from "https://deno.land/std@0.127.0/path/mod.ts";

await server.serve(
  async (request: Request) => {
    const url = new URL(request.url);

    const filename =
      url.pathname === "/"
        ? path.resolve("./public/index.html")
        : path.resolve("./public" + url.pathname);

    try {
      const html = await Deno.readTextFile(filename);

      return new Response(html, {
        status: 200,
        headers: {
          "Content-Type": filename.endsWith(".css") ? "text/css" : "text/html",
        },
      });
    } catch (error) {
      return new Response("Not Found", {
        status: 404,
        headers: {
          "Content-Type": "text/plain",
        },
      });
    }
  },
  {
    port: 3000,
  }
);
