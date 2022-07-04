<template>
  <div class="template-base">
    <div class="container-base">
      <slot />
    </div>
  </div>
</template>

<script>
// import axios from "axios";

export default {
  name: "TemplateBase",
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.template-base {
  background-color: #efefef;
  display: flex;
  justify-content: center;
  padding: 30px 0;
  min-height: 100vh;
}
.container-base {
  width: 30%;
}
</style>
