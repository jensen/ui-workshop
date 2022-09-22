import express from "express";

const PORT = 3000;
const application = express();

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

application.get("/", (request, response) => {
  response.send(hardcoded);
});

application.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
