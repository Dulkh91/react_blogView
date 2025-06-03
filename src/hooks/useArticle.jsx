import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL

const useArticle =()=>{
    const [errors, setErrors] = useState(null)

    const createArticle = async (articleData,token)=>{
        
        try {
            const response = await fetch(`${API_URL}/articles`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body:JSON.stringify({article: articleData })
        })

        const data = await response.json()

        if(!response.ok) throw new Error('Fail to create article')
    
        return data.article
        } catch (error) {
            setErrors(error.message)
            throw error
        }
    }

    return {createArticle, errors}
}

export default useArticle