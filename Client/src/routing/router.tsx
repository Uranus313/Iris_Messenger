import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import Login from "../user/login/login"
import OuterLayout from "../layouts/OuterLayout"
import UserHomeLayout from "../layouts/UserHomeLayout"
import Verification from "../user/verification/Verification"
import AdminLogin from "../admin/adminLogin/AdminLogin"
import SuperAdminLogin from "../admin/superAdminLogin/SuperAdminLogin"



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
                        {path:'' , element: <UserHomeLayout /> , children:[
                                {path: '', element: <App/>}
                        ]}
                ]},
                {path: 'superAdmin/',children:[
                        {path:'logIn',element: <SuperAdminLogin  />},
                        {path:'' , element: <UserHomeLayout /> , children:[
                                {path: '', element: <App/>}
                        ]}
                ]}

                
        ]}
])

export default router