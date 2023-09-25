import React from 'react'
import {BsTrello} from "react-icons/bs"
import {BiSearchAlt2} from "react-icons/bi"
const Navbar = () => {
  return (
    <div className="w-screen flex justify-between bg-[#1D2125] text-[#9FADBC] py-2 px-4 fixed">
      <div className="font-extrabold flex gap-2 items-center text-lg border-sky-100"><BsTrello />Trello</div>
      <form action="" className="flex items-center py-2 px-4 gap-2 bg-[#22272B] border-slate-500 border-[.001rem] rounded-md">
        <BiSearchAlt2 />
        <input type="text" className="bg-[#22272B] focus:outline-none" placeholder='search...' />
      </form>
    </div>
  )
}

export default Navbar