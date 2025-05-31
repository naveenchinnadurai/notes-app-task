"use client"

import { X } from "lucide-react"

interface ConfirmDialogProps {
    isOpen: boolean
    title?: string
    message: string
    onConfirm: () => void
    onCancel: () => void
}

export const Dialog = ({
    isOpen,
    title = "Are you sure?",
    message,
    onConfirm,
    onCancel,
}: ConfirmDialogProps) => {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6 relative">
                <button
                    onClick={onCancel}
                    className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
                >
                    <X size={20} />
                </button>

                <h2 className="text-lg font-semibold text-gray-800 mb-2">{title}</h2>
                <p className="text-sm text-gray-600 mb-6">{message}</p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            onConfirm()
                            onCancel()
                        }}
                        className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    )
}
