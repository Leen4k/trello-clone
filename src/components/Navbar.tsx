"use client"
import React from 'react'
import {BsTrello} from "react-icons/bs"
import {BiSearchAlt2} from "react-icons/bi"
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Sort from './Sort'

const Navbar = () => {
  const session = useSession();
  const router = useRouter();
  const name = session?.data?.user?.email && session.data.user.email.charAt(0);

  const handleSignOutClick = () => {
    // Call the signOut function here
    signOut();
    router.push("/")
  };

  return (
    <div className="w-screen flex justify-between bg-[#1D2125] text-[#9FADBC] py-2 px-4 fixed">
      <div onClick={()=>{router.push("/")}} className="font-extrabold flex gap-2 items-center text-lg border-sky-100 cursor-pointer"><BsTrello />Trello</div>
      <div className="flex gap-4">
        {/* <form action="" className="flex items-center py-2 px-4 gap-2 bg-[#22272B] border-slate-500 border-[.001rem] rounded-md">
          <BiSearchAlt2 />
          <input type="text" className="bg-[#22272B] focus:outline-none hidden md:block" placeholder='search...' />
        </form> */}
        {session.status === "authenticated" && <Sort />}
      
        {session.status === "authenticated" && <button className="m-auto inline-flex items-center gap-2 justify-center rounded-md border border-transparent bg-[#22272B] px-4 py-2 text-sm font-medium text-[#B5C2CF] hover:bg-[#101204] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"><span className="rounded-full bg-[#000] w-8 h-8 flex items-center justify-center">{name?.toUpperCase()}</span>{session?.data?.user?.email}</button>}
        {session.status === "authenticated" && <button onClick={handleSignOutClick} className="m-auto inline-flex items-center gap-2 justify-center rounded-md border border-transparent bg-[#22272B] px-4 py-2 text-sm font-medium text-[#B5C2CF] hover:bg-[#101204] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">Sign Out</button>}
      </div>
      
    </div>
  )
}

export default Navbar