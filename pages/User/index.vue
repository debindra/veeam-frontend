<template>
  <div class="user-list">
    <div class="page-title">Users</div>
    <permission-alert v-if="showPermissionAlert"/>

    <div class="card">
      <div class="card-header">
        <a-row type="flex" justify="space-between">
          <a-col>
            <div class="card-title">
              <span>User List</span>
            </div>
          </a-col>
          <a-col>
            <a-button @click="redirect('/user/create')" type="primary">ADD</a-button>
          </a-col>
        </a-row>
      </div>
      <a-row type="flex" justify="end" style="margin-bottom: 5px">
        <a-col :span="6">
          <a-input-search placeholder="Search " enter-button allowClear @search="onSearch"/>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script>

export default {
  name: "User",
  layout: "admin",
  components: {
  },
  data() {
    return {
      users: [],
      responseIsLoading: false,
      pagination: { current: 1, total: 0 },
      query: {
        draw: 1,
        columns: [
          {
            data: "id",
            name: "",
            searchable: true,
            orderable: true,
            search: {
              value: "",
              regex: false
            }
          },
          {
            data: "firstName",
            name: "",
            searchable: true,
            orderable: true,
            search: {
              value: "",
              regex: false
            }
          },
          {
            data: "username",
            name: "",
            searchable: true,
            orderable: true,
            search: {
              value: "",
              regex: false
            }
          },
          {
            data: "region",
            name: "",
            searchable: true,
            orderable: true,
            search: {
              value: "",
              regex: false
            }
          }
        ],
        order: [
          {
            column: 0,
            dir: "desc"
          }
        ],
        start: 0,
        length: 10,
        search: {
          value: "",
          regex: false
        }
      }
    };
  },

  methods: {
    redirect(route) {
      this.$router.push(route);
    },
    onSearch(value) {}
  },

  head() {
    return {
      title: "User management"
    };
  },
  computed: {
    showPermissionAlert() {
      if (this.disableUserAdd || this.disableSwitch) {
        return true;
      }
      return false;
    }
  },
  watch: {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
.status {
  height: 5px;
  width: 5px;
  border-radius: 100%;
  display: inline-block;
  margin-right: 3px;
}
.active {
  background-color: #45d445;
}
.inactive {
  background-color: #b5b5b5;
}
</style>

<style lang="scss">
.user-list {
  .ant-table-tbody > tr > td {
    font-size: 14px;
  }
}
</style>
