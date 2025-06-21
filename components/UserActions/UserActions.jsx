"use client"

import { Button } from "@/components/ui/button"
import { Edit, UserX, Trash2 } from "lucide-react"
import { useTransition } from "react"
import { deactiveUser } from "@/controllers/DeactivateUser"
import { removeUser } from "@/controllers/RemoveUser"

export function UserActions({ user, onEdit, onActionComplete }) {
  const [isPending, startTransition] = useTransition()

  const handleDeactivate = () => {
    startTransition(async () => {
      await deactiveUser(user.id)
      if (onActionComplete) onActionComplete()
    })
  }

  const handleDelete = () => {
    startTransition(async () => {
      await removeUser(user.id)
      if (onActionComplete) onActionComplete()
    })
  }

  return (
    <div className="flex justify-end space-x-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onEdit(user)}
        disabled={isPending}
        aria-label="Edit User"
      >
        <Edit className="h-4 w-4" />
      </Button>
      {user.status === "active" && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDeactivate}
          disabled={isPending}
          aria-label="Deactivate User"
        >
          <UserX className="h-4 w-4" />
        </Button>
      )}
      <Button
        variant="ghost"
        size="icon"
        onClick={handleDelete}
        disabled={isPending}
        aria-label="Delete User"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}