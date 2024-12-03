import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import Login from "../user/login/login"
import OuterLayout from "../layouts/OuterLayout"
import UserHomeLayout from "../layouts/UserHomeLayout"
import Verification from "../user/verification/Verification"
import AdminLogin from "../admin/adminLogin/AdminLogin"
import SuperAdminLogin from "../admin/superAdminLogin/SuperAdminLogin"
import AdminHomeLayout from "../layouts/AdminHomeLayout"
import SuperAdminHomeLayout from "../layouts/SuperAdminHomeLayout"
import AdminPanel from "../admin/adminPanel/AdminPanel"
import SuperAdminPanel from "../admin/superAdminPanel/SuperAdminPanel"



const router = createBrowserRouter([
        {path:"/",element: <OuterLayout /> ,  children:[
                {path: 'user/',children:[
                        {path:'logIn',element: <Login  />},
                        {path:'' , element: <UserHomeLayout /> , children:[
                                {path: '', element: <App/>}
                        ]}
                ]},
                {path: 'admin/',children:[
                        {path:'logIn',element: <AdminLogin  />},
                        {path:'' , element: <AdminHomeLayout /> , children:[
                                {path: '', element: <AdminPanel/>}
                        ]}
                ]},
                {path: 'superAdmin/',children:[
                        {path:'logIn',element: <SuperAdminLogin  />},
                        {path:'' , element: <SuperAdminHomeLayout /> , children:[
                                {path: '', element: <SuperAdminPanel/>}
                        ]}
                ]}

                
        ]}
])

export default router