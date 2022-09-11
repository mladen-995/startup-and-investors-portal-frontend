import axios from "axios";
import { useState, useEffect } from "react";
import { setToken } from "../lib/axios";
import { User } from "../lib/user";

export const useUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const response = await axios("http://localhost:3000/api/user");

      const userEntity = new User(
        response.data.user,
        response.data.token,
        response.data.isLoggedIn
      );
      setUser(userEntity);

      if (response.data.token) {
        setToken(response.data.token);
      }
    };

    getUser();
  }, []);

  return user;
};
