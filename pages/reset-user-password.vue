<template>
  <div class="user-password">
    <div class="card">
      <div class="card-header">
        <div class="card-title">
          <span>Reset Password</span>
        </div>
      </div>
      <div class="reset-form">
        <a-row>
          <a-col :span="12" :lg="8" :md="12" :sm="12" :xs="24">
            <a-form-model
              ref="userForm"
              :rules="rules"
              :model="form"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
            >
              <a-form-model-item prop="password">
                <a-input
                  type="password"
                  size="large"
                  placeholder="Enter new password"
                  v-model="form.password"
                >
                  <a-icon slot="prefix" type="key" />
                </a-input>
              </a-form-model-item>

              <a-form-model-item prop="confirmpassword">
                <a-input
                  type="password"
                  size="large"
                  placeholder="Confirm new password"
                  v-model="form.confirmpassword"
                >
                  <a-icon slot="prefix" type="key" />
                </a-input>
              </a-form-model-item>

              <a-form-model-item>
                <a-button
                  size="small"
                  class="primary-green"
                  type="primary"
                  @click="onSubmit"
                  >Reset</a-button
                >
              </a-form-model-item>
            </a-form-model>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "admin",
  data() {
    return {
      form: {
        password: "",
        confirmpassword: ""
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
    },
    onSubmit() {
      console.log(this.form);
    }
  }
};
</script>

<style lang="scss">
.reset-form {
  margin-top: 50px;
}
</style>
