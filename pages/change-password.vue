<template>
  <div class="reset-password">
    <div class="card">
      <div class="card-header">
        <div class="card-title">
          <span>Reset Password</span>
        </div>
      </div>
      <div class="reset-form">
        <a-row>
          <a-col :span="12" :lg="8" :md="12" :sm="12" :xs="24">
            <a-form-model ref="userForm" :rules="rules" :model="form">
              <a-form-model-item prop="password" label="Old password">
                <a-input-password
                  size="large"
                  placeholder="Enter Old Password"
                  v-model="form.password"
                >
                  <a-icon slot="prefix" type="key" />
                </a-input-password>
              </a-form-model-item>

              <a-form-model-item prop="newPassword" label="New password">
                <a-input-password
                  size="large"
                  placeholder="New Password"
                  v-model="form.newPassword"
                >
                  <a-icon slot="prefix" type="key" />
                </a-input-password>
              </a-form-model-item>
              <a-form-model-item
                prop="newPasswordConfirm"
                label="New password confirm"
              >
                <a-input-password
                  size="large"
                  placeholder="Confirm New Password"
                  v-model="form.newPasswordConfirm"
                >
                  <a-icon slot="prefix" type="key" />
                </a-input-password>
              </a-form-model-item>
              <a-form-model-item>
                <a-button class="primary-green" type="primary" @click="onSubmit"
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
        newPassword: "",
        newPasswordConfirm: ""
      },
      rules: {
        password: [
          { required: true, message: "Please enter your old password" }
        ],
        newPassword: [
          { required: true, message: "Please enter new password" },
          { min: 6, message: "At least 6 Characters long" },
          { validator: this.passwordValidator }
        ],
        newPasswordConfirm: [
          { required: true, message: "Please Confirm your password" },
          { validator: this.confirmpasswordValidator }
        ]
      }
    };
  },
  methods: {
    oldPasswordValidator(rule, value, callback) {
      callback();
    },
    passwordValidator(rule, value, callback) {
      var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      if (value.length == 0) {
        callback("Cannot be empty");
      } else if (this.form.password == value) {
        callback("Cannot be same as old password");
      } else if (!format.test(value)) {
        callback("Should atleast have a special character");
      } else {
        callback();
      }
    },
    confirmpasswordValidator(rule, value, callback) {
      if (this.form.newPassword == value) {
        callback();
      } else {
        callback("Passwords do not match");
      }
    },
    onSubmit() {
      this.$refs.userForm.validate(valid => {
        if (valid) {
          delete this.form["newConfirmPassword"];
          this.$userAuth
            .changePassword(this.form)
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

<style></style>
