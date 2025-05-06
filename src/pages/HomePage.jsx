import { useEffect } from "react";
import { useSelector } from "react-redux";

const HomePage = () => {
  const { userId, username } = useSelector((state) => state.auth);
  useEffect(() => {
    console.log(username);
  }, []);

  return <div>HomePage</div>;
};

export default HomePage;
