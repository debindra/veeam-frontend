import axios from "axios";

export default $axios => ({

  getAlarmTemplate() {
    return $axios.$get("v1/alarms");
  },

  activeResolve(data, activeAlarmUid){
      return $axios.$post(`v1/alarms/alarm-active/${activeAlarmUid}/resolve`, data)
  },

    activeAcknowledge(data, activeAlarmUid){
        return $axios.$post(`v1/alarms/alarm-active/${activeAlarmUid}/acknowledge`, data)
    },

    getAlarmActive() {
    return $axios.$get("v1/alarms/alarm-active");
  },

    deleteActive(activeAlarmUid) {
    return $axios.$delete(`/v1/alarms/alarm-active/${activeAlarmUid}`);
  },


});