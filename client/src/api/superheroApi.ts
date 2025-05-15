import axios from "axios";
import type { Superhero } from "../types/Superhero";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getSuperheroes = (page = 1) =>
  api.get<{ total: number; page: number; data: Superhero[] }>(
    `/api/superheroes?page=${page}`
  );

export const getSuperheroById = (id: string) =>
  api.get<Superhero>(`/api/superheroes/${id}`);

export const createSuperhero = (formData: FormData) =>
  api.post<Superhero>("/api/superheroes", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updateSuperhero = (id: string, formData: FormData) =>
  api.put(`/api/superheroes/${id}`, formData);

export const deleteSuperhero = async (id: string) => 
  api.delete(`/api/superheroes/${id}`);