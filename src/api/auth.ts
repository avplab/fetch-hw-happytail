import { fetchApiPost } from "./http";

export function login(credentials: { name: string, email: string }) {
  return fetchApiPost('/auth/login', credentials)
}

export function logout() {
  return fetchApiPost('/auth/logout')
}