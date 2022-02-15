<template>
  <a-layout
    class="admin-layout"
    id="components-layout-demo-custom-trigger"
    style="min-height: 100vh"
  >
    <a-layout-sider class="sidebar" v-model="collapsed" :trigger="null" collapsible width="250px">
      <div class="logo">
        BAAS System
      </div>
        <a-menu
        theme="light"
        :defaultSelectedKeys="[$route.name]"
        @click="redirectToMenu"
        mode="inline"
        style="background-color: #fff"
      >
        <template v-for="item in menu">
          <a-menu-item v-if="item.subModules.length == 0" :key="item.path">
            <a-icon class="font-blue menu-icon" :type="item.icon"></a-icon>
            <span v-text="item.title"></span>
          </a-menu-item>

          <a-sub-menu v-else>
            <span slot="title">
              <a-icon class="font-blue menu-icon" :type="item.icon"/>
              <span>{{ item.title }}</span>
            </span>
            <template v-for="subitem in item.subModules">
              <a-menu-item
                style="font-size:12px;"
                v-if="subitem.subModules.length == 0"
                :key="subitem.path"
              >{{ subitem.title }}</a-menu-item>
              <a-sub-menu v-else>
                <span slot="title" style="display:flex; list-style-type:none; ">
                  <a-menu-item style="font-size:12px;">
                    {{
                    subitem.title
                    }}
                  </a-menu-item>
                </span>
                <a-menu-item
                  style="font-size:12px;"
                  v-for="childitem in subitem.subModules"
                  :key="childitem.path"
                >{{ childitem.title }}</a-menu-item>
              </a-sub-menu>
            </template>
          </a-sub-menu>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="padding-right: 30px">
        <a-row>
          <a-col :span="12">
            <a-icon
              class="trigger"
              :type="collapsed ? 'menu-unfold' : 'menu-fold'"
              @click="() => (collapsed = !collapsed)"
            />
          </a-col>
          <a-col :span="12" class="text-right">
            <nuxt-link to="/">
              <a-button>
                <a-icon type="rollback"></a-icon>
              </a-button>
            </nuxt-link>
            <a-badge :count="notificationCount">
              <a-button class="accent-button" type="primary" @click="showNotificationDrawer">
                <a-icon type="setting"/>
              </a-button>
            </a-badge>
          </a-col>
        </a-row>
        <a-drawer
          placement="right"
          :closable="true"
          :visible="notificationDrawer"
          :after-visible-change="afterVisibleChange"
          @close="onClose"
          width="400px"
        >
          <div class="profile-section">
            <a-row type="flex">
              <a-col style="padding-right: 20px">
                <a-avatar>
                  <a-icon slot="icon" type="user"/>
                </a-avatar>
              </a-col>
              <a-col>
                <p class="profile-name">{{ userName }}</p>
                <div class="profile-designation">
                  <p>
                    <span v-for="role in userRole" :key="role.id">
                      {{
                      role.title
                      }}
                    </span>
                  </p>
                </div>
                <a-button @click="viewProfile" type="primary">View Profile</a-button>

                <a-popconfirm
                  placement="bottomRight"
                  title="Are you sure you want to logout?"
                  ok-text="Yes"
                  cancel-text="No"
                  @confirm="logout"
                >
                  <a-button type="default" @click="logoutVisible = true">Logout</a-button>
                </a-popconfirm>
              </a-col>
            </a-row>
          </div>
        </a-drawer>
      </a-layout-header>
      <a-layout-content :style="{ margin: '15px', minHeight: '280px' }">
        <nuxt></nuxt>

        <div class="idle-timer" style="opacity: 0">
          <v-idle
            @idle="onidle"
            @remind="onremind"
            :loop="true"
            :reminders="[10, 15]"
            :wait="5"
            :duration="600"
          />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>

