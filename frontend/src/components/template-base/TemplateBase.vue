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
@media (max-width: 870px) {
  .container-base {
    width: 60%;
  }
}
@media (max-width: 560px) {
  .container-base {
    width: 80%;
  }
}
@media (max-width: 330px) {
  .container-base {
    width: 95%;
  }
}
</style>
