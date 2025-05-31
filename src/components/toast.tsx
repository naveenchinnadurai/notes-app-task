"use client"

import { X } from "lucide-react"
import React, { useEffect } from "react"

interface ToastProps {
    message: string
    onClose: () => void
    duration?: number
}

const Toast: React.FC<ToastProps> = ({ message, onClose, duration = 3000 }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, duration)
        return () => clearTimeout(timer)
    }, [duration, onClose])

    return (
        <div className="fixed bottom-5 right-5 z-50 bg-white border border-gray-300 shadow-lg rounded-lg px-4 py-3 flex items-center gap-3 fadeIn">
            <span className="text-sm font-medium text-gray-800">{message}</span>
            <button onClick={onClose} className="ml-auto text-gray-500 hover:text-red-500">
                <X size={18} />
            </button>
        </div>
    )
}

export default Toast
