export const state = () => ({
  userDetails: {}
});

export const mutations = {
  setUserDetails(state, payload) {
    state.userDetails = payload;
  },
  setUnreadNotificationCount(state, payload) {
    state.userDetails.notificationCount = payload;
  }
};

export const actions = {
  async getUserDetails({ state, commit }) {
    let data = await this.$userAuth.userDetails();
    commit("setUserDetails", data.data.data);
  },
  async decrementNotification({ state, commit }) {
    let currentNotificationCount = state.userDetails.notificationCount;
    commit("setUnreadNotificationCount", currentNotificationCount - 1);
  }
};

export const getters = {
  getMenuList: state => {
    return state.userDetails.modules;
  },
  getUserName: state => {
    return state.userDetails.firstName;
  },
  // getNotificationCount: state => {
  //   return state.userDetails.notificationCount;
  // },
  getUserRole: state => {
    return state.userDetails.roles;
  },
  getAllUserDetails: state => {
    return state.userDetails;
  },
  getUnreadNotificationCount: state => {
    return state.userDetails.notificationCount;
  }
};
