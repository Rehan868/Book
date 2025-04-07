"use client"

import type React from "react"

import { useState, useEffect } from "react"

type ToastProps = {
  id?: string
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: "default" | "destructive"
}

const TOAST_TIMEOUT = 5000

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        setToasts((toasts) => toasts.slice(1))
      }, TOAST_TIMEOUT)

      return () => clearTimeout(timer)
    }
  }, [toasts])

  function toast(props: ToastProps) {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast = { ...props, id }

    setToasts((toasts) => [...toasts, newToast])

    return id
  }

  function dismiss(toastId?: string) {
    setToasts((toasts) => (toastId ? toasts.filter((toast) => toast.id !== toastId) : toasts.slice(1)))
  }

  return {
    toast,
    dismiss,
    toasts,
  }
}

