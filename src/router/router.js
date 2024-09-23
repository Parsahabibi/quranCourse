import { createBrowserRouter } from "react-router-dom";
import Airplane from "../Components/AirplaneMenu/Airplane";
import ScrollMenu from '../Components/DummyMenu/ScrollMenu';
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
])
export default router