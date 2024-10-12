import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from '../pages/Home'
import DummyMenu from "../pages/DummyMenu";





const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/Menu",
        element: <DummyMenu />,
    },
    {
        path: "*",  // This catches any undefined route
        element: <Navigate to="/" />,  // Redirect to Home
    }
])
export default router