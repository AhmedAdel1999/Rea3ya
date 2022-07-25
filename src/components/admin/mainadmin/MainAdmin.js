import React from "react";
import { Outlet } from "react-router-dom";
import ProfileSidebar from "../../profiles/profileSidebar/ProfileSidebar";
import classes from "./mainadmin.module.css"

const MainAdmin = () =>{
    return(
        <div className={classes.AdminPage}>
            <ProfileSidebar />
            <Outlet />
        </div>
    )
}
export default MainAdmin