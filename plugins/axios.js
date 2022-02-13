import { Message } from "ant-design-vue";
export default function(context) {
  context.$axios.onRequest(config => {
    console.log("Making request to " + config.url);
  });

  context.$axios.onResponse(response => {
    //TODO: Quick Fix. this should not be here .
    if (response.config.url === "/v1/users/me") {
      let roles = response.data.data.roles[0];
      let permissions = roles.permissions.map(item => item.slug);

      context.$gates.setRoles([roles.title]);
      context.$gates.setPermissions(permissions);
    }
  });

  context.$axios.onError(error => {
    // Message.error("This is an error");
    const code = parseInt(error.response && error.response.status);
    if (code === 400) {
      console.log("from interceptor,error occured");
    } else if (code == 422) {
      console.log("from interceprotp", error.response.data.errors);
    } else if (code > 500) {
      Message.warning("Something went wrong");
    }
  });
}
