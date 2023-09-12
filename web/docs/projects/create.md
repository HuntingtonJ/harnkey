# New Project

<div id="nameInput">
  <label>New project name: </label>
  <input v-model="data.name" placeholder="enter name"/>
  <button @click="createProject">Create</button>
</div>
<div class="error" id="errorDiv" :v-if="error">{{data.error_message}}</div>

<script setup>
import {reactive, onMounted} from "vue";
import axios from "axios";

const data = reactive({
  error: false,
  name: "",
  error_message: "",
  success_message: "",
})

async function createProject(event) {
  if (!data.name) {
    data.error = true;
    data.error_message = "Please enter a name";
    data.name = "";
    console.error(data.error_message);
    return;
  }

  let validate = validateName(data.name);
  if (validate.error) {
    data.error = true;
    data.error_message = validate.message;
    data.name = "";
    console.error(data.error_message);
    return;
  }

  let projectRes;
  try {
    projectRes = await postProject(data.name);
    if (projectRes.error) {
      throw new Error(projectRes.message);
    }
  } catch(error) {
    data.error = true;
    data.error_message = error.data;
    data.name = "";
    console.error(error);
  }

  return;
}

async function postProject(name) {
  let error = false;
  const res = await axios.post(`http://localhost:3000/projects`, {
    name,
  })

  if (!res.status === 200) {
    error = true;
    res.data.message;
    return {error, message};
  }
}

// Should validate that a nmae has only alphanumeric charaters upto 32 characters
function validateName(name) {
  let error = false;
  let message = "";

  if (name.length > 32) {
    error = true;
    message = "Name is greater than 32 characters"
    return {error, message}
  }

  return {error};
}
</script>
