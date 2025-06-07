import { Link, useNavigate, Navigate} from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";

const Login = () => {
    const {login, isLoging, errors} = useAuthContext()
    const [formErrors, setFormErrors] = useState(null)
    const navi = useNavigate()

    const handlSubmit = async(e)=>{
        e.preventDefault()
        const formData = new FormData(e.target)
        const email = formData.get('email')
        const password = formData.get('password')

        try {
            await login(email,password)
             navi('/')
        } catch (error) {
           setFormErrors(error)
        }

        console.log(formErrors)
    };
    
   
    if(isLoging) return <Navigate to={`/`} replace />;
    return (
         <div className="bg-white mt-5 max-w-2xs mx-auto p-5 shadow-lg rounded-sm">
         <form method="post" className=" space-y-5" onSubmit={handlSubmit}>
            <h2 className="mb-5 text-center font-bold">Sign In</h2>

            {/* Email */}
            <div>
                <label htmlFor="email" className="block mb-1 text-sm">Email address </label>
                <input type="email" name="email" 
                placeholder="Email address" 
                className={`border border-gray-300 p-2 rounded-sm w-full text-sm ${errors? "valid_input": ''}`}
                />
            </div>

            {/* password */}
            <div>
                <label htmlFor="name" className="block mb-1 text-sm">Password</label>
                <input type="password" name="password" 
                placeholder="password" 
                className={`border border-gray-300 p-2 rounded-sm w-full text-sm ${errors? "valid_input": ''}`}/>
            </div>

                 {/* email and password not correct */}
                {errors && (<label className="text-xs text-red-600 flex justify-center">{errors}</label>)}

            
            {/* Login button */}
            <div className="mt-5 mb-5">
                <button className="bg-blue-500 w-full text-gray-100 p-1.5 rounded-sm font-light cursor-pointer" type="submit">Login</button>
            </div>

            {/* Go to create account */}
            <div className="mb-5 flex text-xs items-center gap-1 justify-center">
                <label className="">Don’t have an account?</label>
                 
                <div>
                    <Link to="/sign_up"><button className=" cursor-pointer text-blue-400">Sign Up.</button></Link>
                </div>
                
            </div>
        </form>
       </div>
     );
}
 
export default Login;