import { useState } from "react";
import useArticle from "../hooks/useArticle";
import { useAuthContext } from "../context/AuthContext";
import {useNavigate,useParams} from 'react-router-dom'

const DeleteBtn = () => {
    const [eventBtn, setEventBtn] = useState(false)
    const {user} = useAuthContext()
    const {deleteArticle} = useArticle()
    const navi = useNavigate()
    const {slug} = useParams()

    const onDeleteArticle = async ()=>{
        try {
           const result =  await deleteArticle(slug,user?.token)
            navi('/articles')
            setEventBtn(false)
            return result
        } catch (error) {
            alert(error.message)
        }
    }

  return (
    <>
      <div className=" inline-block relative">
        <button 
        className="border border-red-500 text-red-500 rounded-sm px-3 p-1 transition"
        onClick={()=>setEventBtn(true)}
        >
          Delete
        </button>

        {/* Popover */}
        {eventBtn && (<div 
        className={`absolute z-20 bg-white shadow-lg rounded-sm p-4 w-60 md:left-full ml-3 md:top-0 duration-500 transition-all ease-in-out right-0
                ${eventBtn? ' opacity-100 translate-y-0': 'opacity-0 translate-y-4'}
            `}>
          {/* Arrow */}
          <span className="absolute md:-left-2 right-4 top-1 w-4 h-4 bg-white rotate-45 md:shadow-lg z-0 "></span>
          
          {/* Content text */}
          <div className=" relative z-10">
            <div className="flex  ">
              <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center shrink-0">
                <span className="text-white">&#33;</span>
              </div>
              <label className="text-left ml-2 text-gray-500">
                Are you sure to delete this article?
              </label>
            </div>

            <button 
                className="border border-gray-400 rounded-sm p-0.5 px-3 mr-2"
                onClick={()=>setEventBtn(false)}
                >
              No
            </button>
            <button
             className="bg-blue-400 text-white p-0.5 px-3 rounded-sm"
             onClick={onDeleteArticle}
             >
              Yes
            </button>
          </div>
        </div>)}

      </div>
    </>
  );
};

export default DeleteBtn;
