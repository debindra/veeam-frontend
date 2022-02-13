<template>
  <div class="container">
    <a-spin :spinning="loading">
      <div class="spin-content">
        <a-row type="flex" align="middle" justify="center" style="height: calc(100vh - 200px)">
          <div class="login-dialog">
            <div class="logo-section">

              <h2> BAAS System</h2>
            </div>
            <a-form-model
              :model="form"
              ref="loginForm"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              :rules="rules"
            >
              <a-form-model-item prop="email">
                <a-input size="large" placeholder="Enter Username" v-model="form.email">
                  <a-icon slot="prefix" type="user"/>
                </a-input>
              </a-form-model-item>

              <a-form-model-item prop="password">
                <a-input-password size="large" placeholder="Enter Password" v-model="form.password">
                  <a-icon slot="prefix" type="key"/>
                </a-input-password>
              </a-form-model-item>

              <a-form-model-item style="margin-bottom: 0">
                <a-button
                  size="large"
                  class="width-100 primary-green"
                  type="primary"
                  :disabled="loading"
                  @click="onSubmit"
                >
                  LOGIN
                  <a-icon type="loading" v-if="loading"></a-icon>
                </a-button>
                <p class="login-action">
                  <span>
                    <nuxt-link to="/forgot-password">Forgot Password?</nuxt-link>
                  </span>
                </p>
              </a-form-model-item>
            </a-form-model>
          </div>
        </a-row>
      </div>
    </a-spin>
  </div>
</template>

<script>
export default {
  name: "login",
  layout: "public",
  components: {},
  data() {
    return {
      loading: false,
      labelCol: { span: 24 },
      wrapperCol: { span: 24 },
      form: {
        email: "test@test.com",
        password: "password"
      },
      rules: {
        email: [{ required: true, message: "Please enter email" }],
        password: [{ required: true, message: "Please enter password" }]
      }
    };
  },
  methods: {
    onSubmit() {
      var vm = this;
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          try {
            this.$auth
              .loginWith("local", {
                data: this.form
              })
              .then(response => {
                this.$message.success('Success');
                // this.$store.dispatch("config/getUserDetails");
                // this.$store.dispatch("user/getMenuList");
                this.$router.push("dashboard");
                this.loading = false;
              })
              .catch(error => {
                // debugger
                console.log(error)
                this.loading = false;
                // this.$message.error(error.response.data.message);
              });
          } catch (error) {
   console.log(error)
            this.$message.error(error.response);
            this.loading = false;
          }
        } else {
        }
      });

    }
  },
  head() {
    return { title: "Login " };
  },
  created() {}
};
</script>
<style scoped lang="scss">
.indicators {
  margin-bottom: 20px;
}
.login-dialog {
  width: 400px;
  border: 1px solid #e8e8e8;
  padding: 40px;
  text-align: center;
  background-color: #fff;
  box-shadow: 5px 12px 29px #e2e2e2;
}
.logo-section {
  margin-bottom: 20px;
}
.width-100 {
  width: 100%;
}
.container {
  min-height: calc(100vh - 80px);
}
</style>
<style lang="scss">
.login-dialog {
  .ant-input-affix-wrapper .ant-input {
    text-align: left !important;
  }
  .ant-form-explain {
    text-align: left !important;
    font-size: 12px;
  }
  .login-action {
    margin-bottom: 0;
  }
  .ant-input-prefix {
    color: #005aaa;
    font-size: 16px;
  }
}
</style>
