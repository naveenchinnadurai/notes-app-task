"use client"

import { Dialog } from "@/components/dialog"
import Toast from "@/components/toast"
import { User, Note } from "@/lib/types"
import { usePathname } from "next/navigation"
import React, { createContext, useContext, useEffect, useState } from "react"

interface AppContextProps {
    currentUser: Omit<User, "password"> | null
    login: (email: string, password: string) => boolean
    register: (name: string, email: string, password: string) => boolean
    logout: () => void
    notes: Note[]
    createNote: (title: string, content: string) => void
    updateNote: (id: string, title: string, content: string) => void
    deleteNote: (id: string) => void;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    showToast: (message: string) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined)

let userIdCounter = 1
let noteIdCounter = 1

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname()
    const [users, setUsers] = useState<User[]>(
        [
            {
                id: "1",
                name: "Naveen",
                email: "naveen@gmail.com",
                password: "1234",
            },
            {
                id: "2",
                name: "Bill Gates",
                email: "billgates@gmail.com",
                password: "1234",
            },
        ]
    )
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const [notes, setNotes] = useState<Note[]>([])

    const [isLoading, setIsLoading] = useState(true);

    const [toastMessage, setToastMessage] = useState("")
    const [isToastOpen, setToastOpen] = useState(false)

    const showToast = (message: string) => {
        setToastMessage(message)
        setToastOpen(true);
    }

    const register = (name: string, email: string, password: string): boolean => {
        if (users.some(u => u.email === email)) return false
        const newUser: User = {
            id: String(userIdCounter++),
            name,
            email,
            password,
        }
        setUsers(prev => [...prev, newUser])
        setCurrentUser(newUser)
        return true
    }

    const login = (email: string, password: string): boolean => {
        const user = users.find(u => u.email === email && u.password === password)
        if (user) {
            setCurrentUser(user)
            return true
        }
        return false
    }

    const logout = () => setCurrentUser(null)

    const createNote = (title: string, content: string) => {
        if (!currentUser) return
        const newNote: Note = {
            id: String(noteIdCounter++),
            title,
            content,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            userId: currentUser.id,
        }
        setNotes(prev => [...prev, newNote])
        showToast("Note created successfully!")
    }

    const updateNote = (id: string, title: string, content: string) => {
        setNotes(prev =>
            prev.map(note =>
                note.id === id ? { ...note, title, content, updatedAt: new Date().toISOString() } : note
            )
        )
        showToast("Note updated successfully!")
    }

    const deleteNote = (id: string) => {
        setNotes(prev => prev.filter(note => note.id !== id));
        showToast("Note deleted successfully!")
    }

    useEffect(() => {
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }, 200)
    }, [pathname])

    return (
        <AppContext.Provider
            value={{
                currentUser,
                login,
                register,
                logout,
                notes: notes.filter(note => note.userId === currentUser?.id),
                createNote,
                updateNote,
                deleteNote,
                isLoading,
                setIsLoading,
                showToast
            }}
        >
            {
                isLoading ? (
                    <div className="absolute h-screen w-screen flex items-center justify-center bg-black/30">
                        <div className="loader"></div>
                    </div>
                ) : null
            }
            {children}
            {
                isToastOpen && (
                    <Toast
                        message={toastMessage}
                        onClose={() => setToastOpen(false)}
                    />
                )
            }
        </AppContext.Provider>
    )
}

export const useApp = () => {
    const context = useContext(AppContext)
    if (!context) throw new Error("useApp must be used within an AppProvider")
    return context
}
