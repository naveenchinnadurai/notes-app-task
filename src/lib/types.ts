export interface User {
    id: string
    email: string
    name: string
    password: string 
}

export interface Note {
    id: string
    title: string
    content: string
    createdAt: string
    updatedAt: string
    userId: string
}