import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'

export default function Nav () {
    const pathname = usePathname()
    const [dropDownOpen, setDropDownOpen] = useState<number | null>(null)
    const navbarLink = [
        {
            id: 1,
            name: 'Dashboard',
            link: '/dms/dashboard'
        },{
            id: 2,
            name: 'Document Management',
            link: '/dms/documentmanagement'
        },{
            id: 3,
            name: 'API Reference',
            Children:[
                {
                    id: 31,
                    name: 'Document Type',
                    link: '/dms/apireferences/doctype'
                },
                {
                    id: 32,
                    name: 'File Type',
                    link: '/dms/apireferences/filetype'
                },
                {
                    id: 33,
                    name: 'System Configuration',
                    link: '/dms/apireferences/sysconfig'
                }
            ]
        },{
            id: 4,
            name: 'Reports',
            Children:[
                {
                    id: 41,
                    name: 'Audit Trail',
                    link: '/dms/apireferences/doctype'
                }
            ]
        },{
            id: 5,
            name: 'System Utilities',
            Children:[
                {
                    id: 51,
                    name: 'Access Matrix',
                    link: '/dms/apireferences/doctype'
                },
                {
                    id: 52,
                    name: 'Acess Object',
                    link: '/dms/apireferences/filetype'
                },
                {
                    id: 53,
                    name: 'Access Role',
                    link: '/dms/apireferences/sysconfig'
                },
                {
                    id: 54,
                    name: 'References',
                    link: '/dms/apireferences/sysconfig'
                },
                {
                    id: 55,
                    name: 'System Parameters',
                    link: '/dms/apireferences/sysconfig'
                },
                {
                    id: 56,
                    name: 'User Accounts',
                    link: '/dms/apireferences/sysconfig'
                }
            ]
        },{
            id: 6,
            name: 'INAI File Management',
            Children:[
                {
                    id: 61,
                    name: 'Directory Management',
                    link: '/dms/apireferences/doctype'
                },
                {
                    id: 62,
                    name: 'Upload Files',
                    link: '/dms/apireferences/filetype'
                },
                {
                    id: 63,
                    name: 'Transmitted Files',
                    link: '/dms/apireferences/sysconfig'
                },
                {
                    id: 64,
                    name: 'Failed Upload',
                    link: '/dms/apireferences/sysconfig'
                },
                {
                    id: 65,
                    name: 'Logs View History',
                    link: '/dms/apireferences/sysconfig'
                }
            ]
        }
    ]

    return(
            <aside className="bg-[#112D4E] w-50 h-full flex flex-col px-4 py-4 overflow-y-auto hide-scrollbar">    
                <nav className="space-y-5">
                    {navbarLink.map((nav) => {
                        const isActive = pathname === nav.link
                        if(nav.Children) {
                            return(
                                <div key={nav.id} className='relative'>
                                    <button onClick={() => setDropDownOpen((prev) => (prev === nav.id ? null: nav.id))} 
                                    className={`flex font-bold text-left items-center w-full px-4 py-2 rounded-lg transition duration-200
                                        ${isActive ? "bg-[#DBE2EF] text-[#112D4E]" : "hover:bg-[#3F72AF] text-white"}`}>
                                        <span className="flex items-center">
                                            {nav.name}
                                        </span>
                                        <span className="ml-2">{dropDownOpen === nav.id ?(
                                            <ChevronUpIcon className="w-5 h-5 text-white"/>
                                            ):(
                                            <ChevronDownIcon className="w-5 h-5 text-white"/>)}
                                        </span>
                                        </button>
                                    {dropDownOpen === nav.id && (
                                        <div className='ml-4 mt-1 flex flex-col space-y-1'>
                                            {nav.Children.map((child) => {
                                                const isChildActive = pathname === child.link
                                                return(
                                                    <Link className={`flex text-xs font-bold items-center px-4 py-2 rounded-lg transition duration-200
                                                        ${isChildActive ? "bg-[#DBE2EF] text-[#112D4E]" : "hover:bg-[#3F72AF] text-white"}`}
                                                    key={child.id}
                                                    href={child.link}>
                                                        {child.name}
                                                    </Link>
                                                )
                                            })}
                                        </div>
                                    )}
                                </div>
                            )
                        }  
                        return (
                            <Link className={`flex font-bold items-center px-4 py-2 rounded-lg transition duration-200
                                ${isActive ? "bg-[#DBE2EF] text-[#112D4E]" : "hover:bg-[#3F72AF] text-white"}`}
                            key={nav.id}
                            href={nav.link}>
                                {nav.name}
                            </Link>
                        )
                    })}
                </nav>
            <div className="mt-auto text-sm text-gray-300 text-center flex flex-col gap-5 ">
                <p className="text-xs">&copy; 2025 CARD MRI</p>
            </div>
        </aside>
    )
}