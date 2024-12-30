import { Context } from '@/context/Context';
import { useContext} from 'react'
import { FaBarsStaggered } from "react-icons/fa6";
import { FaBell } from "react-icons/fa6";
import {Avatar} from '../Sidebar/Avatar';
export default function Navbar() {
  const {setMobileMenuOpen} = useContext(Context)

  return (
    <header className="bg-white">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="md:hidden flex lg:flex-1">
        <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <FaBarsStaggered aria-hidden="true" className="size-6" />
          </button>
        </div>
       
        <div className=" flex flex-1 justify-end items-center gap-4">
          <a href="#" className="text-2xl font-semibold text-gray-900">
            <FaBell/>
          </a>
          <Avatar/>
        </div>
      </nav>
      
    </header>
  )
}
