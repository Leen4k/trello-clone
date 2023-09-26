"use client"
import React from 'react'
import "react-toastify/ReactToastify.min.css";
import Dashboard from '@/components/Dashboard';
import { useSession } from 'next-auth/react';
import Login from '@/components/Login';
import { useRouter } from 'next/navigation';


const page = () => {
  const session = useSession();
  const router = useRouter();
  console.log(session);
  if(session.status === "authenticated"){
    router.push("/dashboard")
  }
  return (
    <Login />
  )
}

export default page