"use server"
import SmallCard from "@/app/ui/small-card"
import { getAllComment, getAllVideo, getAuthUser, getVideo } from "@/app/lib/action";
import CommentBoard from "@/app/ui/comment-board";

export default async function VideoPage({ params }: { params: { id: string } }) {

    const video = await getVideo(params.id)
    const videoList = await getAllVideo()
    const commentList = await getAllComment(params.id)
    const user = await getAuthUser()

    return (
        <div className="flex justify-center w-full px-2">

            <div className="flex flex-col gap-4 h-fit max-w-[1280px] w-full lg:flex-row">

                <div className='flex flex-col lg:min-w-[640px] w-full gap-4'>


                    <div className="w-full p-4 rounded-xl border shadow-sm">
                        {/* video */}
                        <div className='w-full h-fit relative'>
                            <video className='relative aspect-video rounded-xl' width='100%' height='auto' controls preload="none">
                                <source src={video?.videoPath} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>

                        <div className='w-full'>
                            <div className='text-xl font-bold leading-6 line-clamp-2 py-3'>{video?.title}</div>
                            <div className='text-md text-slate-600'>{video?.author?.username}</div>
                        </div>

                    </div>
                    
                    <div className='hidden lg:flex '>
                    <CommentBoard
                        commentList={commentList}
                        videoId={video?.id}
                        user ={user}
                    />
                    </div>

                </div>
             
                {/* video card */}
                <div className='flex flex-col lg:max-w-96 w-full gap-2 min-w-0'>
                    {videoList.map((element) => {
                        return (
                                <SmallCard
                                    video={element}
                                    key ={element.id}
                                />
                        )
                    })}
                </div>
                 
                <div className='flex lg:hidden '>
                    <CommentBoard
                        commentList={commentList}
                        videoId={video?.id}
                        user ={user}
                    />

                </div>
            </div>
        </div>

    )
}