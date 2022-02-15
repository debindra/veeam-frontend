<template>
  <div class="banner">
    <h1 style="text-align:center">
      Welcome to
      Agent
    </h1>
  </div>
</template>

<script>
export default {
  name: "Agent",
  auth: false,
  layout: "admin",
  data() {
    return {};
  },
  methods: {},
  head() {
    return {
      title: "Home"
    };
  },
  created() {}
};
</script>
<style scoped></style>
<style lang="scss">
.banner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  h1 {
    font-size: 40px;
    font-weight: 700;
  }
}
</style>
