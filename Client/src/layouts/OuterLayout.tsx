import _ from "lodash";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import userContext from "../contexts/userContext";
import useCheckToken from "../hooks/useCheckToken";
import { User } from "../interfaces/interfaces";
const OuterLayout = () => {
  let [user, setUser] = useState<User | null | undefined>(null);
  let [loading, setLoading] = useState<any>(true);

  let { data: serverUser, error, isLoading } = useCheckToken();

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      document.documentElement.setAttribute("data-theme", theme);
    }

    setLoading(isLoading);
    if (error) {
      setUser(null);
    } else if (serverUser?.id && !_.isEqual(serverUser, user)) {
      setUser(serverUser);
    }
  }, [serverUser, isLoading]);

  return (
    <userContext.Provider
      value={{ user: user, setUser: setUser, isLoading: loading }}
    >
      <Outlet />
    </userContext.Provider>
  );
};

export default OuterLayout;
