<template>
  <div class="user-create">
    <div class="page-title">Users</div>
    <div class="card">
      <div class="card-header">
        <a-row type="flex" justify="space-between">
          <a-col>
            <div class="card-title">
              <span>ADD USER</span>
            </div>
          </a-col>
        </a-row>
      </div>
      <register-user/>
    </div>
  </div>
</template>
<script>
import RegisterUser from "./Components/UserForm";

export default {
  layout: "admin",
  components: {
    RegisterUser
  },
  data() {
    return {};
  },
  methods: {},
  computed: {
  },
  head() {
    return { title: "Add user" };
  }
};
</script>
