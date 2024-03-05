'use client'

import Link from "next/link"
import { deleteVideo } from "../lib/action"
import { useRouter } from 'next/navigation';
import DeleteDialog from "./delete-dialog";

export default function ProfileVideoBoard({ videoList }: any) {

    const rounter = useRouter()

    async function handleClick(id: string) {
        const result = await deleteVideo(id)
        if (!result.success) return alert(result.message)
        rounter.refresh()
    }

    return (
        <div className="w-full h-full shadow border rounded-lg p-4 flex flex-col gap-4">
            <div className="w-full text-2xl font-bold pb-5">Your Video</div>

            {videoList.length === 0 && <div className="w-full text-center">No Video</div>}

            {videoList.map((element: any) => {
                return (
                    <div className="w-full flex justify-between h-14 items-center" key={element.id}>
                        <Link className="w-full" href={'/video/' + element.id} key={element.id}>
                            <div className="flex gap-3 items-center w-full">
                                <img className='object-contain h-14 min-w-28 bg-gray-100' src={element.coverImgPath} alt='t' />
                                <div className="text-md">{element.title}</div>
                            </div>
                        </Link>
                       <DeleteDialog
                        handleDelete={handleClick}
                        id={element.id}
                       />
                    </div>

                )
            })}

        </div>
    )
}
