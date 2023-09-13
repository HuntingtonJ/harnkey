const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./app/Services/database.js");
const HarnessService = require("./app/Services/harnessService.js");
const ProjectService = require("./app/Services/projectService.js");
require("./app/Services/harnessService.js");

const harnessService = new HarnessService(db);
const projectService = new ProjectService(db);

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
// app.use(express.static("dist"));

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

app.get("/projects", async (req, res, next) => {
  const projects = await projectService.getProjects();
  res.json(projects);
});

app.post("/projects", async (req, res, next) => {
  console.log(req.body);
  if (!req.body.name) {
    res.status(422).json({
      error: true,
      message: "Missing name",
    });

    return;
  }

  let name = req.body.name;

  try {
    const project = await projectService.createProject(name);
    console.log(project);
  } catch (error) {
    res.status(422).json({
      error: true,
      message: "Could not create project",
    });
    console.error(error);
    return;
  }

  app.post("/projects/:projectId", async (req, res, next) => {
    const data = req.body;
    console.log(req.params);

    if (!data.nodes[0]) {
      res.status(422).json({
        error: true,
        message: "Missing nodes",
      });

      return;
    }

    let nodes = data.nodes;

    nodes.foreach((node) => {
      try {
      } catch (error) {
        console.error(error);
      }
    });

    res.status(200).json({
      message: `Created nodes for projectId: ${req.params.projectId}`,
    });
  });

  res.status(200).json({
    error: false,
    name: name,
  });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
