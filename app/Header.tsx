import LogoutButton from '@/components/LogoutButton';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Header() {
  const session = true;

  if(session){
    return (
      <header className='sticky top-0 z-50 bg-white flex justify-between items-center p-10 shadow-sm'>
         <div className='flex space-x-2'>
         <Image
         className='rounded-full mx-2 object-fit'
          // src={session?.user?.image!}
          // src="/profilePic.jpg"
          src="https://scontent.fblr23-1.fna.fbcdn.net/v/t39.30808-6/366543401_6505075012920083_4773671698053064049_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=ohIKWQfbV-YAX82Sh3x&_nc_ht=scontent.fblr23-1.fna&oh=00_AfDbWDRbKTgwU64h-KhitJvTs68Pd7SsEgbmYrEs3ecfUA&oe=64E64329"
          alt='profile pic'
          height={50}
          width={50}
          />
          <div>
            <p className='text-blue-400'>Logged in:</p>
            <p className='font-bold text-lg'>Soumyadeep Nayak</p>
          </div>
         </div>
         <LogoutButton/>
      </header>
    )
  }
  return (
    <header className='sticky top-0 z-50 bg-white items-center p-10 shadow-sm'>
      <div className='flex flex-col items-center space-y-5'>
        <div className='flex space-x-2 items-center'>
          <Image
          src="/meta-logo.webp "
          alt='logo'
          height={10}
          width={50}
          />
          <p className='text-blue-400'> Welcome to META Messenger</p>
        </div>
        <Link  className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
        href="/auth/signin">Sign In</Link>
      </div>
    </header>
  )
}

export default Header