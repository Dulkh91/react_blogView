import { useState, useEffect } from "react";

export const useFetchData = (slug) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 

  const API_URL = import.meta.env.VITE_API_URL
  
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('authToken')
        const response = await fetch(`${API_URL}/${slug}`,{
          method:'GET',
          headers: {'Authorization': `Token ${token}`}
        });

        if (!response.ok) throw new Error("មានបញ្ហាក្នុងការទាញទិន្នន័យ");
        const result = await response.json();

        setData(result);
        // console.log(result)
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };



  useEffect(() => {
    fetchData();
  }, [API_URL]);

  return { data, loading, error, refecth: fetchData};
};
