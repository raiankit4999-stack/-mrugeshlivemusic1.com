"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DeleteButton({
  action,
  confirmMessage = "Delete this item? This can't be undone.",
}: {
  action: (formData: FormData) => void | Promise<void>;
  confirmMessage?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!window.confirm(confirmMessage)) e.preventDefault();
      }}
    >
      <Button type="submit" variant="destructive" size="sm">
        <Trash2 size={14} />
        Delete
      </Button>
    </form>
  );
}
