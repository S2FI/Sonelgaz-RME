import axios from "axios";
axios.defaults.withCredentials = true; // check cookie and verify token in backend
export async function createPlanning(planningData) {
  return await axios.post("http://localhost:7000/api/posts/plan", planningData);
}

export async function deletePlanning(id_planning) {
  return await axios.delete(
    `http://localhost:7000/api/posts/delete_planning/${id_planning}`
  );
}

export async function getPlanning() {
  return await axios.get("http://localhost:7000/api/posts/data");
}
