import Link from 'next/link';

export default function SmallCard({video}:any){
    return (
      <Link href={'/video/' +video.id} key={video.id}>  
      <div className="flex h-16 shadow-sm border">
      <img className='object-contain h-16 min-w-28 bg-gray-100' src={video.coverImgPath} alt='t' />

      <div className='my-2 min-w-0 px-1'>
          <div className='text-md truncate font-bold'>{video.title}</div>
          <div className='text-sm truncate text-slate-600'>{video.author.username}</div>
      </div>
    </div>
    </Link>
    )
}