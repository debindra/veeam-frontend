<template>
  <div class="user-create">
    <div v-if="showList">
      <div class="page-title">Users</div>
      <div class="card">
        <div class="card-header">
          <a-row type="flex" justify="space-between">
            <a-col>
              <div class="card-title">
                <div class="back-btn" @click="goBack()">
                  <a-icon class="font-blue" type="left"></a-icon>
                </div>
                <span>EDIT USER</span>
              </div>
            </a-col>
          </a-row>
        </div>
        <a-spin tip="Fetching user data ...." :spinning="responseIsLoading">
          <register-user
            :editMode="true"
            :editUserData="userInfo"
            v-if="dataIsLoaded"
          />
        </a-spin>
      </div>
    </div>
    <not-authorized v-else />
  </div>
</template>
<script>
// import RegisterUser from "@/components/Forms/RegisterUser";

export default {
  layout: "admin",
  components: {
  },
  data() {
    return {
      userId: null,
      userInfo: [],
      dataIsLoaded: false,
      responseIsLoading: false
    };
  },
  methods: {
    getUserInfo() {
      this.responseIsLoading = true;
      this.$userAuth
        .getUserById(this.userId)
        .then(response => {
          this.userInfo = response.data.data;
          this.dataIsLoaded = true;
          this.responseIsLoading = false;
        })
        .catch(e => (this.responseIsLoading = false));
    },
    goBack() {
      window.history.back();
    }
  },
  head() {
    return { title: "Edit user" };
  },
  created() {
    this.userId = this.$route.params.id;
    this.getUserInfo();
  },
  computed: {
    showList() {
      return this.$gates.hasPermission("USER_UPDATE");
    }
  }
};
</script>
