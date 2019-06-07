<template>
  <div class="home">
    <Calculate />
  </div>
</template>

<script>
// @ is an alias to /src
import Calculate from "@/components/Calculate.vue";

export default {
  name: "home",
  components: {
    Calculate
  }
};
</script>
