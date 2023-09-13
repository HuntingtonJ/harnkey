const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const harnessRoutes = require("./app/Routes/harnessRoutes.js");
const projectRoutes = require("./app/Routes/projectRoutes.js");

// async function test() {
//   try {
//     console.log(await harnessService.getHarness("DEMO"));
//   } catch (error) {
//     console.error(error);
//   }
// }

// test();

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.get("/ping", (res) => {
  res.send("pong");
});

app.use("/harness", harnessRoutes);
app.use("/projects", projectRoutes);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
