import { useState, useEffect } from "react";

export const useLogin =  (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

const tokenDefault = 'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MzIsImV4cCI6MTc0OTM1OTU5NX0.ZGoq8xFSSrHQF6XttmxsCt5ZMvSaNkh0ahINbMp_y2I'

  useEffect(()=>{
    const token = localStorage.getItem('token') || tokenDefault
    if(!token) return

    const fetchData = async ()=>{
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers:{'Authorization': token}
            })
            if(!response.ok) throw new Error('មានបញ្ហាក្នុងការទាញទិន្នន័យ');
            const result = await response.json()
            setData(result)

        } catch (error) {
            setError(error.message)
        }finally{
            setLoading(false)
        }
    }

    fetchData()

  },[url])


  return {data, loading, error };
};
