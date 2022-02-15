import axios from "axios";

export default $axios => ({

  getCompany() {
    return $axios.$get("v1/organizations/companies");
  },

 addCompany(data) {
    return $axios.$post("v1/organizations/companies", data);
  },

 updateCompany(companyUid, data) {
    return $axios.$put(`v1/organizations/companies/${companyUid}`, data);
  },


 deleteCompany(companyUid) {
    return $axios.$delete(`v1/organizations/companies/${companyUid}`);
  },


});