import { getAuthUser, getUserUploadedVideo } from "../lib/action"
import UploadBoard from "../ui/upload-board"
import ChangePwBoard from "../ui/change-pw-board"
import ProfileVideoBoard from "../ui/profile-video-board"


export default async function Page() {

  const userVideoList = await getUserUploadedVideo()
  const user = await getAuthUser()

  return (
    <div className='flex flex-col gap-1 items-center w-full pb-2'>

      <div className="w-full max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-3 gap-5">

        <div className="flex flex-col gap-5">

          <div className="w-full shadow border rounded-lg block lg:hidden">
            <div className="w=full text-center py-5 text-2xl font-bold">{`Welcome! ${user?.username}`}</div>
          </div>

          <UploadBoard />
          <ChangePwBoard />

        </div>

        <div className="md:col-span-2 flex flex-col gap-5">

          <div className="w-full shadow border rounded-lg hidden lg:block ">
            <div className="w=full text-center py-5 text-2xl font-bold">{`Welcome! ${user?.username}`}</div>
          </div>

          <ProfileVideoBoard videoList={userVideoList}/>

        </div>

      </div>
    </div>
  )
}