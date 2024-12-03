import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import userContext from '../contexts/userContext';

const SuperAdminHomeLayout = () => {
  const {user ,  isLoading} = useContext(userContext);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(user)
    if((!isLoading && !user) || (user && user.status != "superAdmin")){
      navigate("/superAdmin/logIn");
    }
  },[isLoading])
  return (
    <div>
{
      isLoading ? <span className="loading  loading-dots loading-lg"></span> :
      <div>
      
          <Outlet/>

       
    </div>

    }
    </div>
    
 
  );
};

export default SuperAdminHomeLayout;
