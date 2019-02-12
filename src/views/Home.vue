<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <HelloWorld msg="Welcome" />
    <JsonTableData />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import JsonTableData from "@/components/JsonTableData.vue";

export default {
  name: "home",
  components: {
    HelloWorld,
    JsonTableData
  }
};
</script>
