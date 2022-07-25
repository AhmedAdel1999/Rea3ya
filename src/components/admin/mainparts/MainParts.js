import React from "react";
import { Outlet } from "react-router-dom";
import ProfileSidebar from "../../profiles/profileSidebar/ProfileSidebar";
import classes from "./mainparts.module.css"

const MainParts = () =>{
    return(
        <div className={classes.PartsPage}>
            <ProfileSidebar />
            <Outlet />
        </div>
    )
}
export default MainParts