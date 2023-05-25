import Cookies from "js-cookie";

export function getCookie(form) {
  const token = Cookies.get("access_token");
  if (!token) {
    console.log("no token detected");
    return (window.location.href = "./logout");
  }
  const csrftoken = Cookies.get("csrftoken");
  if (!csrftoken) {
    return (window.location.href = "./logout");
  }
  const headers = {
    "Accept": "application/json",
    "Content-Type": 'application/json',
    "Authorization": `Bearer ${token}`,
    "X-CSRFToken": csrftoken,
  };

  return headers;
}
