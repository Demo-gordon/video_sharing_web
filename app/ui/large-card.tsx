import Link from "next/link"

export default function LargeCard({video}: any) {

  return (
    <div className='max-w-xl flex h-fit flex-col p-5 border rounded-xl w-full shadow-sm'>
      <Link className="flex flex-col" href={'/video/' + video.id} key={video.id}>
      <img className='object-contain w-[576px] h-[324px] bg-gray-100' src={video.coverImgPath} alt='' />
      <div className='my-2'>
        <div className='text-xl w-full truncate font-bold'>{video.title}</div>
        <div className='text-md w-full truncate text-slate-600'>{video.author.username}</div>
      </div>
      </Link>
    </div>
  )
}