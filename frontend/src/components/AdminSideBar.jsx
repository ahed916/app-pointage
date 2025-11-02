import { ChevronFirst, MoreVertical,ChevronLast} from 'lucide-react'
import React, { createContext, useState, useContext } from 'react'
import isimmLogo from "../assets/isimmLogo.png";
const SidebarContext=createContext()
export default function AdminSideBar({children}) {
    const [expanded,setExpanded]=useState(true)
    return (
        <>
            <aside className='h-screen'>
                <nav className='h-full flex flex-col bg-white border-r'>
                    <div className='p-4 pb-2 flex justify-between items-center'>
                        <img src={isimmLogo} alt="ISIMM Logo" className={`overflow-hidden transition-all ${expanded ? "w-20":"w-0"}`}/>
                        <button onClick={()=>setExpanded((curr)=>!curr)} className='p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100'>
                            {expanded ? <ChevronFirst/> : <ChevronLast /> }
                        </button>

                    </div>
                    <SidebarContext.Provider value={{expanded}}>
                    <ul className='flex-1 px-3'> {children}</ul>
                    </SidebarContext.Provider>
                    <div className='border-t flex p-3'>
                        <img src={isimmLogo} className='w-10 h-10 rounded-md'/>
                        <div className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3":"w-0"} `}>
                            <div className='leading-4'>
                                <h4 className='font-semibold'>Smart Attendance System</h4>
                                <span className='text-xs text-gray-600'>smartAttendance@isimm.tn</span>
                            </div>
                            <MoreVertical size={20}/>
                        </div>
                    </div>
                </nav>
            </aside>

        </>
    )
} 
export function AdminSideBarItems({icon,text,active,alert}){
    const {expanded} =useContext(SidebarContext)
    return(
        <li className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${active ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800":"hover:bg-indigo-50 text-gray-600"}`}>
            {icon}
            <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3": "w-0"}`}>{text}</span>

            {!expanded &&(
                <div className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
                    {text}
                </div>
            )}
        </li>
    )
}