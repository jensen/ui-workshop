import express from "express";
import body from "body-parser";

const PORT = 3000;
const application = express();

const data = [];

const template = (items) => `
  <form method="post" action="/">
    <input type="text" name="item" />
    <button type="reset">Reset</button>
    <button type="submit">Add Item</button>
  </form>
  <ul>
    ${items.map((item) => `<li>${item.id} - ${item.name}</li>`).join("\n")}
  </ul>
  `;

application.use(body.urlencoded({ extended: false }));

application.get("/", (request, response) => {
  response.send(template(data));
});

application.post("/", (request, response) => {
  data.push({ id: data.length + 1, name: request.body.item });
  response.redirect("/");
});

application.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
