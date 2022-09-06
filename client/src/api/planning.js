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
export async function deleteProgram(id_program) {
  return await axios.delete(
    `http://localhost:7000/api/posts/delete_program/${id_program}`
  );
}

export async function updatePlanning(id_planning, updateData) {
  return await axios.put(
    `http://localhost:7000/api/posts/update_planning/${id_planning}`,
    updateData
  );
}

export async function getFullPlanning() {
  return await axios.get("http://localhost:7000/api/posts/full-planning");
}

export async function getPlanning() {
  return await axios.get("http://localhost:7000/api/posts/data");
}

export async function getOuvrage() {
  return await axios.get("http://localhost:7000/api/posts/liaison");
}
export async function getFormMaintenance() {
  return await axios.get(
    "http://localhost:7000/api/posts/maintenance_form_planning"
  );
}
export async function getFormEntretien() {
  return await axios.get(
    "http://localhost:7000/api/posts/entretien_form_planning"
  );
}
export async function getFormVisite() {
  return await axios.get(
    "http://localhost:7000/api/posts/visite_form_planning"
  );
}
