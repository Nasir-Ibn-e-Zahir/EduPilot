// components/DeleteDialog.tsx
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { useState } from "react";

type DeleteDialogProps = {
  submissionId: string;
  onDelete: (id: string) => void;
};

export function DeleteDialog({ submissionId, onDelete }: DeleteDialogProps) {
    const [open,setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger asChild>
         <TrashIcon onClick={()=>setOpen(true)}  className="w-4 h-4 ml-6 "  /> 
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
        </DialogHeader>
        <p>This action cannot be undone. It will permanently delete this submission.</p>
        <DialogFooter>
          <Button variant='secondary' onClick={()=> setOpen(false) } > Cancel </Button>
          <Button variant="destructive" onClick={() => {onDelete(submissionId) 
            setOpen(false)
          }}  >Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
