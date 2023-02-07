import { CommonConstant } from "../constant/common-constants.js";

export const epochToPrettyDateTime = (epoch) => {
  let options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
    timeZone: "Asia/Dhaka",
  };

  // @ts-ignore
  return new Intl.DateTimeFormat("en-US", options).format(epoch);
};

export function epochToHoraTime(epoch) {
  let milliSens = epoch * CommonConstant.SECS_TO_SENS_CONVERSION_CONSTANT;

  // console.log(`${epoch} => ${milliSens}`);

  let sens = milliSens / 1000;

  let sen = Math.floor(sens) % 100;
  let mei = Math.floor(sens / 100) % 10;
  let hour = Math.floor(sens / 100 / 10);
  return [hour, mei, sen];
}

export function traditionalSecondsToHoraTime(seconds) {
  let sens = seconds * CommonConstant.SECS_TO_SENS_CONVERSION_CONSTANT;
  let sen = Math.floor(sens) % 100;
  let mei = Math.floor(sens / 100) % 10;
  let hour = Math.floor(sens / 100 / 10);
  return [hour, mei, sen];
}
