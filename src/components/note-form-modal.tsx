"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { Note } from "@/lib/types"

type Props = {
    isOpen: boolean
    onClose: () => void
    onSubmit: (title: string, content: string) => void
    note: Note | null
}

export const NoteFormModal = ({ isOpen, onClose, note, onSubmit }: Props) => {
    const [formData, setFormData] = useState({ title: "", content: "" })

    useEffect(() => {
        if (note) {
            setFormData({
                title: note.title || "",
                content: note.content || "",
            })
        } else {
            setFormData({ title: "", content: "" })
        }
    }, [note, isOpen])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(formData.title, formData.content)
        setFormData({ title: "", content: "" })
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 bg-black/30 flex justify-center items-center">
            <div className="bg-white w-full max-w-md mx-auto rounded-lg shadow-lg p-6 relative ">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
                >
                    <X size={20} />
                </button>

                <h2 className="text-xl font-bold text-indigo-700 mb-4">
                    {note ? "Edit Note" : "New Note"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4 text-black">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Title
                        </label>
                        <input
                            name="title"
                            id="title"
                            type="text"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Note title"
                        />
                    </div>

                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                            Content
                        </label>
                        <textarea
                            name="content"
                            id="content"
                            rows={4}
                            value={formData.content}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                            placeholder="Write your note here..."
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700 transition"
                    >
                        {note ? "Update Note" : "Add Note"}
                    </button>
                </form>
            </div>
        </div>
    )
}
