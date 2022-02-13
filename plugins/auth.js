export default function({ $auth, $gates }) {
  if (!$auth.loggedIn) {
    return;
  }
}
