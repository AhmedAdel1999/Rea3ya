import React from "react";
import { TwinSpin } from "react-cssfx-loading";
import classes from "./suspensePage.module.css"
const SuspensePage = () =>{
    return(
        <div className={classes.LandingPage}>
            <TwinSpin color="#2EC4B6" width="150px" height="150px" duration="1.5s" />
            <p>...Landing</p>
        </div>
    )
}
export default SuspensePage;