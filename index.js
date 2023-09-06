const express = require("express");
const db = require("./app/Services/database.js");
const HarnessService = require("./app/Services/harness.js");
require("./app/Services/harness.js");

const harnessService = new HarnessService(db);

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

app.use(express.static("dist"));

app.get("/harness", async (req, res) => {
  let name = "";
  let harness = null;
  if (req.query.name) {
    name = req.query.name;
  }
  try {
    harness = await harnessService.getHarness(name);
    res.json(harness);
  } catch (error) {
    console.error(error);
    res.status(404).send({
      error: true,
      message: error,
    });
  }
});

app.get("/projects", async (req, res) => {});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
