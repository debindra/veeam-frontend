<template>
  <div class="reset-password container">
    <a-row type="flex" align="middle" justify="center" style="height: calc(100vh - 200px)">
      <div>
        <div class="login-dialog">
          <div class="logo-section">
            <img src="logo.png" alt width="60px">
          </div>
          <a-form-model
            ref="userForm"
            :rules="rules"
            :model="form"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item prop="password">
              <a-input-password size="large" placeholder="Enter Password" v-model="form.password">
                <a-icon slot="prefix" type="user"/>
              </a-input-password>
            </a-form-model-item>

            <a-form-model-item prop="confirmpassword">
              <a-input-password
                size="large"
                placeholder="Confirm Password"
                v-model="form.confirmpassword"
              >
                <a-icon slot="prefix" type="user"/>
              </a-input-password>
            </a-form-model-item>

            <a-form-model-item style="margin-bottom: 0">
              <a-button
                size="large"
                class="width-100 primary-green"
                type="primary"
                @click="onSubmit"
              >
                Reset
                <!-- <a-icon type="loading" v-if="connecting"></a-icon> -->
              </a-button>
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
        password: "",
        confirmpassword: "",
        token: ""
      },
      alert: {
        message: "Null",
        status: "",
        icon: ""
      },
      rules: {
        password: [
          { required: true, message: "Please enter your password" },
          { validator: this.passwordValidator }
        ],
        confirmpassword: [
          { required: true, message: "Please enter your password" },
          { validator: this.confirmpasswordValidator }
        ]
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs.userForm.validate(valid => {
        if (valid) {
          this.$userAuth
            .resetForgotPassword(this.form)
            .then(response => {
              this.$message.info(response.data.message);
              this.$router.push("/");
            })
            .catch(error => {
              this.$message.error("Something went wrong");
            });
        }
      });
    },
    passwordValidator(rule, value, callback) {
      var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      if (value.length == 0) {
        callback("Cannot be empty");
      } else if (value.length < 6) {
        callback("Should be atleast 6 characters");
      } else if (!format.test(value)) {
        callback("Should atleast have a special character");
      } else {
        callback();
      }
    },
    confirmpasswordValidator(rule, value, callback) {
      if (this.form.password == value) {
        callback();
      } else {
        callback("Passwords do not match");
      }
    }
  },
  created() {
    this.form.token = this.$route.params.id;
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
  /* margin: 0 auto; */
}
.logo-section {
  margin-bottom: 30px;
}
.container {
  min-height: calc(100vh - 80px);
}
</style>
<style lang="scss">
.reset-password {
  .ant-input-affix-wrapper .ant-input {
    text-align: left !important;
  }
}
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
    color: #39964e;
    font-size: 16px;
  }
}
</style>
