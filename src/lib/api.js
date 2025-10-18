// Función simple para hacer peticiones a la API
import { API_CONFIG } from "./config";

export async function getData(endpoint) {
  const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  return response.json();
}
