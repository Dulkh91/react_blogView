// import './UserImage.css'
import imageDefault from '../assets/imageDefault.png'
import { useState,useEffect,useRef } from 'react';
import {Link} from 'react-router-dom'
const UserImage = ({user}) => {
    const [isOpen, setIsOpen] = useState(false)
    const modalRef = useRef(null)

    const handleClickOutside = (e)=>{
        
        if(modalRef.current && !modalRef.current.contains(e.target)){
            setIsOpen(false)
        }
    }


    useEffect(()=>{
        // create fn press escape
        const handleKeyDown = (e)=>{
            if(e.key === 'Escape') setIsOpen(false)
        }
        document.addEventListener('keydown',handleKeyDown)

        // handle for click mouse outside card
        if(isOpen){
            document.addEventListener('mousedown', handleClickOutside)
        }

        return ()=>{
            document.removeEventListener('mousedown', handleClickOutside) // setIsOpen to fale by mouse
            window.removeEventListener('keydown', handleKeyDown) // setIsOpen to fale by key
        }
       
    },[isOpen])



    return ( <>
        <span className='username'> {user.username}</span>
                    <div className="inline-block relative items-center">
                        <img src={(user.image || imageDefault)} alt="profile"
                            className="w-10 h-10 rounded-full cursor-pointer"
                           onClick={()=>setIsOpen(true) }
                        />
                        {isOpen &&(
                            <div className="absolute bg-white shadow-lgrounded-sm top-12 right-0 z-10 transition-all duration-500 ease-in-out" ref={modalRef}>
                                <div className='group hover:bg-gray-200 p-2 flex items-center '>
                                    <span className="text-xs block text-gray-400 mx-2 group-hover:text-black"> {user.bio}</span>
                                </div>
                                 <div className='group hover:bg-gray-200 p-2 flex items-center'>
                                    <span className="text-xs block text-gray-400 mx-2 group-hover:text-black"> {user.email}</span>
                                </div>
                                
                                <Link to={`/edit_profile`}>
                                    <button className=" bg-blue-500 text-white text-center text-sm rounded-sm w-full mt-3 p-1"
                                        onClick={()=>setIsOpen(false)}
                                    >profile edit</button>
                                </Link>
                                
                            </div>
                        )}
                    </div>
    </> );
}
 
export default UserImage;