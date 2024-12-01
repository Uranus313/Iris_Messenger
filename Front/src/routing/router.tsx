import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import Login from "../login/login"
import OuterLayout from "../layouts/OuterLayout"
import UserHomeLayout from "../layouts/UserHomeLayout"



const router = createBrowserRouter([
        {path:"/",element: <OuterLayout /> ,  children:[
                {path:'logIn',element: <Login  />},
                {path:'user' , element: <UserHomeLayout /> , children:[
                        {path: '', element: <App/>}
                ]}
        ]}
])

export default router