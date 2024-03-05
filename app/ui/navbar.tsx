'use client'
import Link from 'next/link'
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useImmer } from 'use-immer';
import { clsx } from 'clsx';
import { usePathname, useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from '../lib/action';

export default function Navbar() {

    const [enable, setEnable] = useImmer(false)
    const [text, setText] = useImmer('')
    const router = useRouter()
    const pathName = usePathname()
    const title = 'Video Share'
    const hiddenUrlList = [
        '/login',
        '/register'
    ]
    
    function handNavBtnHidden(){
        let trigger = false
        hiddenUrlList.forEach(element => {
            if(element === pathName){
                trigger = true
            }
        })
        return trigger
    }
    
    function handleSearchOnOff() {
        setEnable(!enable)
    }

    function handTextChange(e: any) {
        setText(e.target.value)
    }

    function handleSearch() {
        if (text) {
            router.push(`/?search=${text}`)
        }
        else {
            router.push('/')
        }
    }

    return (
        <div className='shadow-sm min-h-14 w-full text-black px-2 flex items-center fixed z-50 border-b-1 bg-white'>
            {/* login page */}
            <div className={clsx('w-full flex justify-center items-center', !handNavBtnHidden() && 'hidden')}>
                <Link className='flex items-center gap-2' href='/'>
                    <OndemandVideoIcon fontSize="large" />
                    <div className='font-bold text-lg text-nowrap'>{title}</div>
                </Link>
            </div>

            {/* home page */}
            <div className={clsx('w-full', handNavBtnHidden() && 'hidden')}>

                {/*desktop search bar */}
                <div className='justify-between gap-3 items-center w-full hidden sm:flex'>

                    <Link className='flex items-center gap-2' href='/'>
                        <OndemandVideoIcon fontSize="large" />
                        <div className='font-bold text-lg text-nowrap'>{title}</div>
                    </Link>

                    <div className='gap-2 items-center max-w-lg w-full flex'>
                        <Input className='text-black w-full h-8' type='text' placeholder='Search' onChange={e => handTextChange(e)}></Input>
                        <Button className='h-8' onClick={handleSearch}>
                            <SearchIcon fontSize="small" />
                        </Button>

                    </div>

                    <div className='flex gap-2'>
                    <Link className='flex items-center' href='/profile'>
                        <Button className='h-8'>
                            <AccountBoxIcon fontSize="small" />
                        </Button>
                    </Link>

                    <Button className='h-8' onClick={e => signOut()}>
                        <LogoutIcon fontSize="small" />
                    </Button>

                    </div>
                </div>

                {/*closed  mobile search bar */}
                <div className={clsx('gap-3 items-center w-full flex justify-between sm:hidden', enable && 'hidden')}>
                    <Link className='flex items-center gap-2' href='/'>
                        <OndemandVideoIcon fontSize="large" />
                        <div className='font-bold text-lg text-nowrap'>{title}</div>
                    </Link>
                    <div className='flex gap-2'>
                        <Button className='h-8' onClick={handleSearchOnOff}>
                            <SearchIcon fontSize="small" />
                        </Button>

                        <Link className='flex items-center' href='/profile'>
                            <Button className='h-8'>
                                <AccountBoxIcon fontSize="small" />
                            </Button>
                        </Link>

                        <Button className='h-8' onClick={e => signOut()}>
                        <LogoutIcon fontSize="small" />
                        </Button>

                    </div>
                </div>

                {/* opened mobile search bar */}
                <div className={clsx('items-center w-full flex', !enable && 'hidden')}>

                    <div className='gap-2 items-center max-w-lg w-full flex'>
                        <Button className='h-8' onClick={handleSearchOnOff}>
                            <ArrowBackIcon fontSize="small" />
                        </Button>
                        <Input className='text-black w-full h-8' type='text' placeholder='Search' onChange={e => handTextChange(e)}></Input>
                        <Button className='h-8' onClick={handleSearch}>
                            <SearchIcon fontSize="small" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}