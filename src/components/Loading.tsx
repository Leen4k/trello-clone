import React from 'react'
import Skeleton from 'react-loading-skeleton'
import UpdateTodo from './UpdateTodo'
import DeleteTodo from './DeleteTodo'

const Loading = ({cards}:any) => {
  return (
    Array(cards).fill(0).map(item =>(
        <>
          <div className="flex flex-col gap-2 bg-[#101204] text-[#B5C2CF] px-2 py-4 rounded-lg w-[300px] shrink-0 hover:shadow-xl">
              <Skeleton  />
              <Skeleton height={40}/>
              <Skeleton />
              <div className="flex gap-2 px-2">
                <UpdateTodo />
                <DeleteTodo />
                <Skeleton />
              </div>
          </div>
      </>
    ))
  )
}

export default Loading