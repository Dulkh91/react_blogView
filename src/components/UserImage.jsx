// import './UserImage.css'
import imageDefault from "../assets/imageDefault.png";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const UserImage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  const { user,logout } = useAuthContext();

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    // create fn press escape
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);

    // handle for click mouse outside card
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // setIsOpen to fale by mouse
      window.removeEventListener("keydown", handleKeyDown); // setIsOpen to fale by key
    };
  }, [isOpen]);

  return (
    <>
      {/* Destop responsive */}
      <div className=" hidden  md:flex items-center gap-3">
        <span className="username"> {user.username}</span>
        <div className="inline-block relative items-center flex-shrink-0">
          <img
            src={user.image || imageDefault}
            alt="profile"
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={() => setIsOpen(true)}
          />
          {isOpen && (
            <div
              className="absolute bg-white shadow-lgrounded-sm top-12 right-0 z-10 transition-all duration-500 ease-in-out"
              ref={modalRef}
            >
              <div className="group hover:bg-gray-200 p-2 flex items-center ">
                <span className="text-xs block text-gray-400 mx-2 group-hover:text-black">
                  {" "}
                  {user.bio}
                </span>
              </div>
              <div className="group hover:bg-gray-200 p-2 flex items-center">
                <span className="text-xs block text-gray-400 mx-2 group-hover:text-black">
                  {" "}
                  {user.email}
                </span>
              </div>

              <Link to={`/edit_profile`}>
                <button
                  className=" bg-blue-500 text-white text-center text-sm rounded-sm w-full mt-3 p-1"
                  onClick={() => setIsOpen(false)}
                >
                  profile edit
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile responsive */}
      <div className="md:hidden">
        <img
          src={user.image || imageDefault}
          alt="profile"
          className="w-10 h-10 rounded-full cursor-pointer"
          onClick={() => setIsOpen(true)}
        />
        {isOpen && (
          <div
            className="absolute bg-white w-60 shadow-lg rounded-b-sm pb-3 top-18 right-5 z-10 transition-all duration-500 ease-in-out"
            ref={modalRef}
          >
            {/* Bio */}
            <div className="group hover:bg-gray-200 p-2 flex items-center ">
              <span className="text-sm block text-gray-400 mx-2 group-hover:text-black">
                {user.bio}
              </span>
            </div>

            {/* Username */}
            <div className="group hover:bg-gray-200 p-2 flex items-center ">
              <span className="text-sm block text-gray-400 mx-2 group-hover:text-black">
                {user.username}
              </span>
            </div>
            
            <div className="group hover:bg-gray-200 p-2 flex items-center">
              <span className="text-sm block text-gray-400 mx-2 group-hover:text-black">
                {user.email}
              </span>
            </div>

            <Link to={`/edit_profile`}>
              <button
                className=" bg-blue-500 text-white text-center text-sm w-full mt-3 p-1.5"
                onClick={() => setIsOpen(false)}
              >
                profile edit
              </button>
            </Link>
          
            <div className="border-t mt-3 border-gray-300 "></div>
            <button className="mt-3 text-gray-500 text-center w-full text-sm hover:border hover:text-black p-1.5 border-gray-300"
              onClick={()=>logout()}
            >
              Log out
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default UserImage;
