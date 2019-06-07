<template>
  <div class="calc">
    <h1>{{ $t("titles.calc") }} <font-awesome-icon icon="calculator" /></h1>
    <div class="grid">
      <CalcInput />
      <CalcOutput />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.calc {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  border: 1px solid rgba($color: #000, $alpha: 1 / 3);
  padding: 1rem;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: ". .";
}
</style>

<style lang="scss">
.grid {
  h3 {
    margin-bottom: 0;
  }
}
</style>

<script>
import CalcInput from "@/components/CalcInput";
import CalcOutput from "@/components/CalcOutput";

export default {
  name: "Calculate",
  components: {
    CalcInput,
    CalcOutput
  }
};
</script>
