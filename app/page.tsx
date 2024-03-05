import LargeCard from './ui/large-card';
import { getAllVideo, searchVideo } from './lib/action'

export default async function Home({searchParams}: {searchParams:String}) {
  
  const videoList = searchParams.search? await searchVideo(searchParams.search)  : await getAllVideo()

  return (
    <div className='h-full w-full flex justify-center'>
      
      {videoList.length === 0 && <div className="w-full text-center">No Video</div>}
      <div className="grid grid-cols-1 auto-rows-min gap-4 w-fit px-3 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2">
        {
          videoList.map((element) => {
            return (
                <LargeCard
                    video = {element}
                    key={element.id}
                />
            )
          })
        }
      </div>
      </div>
  );
}
