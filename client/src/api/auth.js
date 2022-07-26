import axios from "axios";
axios.defaults.withCredentials = true; // check cookie and verify token in backend

export async function onRegistration(registrationData) {
  return await axios.post(
    "http://localhost:7000/api/posts/register",
    registrationData
  );
}
export async function getUsers() {
  return await axios.get("http://localhost:7000/api/posts/users-get");
}

export async function onLogin(loginData) {
  return await axios.post("http://localhost:7000/api/posts/login", loginData);
}

export async function onLogout() {
  return await axios.get("http://localhost:7000/api/posts/logout");
}
export async function onDelete(id) {
  return await axios.delete(`http://localhost:7000/api/posts/delete/${id}`);
}
export async function onUpdate(id, updateData) {
  return await axios.put(
    `http://localhost:7000/api/posts/update/${id}`,
    updateData
  );
}

// export async function getIP() {
//   return await axios.get("https://geolocation-db.com/json/");
// }
export async function getIP() {
  return await fetch("https://geolocation-db.com/json/").then((response) =>
    response.json()
  );
}
