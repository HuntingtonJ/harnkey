<template>
  <div id="plotTitle" style="text-align:center">
    <span>{{ name }}</span>
  </div>
  
  <div id="harnessDiv"></div>
</template>

<script>
import {onMounted, onUpdated} from "vue";
import Plotly from "plotly.js-dist-min";
import axios from 'axios';

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
          title: "Basic Sankey",
          // width: 1118,
          // height: 772,
          font: {
            size: 10,
          },
        }
      }
    }
  },
  setup(props) {
    onMounted(() => {
      console.log(props.harnessData);
      Plotly.react("harnessDiv", props.harnessData, props.layout);
    })

    onUpdated(() => {
      console.log(props.layout);
      console.log(props.harnessData[0]);
      Plotly.react("harnessDiv", props.harnessData, props.layout);
    })
  }
  
}
</script>