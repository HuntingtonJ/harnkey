<template>
  <div id="linksTable">
    <table>
      <tr>
        <th>id</th>
        <th>Source Node</th>
        <th>Target Node</th>
        <th>Count</th>
        <th>Label</th>
      </tr>
      <tr v-for="link in links">
        <td>{{ link.id }}</td>
        <td>{{ nodes[link.sourceIndex].label }}</td>
        <td>{{ nodes[link.targetIndex].label }}</td>
        <td>{{ link.count }}</td>
        <td>{{ link.label }}</td>
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
    links: {
      type: Array,
      default(rawProps) {
        return []
      }
    }
  },
  setup(props) {
    onMounted(() => {
      // console.log(props.links);
    })

    onUpdated(() => {
      console.log(props.nodes);
      console.log(props.links);
    })
  }
  
}
</script>

<style>
  #linksTable {
    display: flex;
    justify-content: center;
  }
  table {
    margin: 0 auto;
    align-self: center;
  }
  .vp-doc td {
    padding: 2px 16px;
    text-align: center;
  }
</style>