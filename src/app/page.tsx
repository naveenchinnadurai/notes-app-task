"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useApp } from "@/context/appContext"
import { NoteFormModal } from "@/components/note-form-modal"
import { NoteCard } from "@/components/note-card"
import { LogOut, Plus } from "lucide-react"
import { Note } from "@/lib/types"
import { Dialog } from "@/components/dialog"

export default function HomePage() {
  const { currentUser, logout, notes, createNote, updateNote } = useApp()
  const router = useRouter()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingNote, setEditingNote] = useState<Note | null>(null)

  useEffect(() => {
    if (!currentUser) {
      router.push("/signin")
    }
  }, [currentUser, router])

  const handleLogout = () => {
    logout()
    router.push("/signin")
  }

  const handleNoteSubmit = (title: string, content: string) => {
    if (editingNote) {
      updateNote(editingNote.id, title, content)
    } else {
      createNote(title, content)
    }
    setIsModalOpen(false)
    setEditingNote(null)
  }

  const handleEdit = (note: Note) => {
    setEditingNote(note)
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100">
      <button
        onClick={() => {
          setEditingNote(null)
          setIsModalOpen(true)
        }}
        className="absolute bottom-10 right-10 flex gap-2 items-center bg-indigo-600 text-white p-4 rounded-full hover:bg-indigo-700 transition font-medium"
      >
        <Plus size={20} />
      </button>
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-700">NotesApp</h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600 font-medium">{currentUser?.name}</span>
          <button
            onClick={handleLogout}
            className="text-indigo-600 hover:bg-indigo-300/40 px-2.5 py-2 rounded-md cursor-pointer"
          >
            <LogOut />
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-2 py-10">
        <div className="flex items-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">My Notes</h2>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-5 h-[400px]">
          {
            notes.length === 0 ? (
              <div className="col-span-3 text-center flex flex-col items-center text-gray-600 py-20">
                <p className="text-5xl mb-3">📝</p>
                <p className="text-xl font-semibold mb-2 text-black"> No notes yet</p>
                <p className="text-md">Add your first note to get started</p>
                <button
                  onClick={() => {
                    setEditingNote(null)
                    setIsModalOpen(true)
                  }}
                  className="flex items-center mt-3 gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition font-medium"
                >
                  <Plus className="text-md" size={20} />
                  Create Your First Note
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                  notes.map((note) => (
                    <NoteCard key={note.id} note={note} onEdit={() => handleEdit(note)} />
                  ))
                }
              </div>
            )
          }
        </div>

        <NoteFormModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setEditingNote(null)
          }}
          onSubmit={handleNoteSubmit}
          note={editingNote}
        />

      </main>
    </div>
  )
}
