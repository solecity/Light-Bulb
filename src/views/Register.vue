<template>
  <div class="">
    <Register/>
  </div>
</template>


<script>
// @ is an alias to /src
import Register from "@/components/Register.vue";

export default {
  name: "register",
  components: {
    Register
  }
};
</script>


<style scoped>
.container-fluid {
  background-color: black;
}
</style>
