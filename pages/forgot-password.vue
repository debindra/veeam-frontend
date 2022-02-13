<template>
  <div class="forgot-password container">
    <a-row type="flex" align="middle" justify="center" style="height: calc(100vh - 200px)">
      <div>
        <div class="login-dialog">
          <div class="logo-section">
            BAAS System
          </div>
          <a-form-model
            ref="userForm"
            :rules="rules"
            :model="form"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item label="Enter your registered email" prop="email">
              <a-input size="large" placeholder="Enter Email" v-model="form.email">
                <a-icon slot="prefix" type="user"/>
              </a-input>
            </a-form-model-item>

            <a-form-model-item style="margin-bottom: 0">
              <a-button
                size="large"
                class="width-100 primary-green"
                type="primary"
                @click="onSubmit"
              >Submit</a-button>
              <nuxt-link to="/">Cancel</nuxt-link>
            </a-form-model-item>
          </a-form-model>
        </div>
      </div>
    </a-row>
  </div>
</template>

<script>
export default {
  name: "login",
  layout: "public",
  auth: false,
  components: {},

  data() {
    return {
      alertVisible: false,
      labelCol: { span: 24 },
      wrapperCol: { span: 24 },
      form: {
        email: ""
      },
      alert: {
        message: "Null",
        status: "",
        icon: ""
      },
      rules: {
        email: [{ required: true, message: "Please enter your email" }]
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs.userForm.validate(valid => {
        if (valid) {
          this.$userAuth
            .forgotPassword(this.form.email)
            .then(response => {
              this.$message.info(response.data.message);
              this.$auth.logout();
              this.$router.push("/login");
            })
            .catch(error => {
              this.$message.error("Something went wrong");
            });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login-dialog {
  width: 400px;
  border: 1px solid #a0e9fd;
  padding: 40px;
  text-align: center;
  background-color: #fff;
  box-shadow: 5px 12px 29px #e2e2e2;

}
.logo-section {
  margin-bottom: 20px;
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
    font-size: 12px;
    margin-bottom: 0;
  }
  .ant-input-prefix {
    color: #005aaa;
    font-size: 16px;
  }
}
</style>
