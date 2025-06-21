import Cookies from "js-cookie";

export function setUserSession(user: any) {
  Cookies.set("user", JSON.stringify(user), { expires: 1 });
}

export function getUserSession() {
  const user = Cookies.get("user");
  return user ? JSON.parse(user) : null;
}

export function clearUserSession() {
  Cookies.remove("user");
}
