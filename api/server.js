import axios from "axios";

export default $axios => ({

  getServer() {
    return $axios.$get("v1/backupServers");
  },

 getServerRepository() {
    return $axios.$get("v1/backupServers/repositories");
  },

 getServerProxy() {
    return $axios.$get("v1/backupServers/proxies");
  },


});