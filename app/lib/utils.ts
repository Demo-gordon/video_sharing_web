import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { writeFile } from "fs/promises"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// save video and img
export async function saveFile(file: any, destPath: string){
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  await writeFile(destPath, buffer)
}

export function serverResponse(success: boolean, message: string){
  return {success: success, message: message}
}


export const jwtSecret = 'secret'





