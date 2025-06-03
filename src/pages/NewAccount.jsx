import { useAuthContext } from "../context/AuthContext"
import { useForm } from "react-hook-form"
import { Link,useNavigate } from "react-router-dom"
import { useState } from "react"
const NewAccount = ()=>{
    const [formErrors, setFormErrors] = useState(null);
    const navi = useNavigate()
    const {register,handleSubmit, formState:{errors}, watch} = useForm({defaultValues:{
        user:{
            username:'',
            email:'',
            password:''
        },
        repeadPassword: ''
    }})
    const {registerUser} = useAuthContext()

    const onSubmit = async(data)=>{
        try {
            await registerUser(data.user)
            navi('/')
        } catch (error) {
            setFormErrors(error.message)
        }
        
    }

    

    return(
       <div className="bg-white mt-5 max-w-md mx-auto p-5 shadow-lg rounded-sm">
         <form method="post" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="mb-5 text-center font-bold">Create new account</h2>

            {/* user name */}
            <div className="mb-5">
                <label htmlFor="name" className="block mb-1 text-sm">Username</label>
                <input type="text" name="name" placeholder="Username" 
                className={`border border-gray-300 p-2 rounded-sm w-full text-sx ${(errors?.user?.username)? 'valid_input': ''}`} autoFocus
                    {...register('user.username',
                        {required: 'user name is required',
                             minLength: {
                                value: 3,
                                message: 'Minimum 3 characters'
                             }, 
                             maxLength: {
                                value: 20,
                                message: 'Maximum 20 characters'
                             }
                            })}
                />
                      {/* សិក្សាលក្ខណ username*/}
                {errors?.user?.username && (<label className="text-red-500 text-xs">{errors.user.username.message}</label>)}

            </div>

            {/* Email */}
            <div className="mb-5">
                <label htmlFor="email" className="block mb-1 text-sm">Email address </label>
                <input type="email" name="email" placeholder="Email address" 
                className={`border border-gray-300 p-2 rounded-sm w-full text-sm ${(errors.user?.email)? "valid_input":""}`}
                    {...register('user.email',{
                        required: 'Email is quired',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 
                            message: 'Email is not valid'
                        }
                        
                    })}
                />
                {/* សិក្សាលក្ខណ Email*/}
                {errors?.user?.email && (<label className="text-red-500 text-xs">{errors.user.email.message}</label>)}
            </div>

            {/* Password */}
            <div className="mb-5">
                <label htmlFor="password" className="block mb-1 text-sm">Password</label>
                <input type="password" name="password" placeholder="password" 
                className={`border border-gray-300 p-2 rounded-sm w-full text-sm ${(errors?.user?.password)? 'valid_input': ''}`}
                    {...register('user.password',{
                        required: 'Password is required',
                        validate: (value)=>{if(value.length <6 || value.length > 40){
                            return 'Password must be between 6 and 40 characters';
                            }
                            return true
                        }
                        
                    })}
                />

                {/* សិក្សាលក្ខណ Password*/}
                { errors?.user?.password && (<label className="text-red-500 text-xs">{errors.user.password.message}</label>)}
            </div>

            {/* Repeat Password */}
            <div className="mb-5">
                <label htmlFor="repeadPassword" className="block mb-1 text-sm">Repead Password</label>
                <input type="password" name="repeadPassword" placeholder="password" 
                className={`border border-gray-300 p-2 rounded-sm w-full text-sm ${(errors?.repeadPassword)? 'valid_input': ''}`}
                    {...register('repeadPassword', {
                        required: 'Input password again',
                        validate: (value)=> value === watch('user.password') || 'password and repeat password must match'
                    })}
                />

               {errors.repeadPassword && (<label className="text-red-500 text-xs">{errors.repeadPassword.message}</label>)}
            </div>
            
            {/* Check Agree */}
            <div className="md-5 flex">
                <div>
                    <input type="checkbox" className="w-4 h-4 border border-gray-200" required />
                </div>
                <label htmlFor="agree" className="ml-1.5 text-xs">I agree to the processing of my personal information</label>
            </div>

            {/* Create Account BTN */}
            <div className="mt-5 mb-5">
                <button className="bg-blue-500 w-full text-gray-100 p-1.5 rounded-sm font-light cursor-pointer" type="submit">Create</button>
            </div>

            {/* Switch to Sign in */}
            <div className="mb-5 flex text-xs items-center gap-1 justify-center">
                <label className=""> Already have an account?</label>
                <div>
                    <Link to="/login" ><button className=" cursor-pointer text-blue-400">login</button></Link>
                </div>
            </div>
        </form>
       </div>
    )
}

export default NewAccount