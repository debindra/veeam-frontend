export default async function({ $auth, redirect, store }) {
  if (store.state.permission.permissions.length == 0) {
    console.log("Midleware permisssion is called");
    await store.dispatch("permission/getAllPermission");
    console.log("Middleware permission call is finished");
  }
}
