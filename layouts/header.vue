<template>
  <div>
    <div class="logo" />
    <a-menu
      theme="dark"
      mode="horizontal"
      :default-selected-keys="['2']"
      :style="{ lineHeight: '64px' }"
    >
      <a-menu-item key="1">nav 1</a-menu-item>
      <a-menu-item key="2">nav 2</a-menu-item>
      <a-menu-item key="3">nav 3</a-menu-item>
    </a-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      time: "--"
    };
  },
  mounted() {
    this.time = new Date();
    setInterval(() => {
      let d = new Date();
      this.time = d.toLocaleString("en-US", {
        timeZone: "Nepal/Kathmandu"
      });
    }, 1);
  }
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
.top-header {
  padding: 15px 60px;
  background-size: cover;
}
.left-img {
  height: 68px;
  width: 58px;
}
.heading-text {
  margin-top: 13px;
  margin-left: 17px;
  font-family: Roboto;
  font-style: normal;
}
p {
  display: block;
  margin: 0px;
  padding: 0px;
}
.heading {
  font-size: 22px;
  font-weight: 600;
  line-height: 25px;
}
.sub-heading {
  font-size: 15px;
  font-weight: normal;
}

nav {
  background-color: #3196dc;
  padding-right: 60px;
}
.nav-item {
  margin: 9px 36px 9px 0px;
  font-weight: 500;
  font-size: 15px;
  color: #fff;
}
.nav-item:last-child {
  margin-right: 0px;
}
.link {
  color: rgb(255, 255, 255);
}
</style>
<style lang="scss">
.updated-date {
  text-align: right;
  background-color: #00000047;
  padding: 20px 10px;
  p {
    color: #ffffff !important;
    font-weight: 500;
  }
}
</style>
