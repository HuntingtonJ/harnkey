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
  const params = req.params;
  const data = req.body;

  const projectId = Number(params.projectId);

  let project;
  try {
    project = await projectService.getProjectById(projectId);
  } catch (error) {
    console.error(error);
    res.status(422).json({
      error: true,
      message: error.message,
    });

    return;
  }

  if (!(project.length > 0)) {
    res.status(404).json({
      error: true,
      message: "Project does not exist",
    });

    return;
  }

  if (!data.nodes) {
    res.status(422).json({
      error: true,
      message: "Missing nodes",
    });

    return;
  }

  const nodes = data.nodes;
  console.log(nodes);

  if (!(nodes.length > 0)) {
    res.status(422).json({
      error: true,
      message: "Nodes is an empty array",
    });

    return;
  }

  let newNodes;
  try {
    newNodes = await projectService.createNodes(projectId, nodes);
  } catch (error) {
    console.error(error);
    res.status(400).json({
      error: true,
      message: "Failed to add nodes",
    });

    return;
  }

  res.status(200).json({
    newNodes,
    message: `Created nodes for projectId: ${req.params.projectId}`,
  });
});

module.exports = router;
