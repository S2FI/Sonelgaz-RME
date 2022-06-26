import axios from 'axios'
axios.defaults.withCredentials = true // check cookie and verify token in backend

export async function onRegistration(registrationData) {
  return await axios.post(
    'http://localhost:8000/api/register',
    registrationData
  )
}

export async function onLogin(loginData) {
  return await axios.post('http://localhost:8000/api/login', loginData)
}

export async function onLogout() {
  return await axios.get('http://localhost:8000/api/logout')
}

