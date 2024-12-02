import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import Login from "../user/login/login"
import OuterLayout from "../layouts/OuterLayout"
import UserHomeLayout from "../layouts/UserHomeLayout"
import Verification from "../user/verification/Verification"



const router = createBrowserRouter([
        {path:"/",element: <OuterLayout /> ,  children:[
                {path:'logIn',element: <Verification  />},
                {path:'user' , element: <UserHomeLayout /> , children:[
                        {path: '', element: <App/>}
                ]}
        ]}
])

export default router