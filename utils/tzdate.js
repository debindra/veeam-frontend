export function tztime(date) {
  const dateString = new Date(date).toString();
  const dateStringArr = dateString.split("GMT");
  return dateStringArr[0];
}
export function dateDifference(date) {
  const oldDateString = new Date(date).toString();
  const newDateString = new Date().toString(); //today
  return Math.floor(
    (Date.parse(newDateString) - Date.parse(oldDateString)) / 86400000
  );
}
