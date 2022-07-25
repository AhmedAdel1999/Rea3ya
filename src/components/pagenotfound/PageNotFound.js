import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import Error from "../../assets/error.png"
import classes from "./pagenotfound.module.css"
const PageNotFound = () =>{
    const navigate = useNavigate()
    return(
        <div className={classes.NotFound}>
            <img src={Error} alt="Error" />
            <button onClick={()=>navigate(-1)}>
                <span>رجوع</span>
                <FontAwesomeIcon icon={faAnglesLeft} />
            </button>
        </div>
    )
}
export default PageNotFound;