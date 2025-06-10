import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const usePlayLimit = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [remainingPlays, setRemainingPlays] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      const savedCount = localStorage.getItem("listensCount");
      const lastPlayDate = localStorage.getItem("lastPlayDate");
      const today = new Date().toDateString();
      if (!savedCount) {
        localStorage.setItem("listensCount", "0");
      }
      if (lastPlayDate !== today) {
        localStorage.setItem("lastPlayDate", today);
        localStorage.setItem("listensCount", "0");
        setRemainingPlays(10);
      }
      setRemainingPlays(10 - Number(savedCount || 0));
    }
  }, [isAuthenticated]);

  const checkPlayLimit = () => {
    if (isAuthenticated) return true;

    const currentCount = Number(localStorage.getItem("listensCount") || 0);
    if (currentCount >= 10) {
      navigate("/register", { state: { message: "Исчерпан лимит прослушиваний на сегодня." } });
      return false;
    }

    localStorage.setItem("listensCount", (currentCount + 1).toString());
    setRemainingPlays(10 - (currentCount + 1));
    return true;
  };

  return { checkPlayLimit, remainingPlays };
};

export default usePlayLimit;
