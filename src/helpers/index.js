import { DateTime } from "luxon";

export function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function getEstimatedDelivery(start, end) {
  const minEstDate = DateTime.now().plus({ days: start }).toFormat("dd MMMM");
  const maxEstDate = DateTime.now().plus({ days: end }).toFormat("dd MMMM");

  return `${minEstDate} - ${maxEstDate}`;
}
