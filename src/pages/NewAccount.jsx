import { Link,Form, useActionData } from "react-router-dom"

const NewAccount = ()=>{
        const useAction = useActionData()
        const error = useAction?.errors || {}

    return(
       <div className="bg-white mt-5 max-w-2xs mx-auto p-5 shadow-lg rounded-sm">
         <Form method="post">
            <h2 className="mb-5 text-center font-bold">Create new account</h2>
            <div className="mb-5">
                <label htmlFor="name" className="block mb-1 text-sm">Username</label>
                <input type="text" name="name" placeholder="Username" 
                className={`border border-gray-300 p-1 rounded-sm w-full text-sm ${error.name? 'border-red-500 forcus': '' } `} autoFocus/>
                {error &&(<label className="text-xs text-red-500">{error.name}</label>)}
            </div>

            <div className="mb-5">
                <label htmlFor="email" className="block mb-1 text-sm">Email address </label>
                <input type="email" name="email" placeholder="Email address" 
                className={`border border-gray-300 p-1 rounded-sm w-full text-sm ${error.email? 'border-red-500 forcus': '' }`}/>
                {error &&(<label className="text-xs text-red-500">{error.email}</label>)}
            </div>

            <div className="mb-5">
                <label htmlFor="password" className="block mb-1 text-sm">Password</label>
                <input type="password" name="password" placeholder="password" 
                className={`border border-gray-300 p-1 rounded-sm w-full text-sm ${error.password? 'border-red-500 forcus': '' } `}/>
                 {error &&(<label className="text-xs text-red-500">{error.password}</label>)}
            </div>

            <div className="mb-5">
                <label htmlFor="repeadPassword" className="block mb-1 text-sm">Repead Password</label>
                <input type="password" name="repeadPassword" placeholder="password" 
                className={`border border-gray-300 p-1 rounded-sm w-full text-sm ${error.repeadPassword? 'border-red-500 forcus': '' } `}/>
                {error &&(<label className="text-xs text-red-500">{error.repeadPassword}</label>)}
            </div>
            
            <div className="md-5 flex">
                <div>
                    <input type="checkbox" className="w-4 h-4 border border-gray-200" required />
                </div>
                <label htmlFor="agree" className="ml-1.5 text-xs">I agree to the processing of my personal information</label>
            </div>

            <div className="mt-5 mb-5">
                <button className="bg-blue-500 w-full text-gray-100 p-1.5 rounded-sm font-light cursor-pointer">Create</button>
            </div>
            <div className="mb-5 flex text-xs items-center gap-1 justify-center">
                <label className=""> Already have an account?</label>
                <div>
                    <Link to="/login" ><button className=" cursor-pointer text-blue-400">login</button></Link>
                </div>
            </div>
        </Form>
       </div>
    )
}

export default NewAccount