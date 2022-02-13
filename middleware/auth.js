export default async function({ $auth, redirect, store }) {
  console.log("AUthe Order Test");
  let user = $auth.user;
  if (user && user.admin) {
    // let the user in
  } else {
    store.dispatch("snackbar/setSnackbar", {
      color: "error",
      text: "You must be an admin to view that page."
    });
    redirect("/dashboard");
  }
}
