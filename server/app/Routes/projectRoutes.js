const express = require("express");
const router = express.Router();

const db = require("../Services/database.js");

const ProjectService = require("../Services/projectService.js");
const projectService = new ProjectService(db);

router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

router.get("/", async (req, res) => {
  const projects = await projectService.getProjects();
  res.json(projects);
});

router.post("/", async (req, res) => {
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
    console.log(error);
    res.status(422).json({
      error: true,
      message: error.message,
    });
    console.error(error);
    return;
  }

  res.status(200).json({
    error: false,
    name: name,
  });
});

router.post("/:projectId/nodes", async (req, res) => {
  const data = req.body;
  console.log(req.params);

  if (!data.nodes) {
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

module.exports = router;
