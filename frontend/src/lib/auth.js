import { getCookie } from "./cookie";

export const isUserLoggedIn = () => {
  return getCookie("token") ? true : false;
};
