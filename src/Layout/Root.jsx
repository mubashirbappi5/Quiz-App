import { Outlet } from "react-router-dom";
import Navber from "../Components/Navber";


const Root = () => {
    return (
        <div>
            <Navber/>
            <Outlet/>
        </div>
    );
};

export default Root;