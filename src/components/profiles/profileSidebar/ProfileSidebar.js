import React from "react";
import { faArrowRightFromBracket, faFileLines, faPenToSquare, faUsers, faUserGroup, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../../features/reducers/userSlice";
import classes from "./profileSidebar.module.css";

const ProfileSidebar = () =>{

    const{role} = useSelector((state)=>state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handelLogout = () =>{
      dispatch(logout())
      navigate('/')
    }

    const checkActivity = ({isActive}) =>{
        if(isActive){
            return{
                color:"rgb(46, 196, 182)",
                background: "rgba(46, 196, 182,0.16)",
                borderRadius:"15px",
                fontWeight:"bold"
            }
        }
    }
    return(
        <div className={classes.ProfSidebar}>
            {
              (role=="super_admin" || role=="admin")?
              <h2>لوحة التحكم</h2>
              :
              <h2>صفحة الحساب</h2>
            }
            <ul className={classes.sideNavigation}>
              {
                role==="super_admin"?
                <li className={classes.navItem}>
                    <NavLink to="/" style={checkActivity}>
                      <FontAwesomeIcon icon={faUserGroup} />
                      <span>المستخدمين</span>
                    </NavLink>
                </li>
                :
                role==="admin"?
                <li className={classes.navItem}>
                    <NavLink to="/" style={checkActivity}>
                      <FontAwesomeIcon icon={faLayerGroup} />
                      <span>أقسام الحالات</span>
                    </NavLink>
                </li>
                :
                <li className={classes.navItem}>
                    <NavLink to="/profile/profiledata" style={checkActivity}>
                      <FontAwesomeIcon icon={faPenToSquare} />
                      <span>تعديل الحساب</span>
                    </NavLink>
                </li>
              }
               {
                 role!=="volunteer"&&
                  <li className={classes.navItem}>
                    <NavLink to="helpcases" style={checkActivity}>
                      <FontAwesomeIcon icon={faFileLines} />
                      {
                        (role==="needy" || role==="organization" || role==="super_admin" || role==="admin")?
                        <span>طلبات المساعدة</span>
                        :
                        <span>الحالات المضافة</span>
                      }
                    </NavLink>
                  </li>
               }
              
               {
                 (role==="organization" || role==="volunteer" || role==="super_admin" || role==="admin")&&
                  <li className={classes.navItem}>
                    <NavLink to="donatecases" style={checkActivity}>
                      <FontAwesomeIcon icon={faUsers} />
                      <span>حالات التبرع</span>
                    </NavLink>
                  </li>
               }
               
               <li className={`${classes.navItem}`}>
                    <NavLink to="/" onClick={handelLogout}>
                      <FontAwesomeIcon icon={faArrowRightFromBracket} />
                      <span>تسجيل الخروج</span>
                    </NavLink>
               </li>
            </ul>
        </div>
    )
}
export default ProfileSidebar;