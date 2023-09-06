const express = require("express");
const Projects = require("./app/Repositories/projects.js");
const db = require("./app/Services/database.js");
require("./app/Repositories/projects.js");

const app = express();
const port = 3000;

const projects = new Projects(db);

app.use(express.static("dist"));

app.get("/harness", (req, res) => {
  res.json({
    nodes: [
      {
        index: 0,
        label: "A1",
        color: "blue",
      },
      {
        index: 1,
        label: "A2",
        color: "blue",
      },
      {
        index: 2,
        label: "B1",
        color: "red",
      },
      {
        index: 3,
        label: "B2",
        color: "red",
      },
      {
        index: 4,
        label: "C1",
        color: "orange",
      },
      {
        index: 5,
        label: "C2",
        color: "orange",
      },
    ],
    links: [
      {
        index: 0,
        source_node: 0,
        target_node: 2,
        value: 8,
      },
      {
        index: 1,
        source_node: 1,
        target_node: 3,
        value: 4,
      },
      {
        index: 2,
        source_node: 0,
        target_node: 3,
        value: 2,
      },
      {
        index: 3,
        source_node: 2,
        target_node: 4,
        value: 8,
      },
      {
        index: 4,
        source_node: 3,
        target_node: 4,
        value: 4,
      },
      {
        index: 5,
        source_node: 3,
        target_node: 5,
        value: 2,
      },
    ],
  });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
