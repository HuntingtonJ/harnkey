---
layout: doc
---

# Projects

<div style="display:inline">Project: </div>
<div style="display:inline" class="projectSelect">
  <select v-model="data.name" @change="updateHarness()">
    <option v-for="project in data.projects">{{project.name}}</option>
  </select>
</div>

<Sankey :harness-data="data.harnessData" :name="data.name"/>

# Nodes

<NodeTable :nodes="data.nodes" />

# Links

<LinkTable :nodes="data.nodes" :links="data.links" />

<script setup>
import {reactive, onMounted, onUpdated} from "vue";
import Sankey from "../../components/Sankey.vue";
import NodeTable from "../../components/NodeTable.vue";
import LinkTable from "../../components/LinkTable.vue";
import axios from "axios";

const data = reactive({
  name: 'DEMO',
  harnessData: [],
  projects: [],
  links: [],
  nodes: [],
})

onMounted(async () => {
  // Get list of projects
  try {
    let projects = await getProjects();
    data.projects = projects;
  } catch (error) {
    console.error(`Could not retrieve projects`, error);
  }

  // Get harness data
  await updateHarness();
})

async function updateHarness() {
  try {
    let harness = await getHarness(data.name);
    data.harnessData = [createData(harness)];
  } catch (error) {
    console.error(`Could not retrieve harness data: `, error);
  }
}

async function getProjects() {
  const res = await axios.get(`http://localhost:3000/projects`);

  return res.data;
}

async function getHarness(name) {
  const res = await axios.get(`http://localhost:3000/harness?name=${name}`);

  return res.data;
}

function createData(resData) {
  data.links = resData.links;
  data.nodes = resData.nodes;

  var boilerplate = {
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

  if (typeof data.links !== "object" || typeof data.nodes !== "object") {
    console.error(`typeof links: ${typeof data.links}`);
    console.error(`typeof nodes: ${typeof data.nodes}`);
    throw new Error("Links or Nodes is not an object");
  }

  // Build nodes
  Object.entries(data.nodes).map((entry) => {
    let node = entry[1];
    boilerplate.node.label.push(node.label);
    boilerplate.node.color.push(node.color);
  });

  // Build links
  Object.entries(data.links).map((entry) => {
    let link = entry[1];
    boilerplate.link.source.push(link.sourceIndex);
    boilerplate.link.target.push(link.targetIndex);
    boilerplate.link.value.push(link.count);
  });

  // console.log(data);
  return boilerplate;
};
</script>

<style module>

</style>
