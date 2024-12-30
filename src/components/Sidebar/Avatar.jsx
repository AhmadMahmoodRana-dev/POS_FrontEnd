import { Context } from "@/context/Context"
import { useContext } from "react"

export function Avatar() {
const {setOpenAvatar} = useContext(Context)
    return (
      <>
       
  
        <div className="flex -space-x-2 overflow-hidden" onClick={() => setOpenAvatar(true)} >
          <img
            alt=""
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
            className="inline-block size-8 rounded-full ring-2 ring-white"
          />
        </div>
  
        
      </>
    )
  }
export function Avatar1() {
    return (
      <>
       
  
        <div className="flex -space-x-2 overflow-hidden">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
            className="inline-block size-24 rounded-full ring-2 ring-white"
          />
        </div>
  
        
      </>
    )
  }
  