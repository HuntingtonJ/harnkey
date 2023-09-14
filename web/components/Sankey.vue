<template>
  <div id="harnessDiv"></div>
</template>

<script>
import {onMounted, onUpdated} from "vue";
import Plotly from "plotly.js-dist-min";

export default {
  props: {
    harnessData: {
      type: Array,
      default(rawProps) {
        return []
      }
    },
    name: String,
    layout: {
      type: Object,
      default(rawProps) {
        return {
          title: "Harness Sankey",
          // width: 1118,
          // height: 772,
          font: {
            size: 10,
            color: "white",
          },
          plot_bgcolor: "#272626",
          paper_bgcolor: "#272626",
        }
      }
    }
  },
  setup(props) {
    onMounted(() => {
      Plotly.newPlot("harnessDiv", props.harnessData, props.layout);
    })

    onUpdated(() => {
      props.layout.title = `${props.name} Sankey`;
      Plotly.react("harnessDiv", props.harnessData, props.layout);
    })
  }
  
}
</script>