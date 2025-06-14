import { useState, useEffect } from "react";

// const API_URL = 'https://realworld.habsidev.com/api';
const API_URL = import.meta.env.VITE_API_URL;

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const [isLoging, setIsLoging] = useState(false);
  const [errors, setErrors] = useState(null);

  // Check user by token
  useEffect(() => {
    const checkAuth = async () => {
      const URL_TOKEN = `${API_URL}/user`;

      try {
        const token = localStorage.getItem("authToken");

        if (token) {
          const response = await fetch(URL_TOKEN, {
            headers: {
              Authorization: `${token}`,
              "Content-Type": "application/json",
            },
          });
          // ចាប់យក user តាមរយៈ token
          if (response.ok) {
            const userData = await response.json();
            setUser(userData.user);
            setLoading(true);
            setIsLoging(true);
          } else {
            localStorage.removeItem("authToken");
            setUser(null);
          }
        }
      } catch (err) {
        setErrors(err);
        throw err.message;
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  //Delage login
  const login = async (email, password) => {
    const API_LOGIN = `${API_URL}/users/login`;

    try {
      const response = await fetch(API_LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: { email, password } }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error("Email and Password failed login");

      // console.log("logging: ", data)

      localStorage.setItem("authToken", data.user.token);
      setIsLoging(true);
      setUser(data.user);
      return data;
    } catch (err) {
      setErrors(err.message);
      throw err;
    }
  };
  // remove every thing when click Logout

  const logout = () => {
    setIsLoging(false);
    localStorage.removeItem("authToken");
    setUser(null);
    setErrors(null);
  };

  // នេះមេរៀនអំពីចុះអ្នកប្រើប្រាស់ ដែលយើងត្រូវបានសិក្សាមកតាមក្រោយ
  const registerUser = async (userData) => {
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: userData }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error("Registration failed");

      //save data
      localStorage.setItem("authToken", data.user.token);
      setUser(data.user);
      setIsLoging(true);
      return data.user;
    } catch (error) {
      setErrors(error.message);
      throw error;
    }
  };

  const editProfile = async (userProfile) => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(`${API_URL}/user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(userProfile),
      });

      if (!response.ok) throw new Error("Update profile is failed");
      const result = await response.json();
      // console.log(result);
      setUser(result.user);
      return result.user;
    } catch (error) {
      setErrors(error.message);
      throw error;
    }
  };

  return {
    login,
    isLoging,
    logout,
    user,
    loading,
    errors,
    registerUser,
    editProfile,
  };
};

export default useAuth;
