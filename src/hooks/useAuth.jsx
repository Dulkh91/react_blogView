import {useState, useEffect } from "react";

const API_URL = 'https://realworld.habsidev.com/api';

const useAuth = ()=>{
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)

    const [isLoging, setIsLoging] = useState(false)
    const [errors, setErrors] = useState(null)

    // Check user by token
    useEffect(()=>{
        const checkAuth = async ()=>{
            const URL_TOKEN = `${API_URL}/user`;
            
            try {
                const token = localStorage.getItem('authToken')

                if(token){
                    const response = await fetch(URL_TOKEN,{
                        headers: {
                            Authorization: `${token}`,
                            'Content-Type': 'application/json'
                        }
                    })
                    // ចាប់យក user តាមរយៈ token
                    if(response.ok){
                        const userData = await response.json()
                        setUser(userData.user)
                        setLoading(true)
                        setIsLoging(true)
                    }else{
                        localStorage.removeItem('authToken')
                        setUser(null)
                    }
                }    
            } catch (err) {
                console.error('Auth check failed:', err)
            }finally{
                setLoading(false)
            }
        }

        checkAuth()
    },[])


    //Delage login
    const login = async(email,password)=>{
       
        const API_LOGIN = `${API_URL}/users/login`
        
        try {
            const response = await fetch(API_LOGIN, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({user:{email,password}})
            })

            const data = await response.json()

            console.log(response.status)

            if (!response.ok) throw new Error("Email and Password failed login");

            
            // console.log("logging: ", data)

            localStorage.setItem('authToken',data.user.token)
            setIsLoging(true)
            setUser(data.user)
            return data
        } catch (err) {
            setErrors(err.message)
            throw err
        }

    }
    // remove every thing when click Logout

    const logout = ()=>{
        setIsLoging(false);
        localStorage.removeItem('authToken');
        setUser(null);
        setErrors(null);
    }

    return {login,isLoging, logout,user, loading, errors}


}




export default useAuth

