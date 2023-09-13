# New Project

<div id="nameInput">
  <label>New project name: </label>
  <input v-model="data.name" placeholder="enter name"/>
  <button @click="createProject">Create</button>
</div>
<div :class="$style.error" id="errorDiv" v-if="data.error">{{data.error_message}}</div>
<div :class="$style.success" id="successDiv" v-if="data.success">{{data.success_message}}</div>

<script setup>
import {reactive, onMounted} from "vue";
import axios from "axios";

const data = reactive({
  error: false,
  name: "",
  error_message: "",
  success_message: "",
  success: false,
})

async function createProject(event) {
  if (!data.name) {
    setError("Please enter a name");
    console.error(data.error_message);
    return;
  }

  let validate = validateName(data.name);
  if (validate.error) {
    setError(validate.message);
    console.error(data.error_message);
    return;
  }

  let projectRes;
  try {
    projectRes = await postProject(data.name);
    if (!projectRes.err) {
      setSuccess();
    }
  } catch(error) {
    if (error.response) {
      setError(error.response.data.message);
    }
    
    console.error(error);
  }
  
  return;
}

async function postProject(name) {
  let err = false;
  let message = "";

  try {
    const res = await axios.post(`http://localhost:3000/projects`, {
      name,
    })
  } catch(error) {
    throw error
  }
  

  return {err, message};
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

  return {error, message};
}

function setError(message) {
  data.success = false;
  data.success_message = "";
  data.error = true;
  data.error_message = message;
  data.name = "";
}

function setSuccess() {
  data.success = true;
  data.success_message = `Created project ${data.name}`;
  data.error = false;
  data.error_message = "";
  data.name = "";
}
</script>

<style module>
  .error {
    color: red;
  }
  .success {
    color: green;
  }
</style>
