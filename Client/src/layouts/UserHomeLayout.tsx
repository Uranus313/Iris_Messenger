import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import userContext from "../contexts/userContext";

const HomeLayout = () => {
  const { user, isLoading } = useContext(userContext);
  const navigate = useNavigate();
  useEffect(() => {
    if ((!isLoading && !user) || (user && user.status != "user")) {
      navigate("/user/logIn");
    }
  }, [isLoading]);
  return (
    <div>
      {isLoading ? (
        <span className="loading  loading-dots loading-lg"></span>
      ) : (
        <div>
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default HomeLayout;
