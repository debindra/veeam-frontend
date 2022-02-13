<template>
  <div class="container">
    <a-form-model ref="ruleForm" :model="form" :rules="rules">
      <a-form-model-item label="First name" prop="first_name">
        <a-input
          size="large"
          v-model="form.first_name"
          placeholder="First name"
        />
      </a-form-model-item>
      <a-form-model-item label="Middle name" prop="middle_name">
        <a-input v-model="form.middle_name" placeholder="Middle name"/>
      </a-form-model-item>
      <a-form-model-item label="Last name" prop="last_name">
        <a-input
          v-model="form.last_name"
          placeholder="Last name"
        />
      </a-form-model-item>
   
      <a-form-model-item label="Email" prop="email">
        <a-input v-model="form.email" placeholder="Email" />
      </a-form-model-item>
      
      <a-form-model-item
        label="Phone"
        prop="contact_number_primary"
      >
        <a-input
          v-model="form.contact_number_primary"
          placeholder="Phone"
          style="width: 100%"
          size="large"
        />
      </a-form-model-item>



      <a-form-model-item
        label="Password"
        prop="password"
      >
        <a-input
          v-model="form.password"
          placeholder="Password"
          style="width: 100%"
          size="large"
          type="password"
        />
      </a-form-model-item>

    
    </a-form-model>
   
  </div>
</template>

<script>
import _ from "lodash";
import moment from "moment";
export default {
  layout: "admin",
  props: {
    authRequired: { type: Boolean, default: true },
    editMode: {
      type: Boolean,
      default: false
    },
    editUserData: {}
  },
  data() {
    return {
      responseIsLoading: false,
    
      form: {
      
      },
      rules: {
        first_name: [{ required: true, message: "Cannot be empty" }],
        middle_name: [{ required: false, message: "Cannot be empty" }],
        last_name: [{ required: true, message: "Cannot be empty" }],
        email: [
          { required: true, message: "Cannot be empty" },
          { type: "email", message: "Please input a valid email" }
        ],
        contact_number_primary: [
          { required: true, message: "Cannot be empty" }
        
        ],
        contact_number_secondary: [
       
        ],
       
      },
     
    };
  },
  methods: {
    moment,
    redirectTo(key) {
      this.$router.push(key);
    },

   
    formSubmit() {
      this.responseIsLoading = true;
      let response = false;
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          response = true;
        } else {
          this.responseIsLoading = false;
          response = false;
        }
      });
      return response;
    },
    phoneValidator(rule, value, callback) {
      var numbers = /^[0-9]+$/;
      if (value.match(numbers) && value.length == 10) {
        callback();
      } else if (!value.match(numbers)) {
        callback("Phone number can be numbers only");
      } else if (value.length != 10) {
        callback("Should be exactly 10 digits");
      } else {
        callback("Error in Number");
      }
  
    },

    

    disabledDate(current) {
      return current && current > moment().endOf("day");
    },


 
  },
  watch: {
    form(newValue, oldValue) {
      this.$emit("input", this.form);
    }
  },
  components: {},

  created() {

  },
  mounted() {
    // if (this.editMode) {
    //   const user = this.editUserData;
    //   this.form.firstName = user.firstName;
    //   this.form.middleName = user.middleName;
    //   this.form.lastName = user.lastName;
    //   this.form.email = user.email;
    //   this.form.username = user.username;
    //   this.form.phone = user.phone;
    // }
  },
  computed: {}
};
</script>

<style scoped>
.ant-form {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.ant-form-item {
  width: 46%;
}
.ant-input {
  padding: 20px 10px;
  margin: 2px 2px;
}
</style>
