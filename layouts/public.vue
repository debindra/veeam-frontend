<template>
  <div class="row main-container">
    <div class="fixed-width">
      <div class="public-header" style="border-bottom: 2px solid #fff;">
    
     
      </div>
    
    </div>

    <div class="main-content">
      <div class="fixed-width">
        <div class="bg-white">
          <nuxt></nuxt>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="fixed-width">All Rights Reserved</div>
    </div>

  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      time: "--"
    };
  },
  methods: {
    checkActive(key) {
      if (this.$route.path == key) {
        return "active";
      }
    }
  },
  mounted() {
    this.time = new Date();
    setInterval(() => {
      let d = new Date();
      this.time = d.toLocaleString("en-US", {
        timeZone: "Africa/Dar_es_Salaam"
      });
    }, 1);
  },
  computed: {}
};
</script>
<style lang="scss">
.public-header {
  background-color: #cfcaca;
  // padding: 20px 100px;
}
.header-text {
  color: #fff;
  font-size: 35px;
  font-weight: 400;
  margin-left: 20px;
  text-align: center;
}
.header-date {
  margin-bottom: 0;

  span {
    background-color: #186058;
    color: #fff;
    text-align: right;
    margin-bottom: 0;
    font-size: 15px;
    padding: 5px 10px;
    margin-bottom: 0;
  }
}

.main-link {
  margin-bottom: 0;
  padding-left: 0;
  li {
    list-style-type: none;
    display: inline-block;
    font-size: 16px;
    text-transform: uppercase;
    font-family: Roboto;
    padding: 8px 16px;
    a {
      color: #fff !important;
    }
  }
}
.main-content {
  min-height: calc(100vh - 200px);
}
.footer {
  background-color: whitesmoke;
  padding: 20px;
  margin-top: 50px;
}

.public-nav {
  background-color: #091c2b;
}
.banner-text {
  font-size: 25px;
  color: #fff;
  text-transform: uppercase;
  text-shadow: 2px 4px 3px rgba(0, 0, 0, 0.3);
  font-weight: 600;
}
.sub-banner-text {
  font-size: 18px;
  color: #fff;
  text-transform: uppercase;
  text-shadow: 2px 4px 3px rgba(0, 0, 0, 0.3);
  font-weight: 600;
  margin-bottom: 0;
}
.active {
  background-color: #005aaa;
  a {
    color: #fff !important;
  }
}
.main-container {
  background-color: #f4f6f9;
}
.bg-white {
  background-color: #fff;
  border: 1px solid #e2e2e2;
}
</style>
