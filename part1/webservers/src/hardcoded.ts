import * as server from "https://deno.land/std@0.122.0/http/server.ts";

const hardcoded = `
<!DOCTYPE html>
<html>

<head>
  <title>Basic Document</title>
</head>

<body>
  <h1>Basic Document</h1>
</body>

</html>
`;

await server.serve(
  async (request: Request) => {
    return new Response(hardcoded, {
      status: 200,
      headers: {
        "Content-Type": "text/html",
      },
    });
  },
  {
    port: 3000,
  }
);
