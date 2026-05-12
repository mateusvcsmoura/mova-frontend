import { apiRequest } from "./apiClient";
import { getAuthSession } from "./authSession";

/**
 * Busca veículos públicos com filtros opcionais (sem autenticação obrigatória).
 * Endpoint: GET /veiculo/search
 *
 * @param {Object} filters
 * @param {string} [filters.marca]
 * @param {string} [filters.modelo]
 * @param {number} [filters.ano]
 * @param {string} [filters.cambio]       - "Manual" | "Automático"
 * @param {number} [filters.capacidade]
 * @param {boolean} [filters.eletrico]
 * @param {boolean} [filters.adaptado]
 * @returns {Promise<Array>}
 */
export async function searchVeiculos(filters = {}) {
  const params = new URLSearchParams();

  if (filters.marca)      params.set("marca", filters.marca);
  if (filters.modelo)     params.set("modelo", filters.modelo);
  if (filters.ano)        params.set("ano", String(filters.ano));
  if (filters.cambio)     params.set("cambio", filters.cambio);
  if (filters.capacidade) params.set("capacidade", String(filters.capacidade));
  if (filters.eletrico !== undefined) params.set("eletrico", String(filters.eletrico));
  if (filters.adaptado  !== undefined) params.set("adaptado",  String(filters.adaptado));

  const query = params.toString() ? `?${params.toString()}` : "";
  const data = await apiRequest(`/veiculo/search${query}`);
  return data.result ?? [];
}

/**
 * Lista veículos autenticados (com token do locatário/admin).
 * Endpoint: GET /veiculo/
 * Os mesmos filtros de searchVeiculos se aplicam.
 */
export async function listVeiculos(filters = {}) {
  const session = getAuthSession();
  const authToken = session?.token;

  const params = new URLSearchParams();
  if (filters.marca)      params.set("marca", filters.marca);
  if (filters.modelo)     params.set("modelo", filters.modelo);
  if (filters.ano)        params.set("ano", String(filters.ano));
  if (filters.cambio)     params.set("cambio", filters.cambio);
  if (filters.capacidade) params.set("capacidade", String(filters.capacidade));
  if (filters.eletrico !== undefined) params.set("eletrico", String(filters.eletrico));
  if (filters.adaptado  !== undefined) params.set("adaptado",  String(filters.adaptado));

  const query = params.toString() ? `?${params.toString()}` : "";
  const data = await apiRequest(`/veiculo${query}`, { authToken });
  return data.result ?? [];
}