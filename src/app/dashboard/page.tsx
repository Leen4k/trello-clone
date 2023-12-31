"use client"
import AddTodos from '@/components/AddTodos';
import DeleteTodo from '@/components/DeleteTodo';
import UpdateTodo from '@/components/UpdateTodo';
import Link from 'next/link';
import React, { useState } from 'react'
import {BiEditAlt, BiTrash} from "react-icons/bi"
import { ToastContainer } from 'react-toastify';
import "react-toastify/ReactToastify.min.css";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useSession } from 'next-auth/react';
import useSWR from 'swr'
import { useRouter, useSearchParams } from 'next/navigation';
import Loading from '@/components/Loading';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


type DataProps = {
  id: string;
  title:string;
  desc: string;
  timestamp: any;
  createdAt: any;
}[]



const page = () => {


  const session = useSession();
  const searchParams = useSearchParams()
  const router = useRouter();
  const fetcher = (...args:[any]) => fetch(...args).then((response) => response.json());
  // const {data, mutate, error, isLoading} = useSWR(`api/todos?username=${session?.data?.user?.email}`,fetcher)
  const {data, mutate, error, isLoading} = useSWR(`api/todos?username=${session?.data?.user?.email}`,fetcher)


  if(session.status === "unauthenticated") {
    router.push("/login")
  }


  data?.sort((a:any, b:any) => {
    const isAsc = searchParams.get('isAscending');
    const dateA:any = new Date(a.createdAt);
    const dateB:any = new Date(b.createdAt);
    return (isAsc === "true" || isAsc === null ? dateA - dateB  : dateB - dateA);
  });
  
  return (
    <section className="min-h-screen md:h-screen overflow-y-hidden min-w-fit pt-32 px-4 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
      <SkeletonTheme baseColor="#313131" highlightColor="#525252">
        <div className="flex flex-col md:flex-row gap-4 text-sm">
          {isLoading ? <Loading cards={8} /> : data?.map((item:any)=>(
            <div key={item.id} className="flex flex-col gap-2 bg-[#101204] text-[#B5C2CF] px-2 py-4 rounded-lg w-[300px] shrink-0 hover:shadow-xl">
              <h2 className="px-4">{item.title || <Skeleton />}</h2>
              <div>
                <p className="bg-[#22272B] px-4 py-4 rounded-lg">{item.desc || <Skeleton />}</p>
              </div>
              <div className="flex justify-between">
                <div className="flex gap-2 p-2">
                  <UpdateTodo id={item.id} title={item.title} desc={item.desc} data={data} mutate={mutate} />
                  <DeleteTodo id={item.id} title={item.title} desc={item.desc} data={data} mutate={mutate} />
                </div>
                <p className="px-4 py-2 rounded-lg">{formatDistanceToNow(new Date(item.createdAt),{addSuffix:true}) || <Skeleton />}</p>
              </div>
            </div>
          ))}
          <AddTodos mutate={mutate} isLoading={isLoading} />
          <ToastContainer position="bottom-right" newestOnTop />
        </div>
      </SkeletonTheme>
    </section>
  )
}

export default page