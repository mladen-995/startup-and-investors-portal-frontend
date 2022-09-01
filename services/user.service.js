const userKey = "user";

export function loginUser(user) {
  localStorage.setItem(userKey, user);
}

export function getUser() {
  return window.localStorage.getItem(userKey);
}

export function logoutUser() {
  localStorage.removeItem(userKey);
}
