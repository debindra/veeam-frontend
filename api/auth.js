import { async } from "q";

export default $axios => ({
  async addUser(params) {
    return await $axios.post("/v1/users/add", params);
  },

  async getAllUsers(query) {
    return await $axios.post("/v1/users/all", query);
  },

  async getUser(id) {
    return await $axios.get(`v1/users/${id}`);
  },
 
  async getUserById(id) {
    return await $axios.get(`/v1/users/${id}`);
  },


  async forgotPassword(email) {
    return $axios.post(`v1/auth/forgot-password?email=${email}`);
  },
  async resetForgotPassword(form) {
    return $axios.post(`v1/auth/reset-forgot-password`, form);
  },
  async changePassword(form) {
    return $axios.post(`v1/auth/change-password`, form);
  }
});
