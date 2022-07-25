import React from "react";
import { Outlet } from "react-router-dom";
import ProfileSidebar from "../profileSidebar/ProfileSidebar";
import classes from "./mainProfile.module.css"

const MainProfile = () =>{
    return(
        <div className={classes.ProfilePage}>
            <ProfileSidebar />
            <Outlet />
        </div>
    )
}
export default MainProfile