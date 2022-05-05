import * as server from "https://deno.land/std@0.127.0/http/server.ts";
import * as path from "https://deno.land/std@0.127.0/path/mod.ts";

const mimetypes: { [key: string]: string } = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".ico": "image/x-icon",
};

interface IParty {
  id: string;
  guestlist: string[];
  date: string;
  pizzas: number;
}

const parties: IParty[] = [];

const tagPartyList = "<!-- component-party-list -->";
const renderPartyList = (list: IParty[]) =>
  list
    .map(
      (party) =>
        `
        <li class="horizontal-flex horizontal-space">
          <div class="vertical-flex">
            <h3>Date</h3>
            <h4>${party.date}</h4>
          </div>
          <div class="vertical-flex">
            <h3>Pizzas</h3>
            <h4>${party.pizzas}</h4>
          </div>
          <div class="vertical-flex">
            <h3>Gueslist</h3>
            <h4>${party.guestlist.join(", ")}</h4>
          </div>
        </li>
        `
    )
    .join("\n");

await server.serve(
  /*
   Request
   Reference: https://developer.mozilla.org/en-US/docs/Web/API/Request
 */
  async (request: Request) => {
    /*
      URL
      Reference: https://developer.mozilla.org/en-US/docs/Web/API/URL
    */
    const url = new URL(request.url);

    if (request.method === "POST" && url.pathname === "/api/create") {
      /*
        FormData
        Reference: https://developer.mozilla.org/en-US/docs/Web/API/FormData
      */
      const body = await request.formData();

      const party: IParty = {
        /*
          Crypto
          Reference: https://developer.mozilla.org/en-US/docs/Web/API/Crypto
        */
        id: crypto.randomUUID(),
        guestlist: body.getAll("attendees") as string[],
        date: body.get("date") as string,
        pizzas: Number(body.get("pizzas")),
      };

      const errors: string[] = [];

      if (party.guestlist.some((name) => name === "")) {
        errors.push("All attendees must have a name");
      }

      if (party.guestlist.length < 2) {
        errors.push("Must invite a minimum of 2 people");
      }

      if (!party.date) {
        errors.push("Date must be set");
      }

      if (party.pizzas / party.guestlist.length < 0.5) {
        errors.push("Must have at least half of a pizza per person");
      }

      if (errors.length > 0) {
        return new Response(JSON.stringify(errors), {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      parties.push(party);

      /*
        Response
        Reference: https://developer.mozilla.org/en-US/docs/Web/API/Response
      */
      return new Response(JSON.stringify(party), {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    if (request.method === "GET" && url.pathname === "/api/list") {
      /*
        Response
        Reference: https://developer.mozilla.org/en-US/docs/Web/API/Response
      */
      return new Response(JSON.stringify(parties), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const filename =
      url.pathname === "/"
        ? path.resolve("./public/index.html")
        : path.resolve("./public" + url.pathname);

    try {
      const file = await Deno.readTextFile(filename);
      const extension = filename.substring(filename.lastIndexOf("."));

      /*
        Response
        Reference: https://developer.mozilla.org/en-US/docs/Web/API/Response
      */
      return new Response(
        filename.endsWith("index.html")
          ? file.replace(tagPartyList, renderPartyList(parties))
          : file,
        {
          status: 200,
          headers: {
            "Content-Type": mimetypes[extension],
            "Cache-Control": "public, max-age=3600",
          },
        }
      );
    } catch (error) {
      /*
        Response
        Reference: https://developer.mozilla.org/en-US/docs/Web/API/Response
      */
      return new Response("Not Found", { status: 404 });
    }
  },
  {
    port: 3000,
  }
);
