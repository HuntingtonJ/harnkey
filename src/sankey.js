import Plotly from "plotly.js-dist-min";
import axios from "axios";

let harness_data = [];
var layout = {
  title: "Basic Sankey",
  width: 1118,
  height: 772,
  font: {
    size: 10,
  },
};

axios
  .get("/harness?name=DEMO")
  .then(function (res) {
    console.log(res.data);
    harness_data = [createData(res.data)];
  })
  .catch(function (error) {
    console.error(error);
  })
  .finally(function () {
    console.log("/harness");
    Plotly.react("harnessDiv", harness_data, layout);
  });

const createData = function (resData) {
  const links = resData.links;
  const nodes = resData.nodes;

  var data = {
    type: "sankey",
    orientation: "h",
    node: {
      pad: 15,
      thickness: 30,
      line: {
        color: "black",
        width: 0.5,
      },
      label: [],
      color: [],
    },

    link: {
      source: [],
      target: [],
      value: [],
    },
  };

  if (typeof links !== "object" || typeof nodes !== "object") {
    console.error(`typeof links: ${typeof links}`);
    console.error(`typeof nodes: ${typeof nodes}`);
    throw new Error("Links or Nodes is not an object");
  }

  Object.entries(nodes).map((entry) => {
    let node = entry[1];
    data.node.label.push(node.label);
    data.node.color.push(node.color);
  });

  Object.entries(links).map((entry) => {
    let link = entry[1];
    data.link.source.push(link.sourceIndex);
    data.link.target.push(link.targetIndex);
    data.link.value.push(link.count);
  });

  console.log(data);
  return data;
};
