<template>
  <div id="nodesTable">
    <table>
      <tr>
        <th>id</th>
        <th>Label</th>
        <th>Color</th>
        <th>Type</th>
      </tr>
      <tr v-for="node in nodes">
        <td>{{ node.id }}</td>
        <td>{{ node.label }}</td>
        <td>{{ node.color }}</td>
        <td>{{ node.type }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import {onMounted, onUpdated} from "vue";

export default {
  props: {
    nodes: {
      type: Array,
      default(rawProps) {
        return []
      }
    },
  },
  setup(props) {
    onMounted(() => {
      // console.log(props.nodes);
    })

    onUpdated(() => {
      // console.log(props.nodes);
    })
  }
  
}
</script>

<style>
  #nodesTable {
    display: flex;
    justify-content: center;
  }
  table {
    margin: 0 auto;
    align-self: center;
  }
</style>