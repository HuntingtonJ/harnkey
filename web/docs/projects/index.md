---
---

# Projects

<script setup>
import {reactive, onMounted} from "vue";
import Sankey from "../../components/Sankey.vue";
import axios from "axios";

const data = reactive({
  name: 'DEMO',
  harnessData: [],
  projects: [],
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
  try {
    let harness = await getHarness(data.name);
    data.harnessData = [createData(harness)];
  } catch (error) {
    console.error(`Could not retrieve harness data: `, error);
  }
})

const getProjects = async function () {
  const res = await axios.get(`http://localhost:3000/projects`);

  return res.data;
}

const getHarness = async function (name) {
  const res = await axios.get(`http://localhost:3000/harness?name=${name}`);
  
  return res.data;
}

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
</script>

<div>Project: {{data.name}}</div>
<select v-model="data.name">
  <option v-for="project in data.projects">{{project.name}}</option>
</select>

<Sankey :harness-data="data.harnessData" :name="data.name"/>
