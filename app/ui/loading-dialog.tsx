'use client'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import HourglassTopIcon from '@mui/icons-material/HourglassTop';

export default function LoadingDialog({open}: {open:boolean}) {

    return (
      <AlertDialog open={open}>
        <AlertDialogTrigger asChild>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Uploading...</AlertDialogTitle>
            <AlertDialogDescription>
            <HourglassTopIcon/>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }