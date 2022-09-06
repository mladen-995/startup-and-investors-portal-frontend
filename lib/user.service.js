import Cookies from "js-cookie";
import { useUser } from "../context/user-hook";
import { Role } from "../enums/role";

export function isInvestor() {
  return Cookies.get("user").roleId == Role.INVESTOR;
}

export function isStartup() {
  return Cookies.get("user").roleId == Role.STARTUP;
}
