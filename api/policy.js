import axios from "axios";

export default $axios => ({

  getPolicy() {
    return $axios.$get("v1/backupPolicies");
  },

   deletePolicy(policyUid) {
    return $axios.$delete(`/v1/backupPolicies/${policyUid}`);
  },


});