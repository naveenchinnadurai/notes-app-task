import { useApp } from "@/context/appContext"
import { Note } from "@/lib/types"
import { Trash2, Pencil } from "lucide-react"

interface NoteCardProps {
  note: Note
  onEdit: (note: Note) => void,
}

export const NoteCard = ({ note, onEdit }: NoteCardProps) => {
  const { deleteNote } = useApp()

  return (
    <div className="bg-white shadow-md rounded-lg p-4 relative min-h-[150px] h-fit overflow-wrap flex flex-col justify-between">
      <h3 className="text-lg font-bold text-indigo-700">{note.title}</h3>
      <p className="text-gray-700 text-wrap w-full max-h-[100px] overflow-auto">{note.content}</p>

      <div className="absolute top-3 right-3 flex items-center gap-2">
        <button
          onClick={() => onEdit(note)}
          className="text-gray-400 hover:text-blue-500 hover:bg-blue-900/20 px-2 py-1.5 rounded-md transition"
          title="Edit"
        >
          <Pencil size={18} />
        </button>
        <button
          onClick={() => deleteNote(note.id)}
          className="text-gray-400 hover:text-red-500 hover:bg-red-300/70 px-2 py-1.5 rounded-md transition"
          title="Delete"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  )
}
