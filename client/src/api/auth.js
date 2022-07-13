import axios from "axios";
axios.defaults.withCredentials = true; // check cookie and verify token in backend

export async function onRegistration(registrationData) {
  return await axios.post(
    "http://localhost:8000/api/register",
    registrationData
  );
}
export async function getRoles() {
  return await axios.get("http://localhost:8000/api/get-roles");
}

export async function onLogin(loginData) {
  return await axios.post("http://localhost:8000/api/login", loginData);
}

export async function onLogout() {
  return await axios.get("http://localhost:8000/api/logout");
}

// export async function getIP() {
//   return await axios.get("https://geolocation-db.com/json/");
// }
export async function getIP() {
  return await fetch("https://geolocation-db.com/json/").then((response) =>
    response.json()
  );
}
