<template>
  <div class="container-app">
    <div class="nav">
      <HeaderComponent />
    </div>
    <TemplateBase>
      <slot />
    </TemplateBase>
  </div>
</template>

<script>
import HeaderComponent from "../components/header/Header.vue";
import TemplateBase from "../components/template-base/TemplateBase.vue";

export default {
  name: "DefaultLayout",
  data() {
    return {};
  },
  components: {
    HeaderComponent,
    TemplateBase,
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
