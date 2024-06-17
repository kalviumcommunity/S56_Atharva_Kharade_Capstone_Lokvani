import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ userId: '' });
  const [loading, setLoading] = useState(true);
  const token = Cookies.get('token');

  useEffect(() => {
    const fetchUserData = async () => {
      if (token) {
        try {
          const response = await axios.get("https://s56-atharva-kharade-capstone-lokvani.onrender.com/UserDetails", {
            headers: {
              Authorization: token
            }
          });
          setUser({ userId: response.data.userId });
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  return (
    <UserContext.Provider value={{ user, loading, setUser, setLoading }}>
      {children}
    </UserContext.Provider>
  );
};
