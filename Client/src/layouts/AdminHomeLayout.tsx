import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import userContext from '../contexts/userContext';

const AdminHomeLayout = () => {
  const {user ,  isLoading} = useContext(userContext);
  const navigate = useNavigate();
  useEffect(() => {
    if((!isLoading && !user) ||(user && user.status != "admin")){
      navigate("/logIn");
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

export default AdminHomeLayout;
