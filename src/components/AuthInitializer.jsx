import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCredentials, setLoading, logout } from "../store/authSlice";
import { verifyToken } from "../api/requests";

const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Если токена нет - сразу пропускаем
    if (!token) {
      dispatch(setLoading(false));
      return;
    }

    const checkToken = async () => {
      try {
        const res = await verifyToken(token);
        const user = res;

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

    checkToken();
  }, [dispatch]);

  return children;
};

export default AuthInitializer;
