import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCredentials, setLoading, logout } from "../store/authSlice";
import axios from "axios";

const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Если токена нет - сразу пропускаем
    if (!token) {
      dispatch(setLoading(false));
      return;
    }

    const verifyToken = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/auth/verify", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const user = response.data;

        dispatch(
          setCredentials({
            userId: user._id,
            username: user.name,
            role: user.role,
            token,
          })
        );
      } catch (error) {
        // Удаляем битый/просроченный токен
        console.log(error);
        localStorage.removeItem("token");
        dispatch(logout());
      } finally {
        // В любом случае снимаем загрузку
        dispatch(setLoading(false));
      }
    };

    verifyToken();
  }, [dispatch]);

  return children;
};

export default AuthInitializer;
