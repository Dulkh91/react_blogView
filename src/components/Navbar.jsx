import { Link,useLocation } from "react-router-dom"
import { useAuthContext } from "../context/AuthContext"
import imageDefault from '../assets/imageDefault.png'
const Navbar = () =>{
    const {isLoging, logout,user} = useAuthContext()
    const path = useLocation()

    const handleLogout = ()=>{
       logout()
    }

    return (
        <nav className="bg-white p-4 text-lg flex justify-between items-center">
            <Link to="/"><h1>Realworld blog</h1></Link>
            <div >
                {isLoging?(<div className="flex items-center gap-5">
                    <Link to='/create_article' 
                        className="text-sm text-lime-500 rounded-sm p-1 hover:border hover:border-lime-500 ">
                        Create article
                    </Link>

                    <label htmlFor="nameuser">{user.username}</label>

                    <img src={(user.image || imageDefault)} alt="profile"
                     className="w-10"
                     />

                    <button className="p-2 px-4 rounded-sm hover:border hover:border-gray-300"
                       onClick={handleLogout}
                       >
                        Log Out
                    </button>
                </div>) : (<div>
                <Link  to='/login'> <button className={`mx-2 ${path.pathname==='/login'? 'active_btn':''}`}  >Sign in</button></Link>
                <Link  to="/sign_up"> <button className={`mx-2  ${path.pathname==='/sign_up'? 'active_btn':''}`} >Sign up</button></Link>
                </div>)}

            </div>
        </nav>
    )
}

export default Navbar