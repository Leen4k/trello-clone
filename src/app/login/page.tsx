"use client"
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import {FcGoogle} from "react-icons/fc"

const page = () => {
    const session = useSession();
    const router = useRouter();
    if (session.status === "authenticated"){
        router.push("/dashboard");
    }
  return (
    <section className="flex h-screen min-w-fit pt-32 px-4 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
        <button onClick={()=>signIn("google")} className="m-auto inline-flex items-center gap-2 justify-center rounded-md border border-transparent bg-[#22272B] px-4 py-2 text-sm font-medium text-[#B5C2CF] hover:bg-[#101204] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"><FcGoogle /> Login With Google</button>
    </section>
  )
}

export default page