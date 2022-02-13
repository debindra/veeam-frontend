import axios from "axios";

export default $axios => ({
  book(data) {
    return $axios.$post("v1/registrations/booking", data);
  },
  getCardDetails(data) {
    return $axios.$get("v1/registrations/single/" + data);
  }
});
