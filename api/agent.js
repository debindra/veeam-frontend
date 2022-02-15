import axios from "axios";

export default $axios => ({

  getAgent() {
    return $axios.$get("v1/agents");
  },

//    getPolicy(policyUid) {
//     return $axios.$delete(`/v1/backupPolicies/${policyUid}`);
//   },


});