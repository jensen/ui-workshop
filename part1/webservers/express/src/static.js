import express from "express";
import { fileURLToPath } from "url";

const PORT = 3000;
const application = express();

application.use(express.static("../public"));

application.get("/", (request, response) => {
  return response.sendFile("index.html", {
    root: fileURLToPath(new URL("../../public", import.meta.url)),
  });
});

application.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