export default {
  data() {
    return {
      notificationDrawer: false,
      notifications: [],
      visible: false,
      collapsed: false,
      logoutVisible: false,
      menu: [
        {
          title: "DASHBOARD",
          icon: "home",
          path: "/dashboard",
          subModules: []
        },
        {
              title: "COMPANY",
              icon: "bank",
              path: "/organizations/companies",
              subModules: []
            },
            {
              title: "SERVERS",
              icon: "cloud-server",
              path: "/system/servers",
              subModules: []
            }
            ,  

            {
              title: "AGENTS",
              icon: "team",
              path: "/system/agents",
              subModules: []
            },
            {
              title: "ALARMS",
              icon: "clock-circle",
              path: "/system/alarms",
              subModules:  [
                  {
                  title: "TEMPLATES",
                  icon: null,
                  path: "/system/alarms/templates",
                  subModules: []
                },
                 {
                  title: "ACTIVE",
                  icon: null,
                  path: "/system/alarms/active",
                  subModules: []
                }
                ]
            },
            {

              title: "POLICIES",
              icon: "form",
              path: "/system/policies",
              subModules: []
            },
            {
              title: "JOBS",
              icon: "reload",
              path: "/system/jobs",
              subModules: []
            }
          
            
      ]
    };
  },
  components: {
    Notification
  },
  methods: {
    onidle() {
      this.$notification["warning"]({
        message: "Idle Session Time out",
        description: "You have been logged out ! ",
        duration: 0
      });
      this.logout();
    },

    redirectToMenu({ key }) {
      this.$router.push(key);
    },
    afterVisibleChange(val) {
      // console.log("visible", val);
    },
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
      this.$confirm({
        title: "Confirm",
        content: "Are you sure?",
        okText: "Ok",
        cancelText: "Cancel"
      });
    },
    async logout() {
      this.logoutVisible = true;
      await this.$auth.logout();
      window.localStorage.clear(); // clear all localstorage values
      this.$router.push("/login");
    },
    showNotificationDrawer() {
      this.notificationDrawer = true;
    },
    afterVisibleChange(val) {
      // console.log("visible", val);
    },
    onClose() {
      this.notificationDrawer = false;
    },
    async getMenu() {
      let menu = await this.$store.getters["user/getMenuList"];
      this.menu = menu;
    },
    viewAll() {
      this.notificationDrawer = false;
      this.$router.push("/recall/all");
    },
    async markAllRead() {
      await this.$tables.markAllRead();
    },
    viewProfile() {
      this.notificationDrawer = false;
      this.$router.push("/profile");
    }
  },
  computed: {
    userName() {
      return this.$store.getters["user/getUserName"];
    },
    notificationCount() {
      return this.$store.getters["user/getUnreadNotificationCount"];
    },
    userRole() {
      return this.$store.getters["user/getUserRole"];
    }
  },
  async created() {
    // await this.$store.dispatch("user/getUserDetails");
    // await this.getMenu();
  }
};
</script>
<style lang="scss">
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
  color: #fff;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #005aaa;
}
.logo {
  background-color: #eef5f5;
  padding: 8px;
  text-align: center;
}
.logofont {
  color: #e63d00;
  line-height: 40px;
  font-size: 15px;
}
.ant-badge-count {
  background: #e63d00;
  box-shadow: none;
  p {
    color: #fff !important;
  }
}
.ant-layout-sider,
.ant-menu-submenu > .ant-menu {
  background: #fff;
  font-family: Roboto;
  // padding-top: 15px;
}
.ant-menu-dark,
.ant-menu-dark .ant-menu-sub {
  color: rgba(255, 255, 255, 0.65);
  background: #fff;
}
.ant-menu-item {
  i {
    color: #005aaa;
  }
}
.ant-menu.ant-menu-dark .ant-menu-item-selected,
.ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected {
  background-color: #005aaa;
}
.ant-layout-header {
  background-color: #005aaa;
  min-height: 50px;
}
.ant-layout {
  background-color: #f0f5f8;
}
.submenu {
  font-size: 12px;
}
.sidebar {
  .anticon {
    color: #005aaa;
  }
}
.ant-menu-vertical .ant-menu-item::after,
.ant-menu-vertical-left .ant-menu-item::after,
.ant-menu-vertical-right .ant-menu-item::after,
.ant-menu-inline .ant-menu-item::after {
  border-right: 4px solid #e63d00;
}
.action-sidebar {
  min-height: 100vh;
  background-color: #fff;
  padding: 20px 10px;
  text-align: center;
  padding-top: 25vh;
  ul {
    padding-left: 0;
    li {
      color: #fff;
      cursor: pointer;
      i {
        font-size: 20px;
        font-weight: 600;
      }

      p {
        color: #fff;
        font-size: 11px;
      }
      list-style-type: none;

      margin-bottom: 30px;
    }
  }
}
.ant-menu-inline,
.ant-menu-vertical,
.ant-menu-vertical-left {
  border-right: none;
}
.ant-layout-sider {
  border-right: 1px solid #e8e8e8;
}

.profile-name {
  font-size: 16px;
  margin-bottom: 5px;
  font-weight: 600;
}
.profile-section {
  border-bottom: 1px solid #005aaa;
  background-color: #f5f5f5;
  margin-bottom: 20px;
  padding: 15px;
  position: sticky;
  top: 0;
  z-index: 99;
}
.ant-drawer-close {
  z-index: 999;
}
.ant-drawer-body {
  padding: 0 !important;
}

.notification-menu {
  position: absolute;
  bottom: 0;
  background-color: aliceblue;
  width: 100%;
  margin-top: 20px;
  p {
    margin-bottom: 0;
    cursor: pointer;
  }
}
.menu-icon {
  font-size: 16px !important;
}
</style>
