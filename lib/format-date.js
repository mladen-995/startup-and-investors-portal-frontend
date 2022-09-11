import moment from "moment";

export function formatDateTime(dateTime) {
  return moment(dateTime).format("DD/MM/YYYY HH:mm:ss");
}
