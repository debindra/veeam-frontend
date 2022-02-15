import axios from "axios";

export default $axios => ({
//   createVaccine(data) {
//     return $axios.$post("v1/vaccines", data);
//   },
//   show(id) {
//     return $axios.$get(`/v1/vaccines/single/${id}`);
//   },
//   update(data, id) {
//     return $axios.$put(`/v1/vaccines/${id}`, data);
//   },
//   delete(id) {
//     return $axios.$delete(`/v1/vaccines/${id}`);
//   },
//   vaccineList() {
//     return $axios.$get("v1/vaccines/active");
//   },
//   vaccine_center_list() {
//     return $axios.$get("v1/vaccine-centers/active");
//   },
//   getCountries() {
//     return $axios.$get("v1/registrations/countries");
//   },
//   register(data) {
//     return $axios.$post("v1/registrations", data);
//   },
//   missingForm(data, id) {
//     return $axios.$post(`v1/registrations/officialforms/${id}`, data);
//   },
//   getCardDetails(id) {
//     return $axios.$get(`v1/card-issue-histories/${id}`);
//   },
//   getVaccineCenters() {
//     return $axios.$get("v1/vaccine-centers");
//   },
  getAlarmTemplate() {
    return $axios.$get("v1/alarms");
  },

    getAlarmActive() {
    return $axios.$get("v1/alarms/alarm-active");
  }


});