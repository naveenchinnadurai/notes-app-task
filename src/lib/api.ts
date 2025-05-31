import axios from "axios"
import { User, Note } from "./types"

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
})

// Auth API
export const authAPI = {
  login: async (email: string, password: string): Promise<User> => {
    const response = await api.post("/auth/login", { email, password })
    return response.data.user
  },

  register: async (name: string, email: string, password: string): Promise<User> => {
    const response = await api.post("/auth/register", { name, email, password })
    return response.data.user
  },
}

// Notes API
export const notesAPI = {
  getNotes: async (): Promise<Note[]> => {
    const response = await api.get("/notes")
    return response.data.notes
  },

  createNote: async (title: string, content: string): Promise<Note> => {
    const response = await api.post("/notes", { title, content })
    return response.data.note
  },

  updateNote: async (id: string, title: string, content: string): Promise<Note> => {
    const response = await api.put(`/notes/${id}`, { title, content })
    return response.data.note
  },

  deleteNote: async (id: string): Promise<void> => {
    await api.delete(`/notes/${id}`)
  },
}
