import React, { useState } from "react";
import { Link, useLocation, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import logo2 from "../../assets/HeadLogo.png"
import classes from "./navbar.module.css"
import { useSelector } from "react-redux";
const Navbar = () =>{

    const[toggle,setToggle]=useState(false)
    const roles=["volunteer","organization","needy","user"]
    const{role,userData}=useSelector((state)=>state.user)
    const loc=useLocation().pathname
    const handelToggle = (e) => {
        setToggle(false)
        if(loc==="/"){
            e.preventDefault();
            const target = e.target.getAttribute('href')
            const location = document.querySelector(target).offsetTop
            let app = document.getElementById("App")
            app.scrollTo({
                left:0,
                top: location - 80,
            })
        }
    }


    const navRoutes = () =>{
        if(roles.includes(role)){
            if(role==="organization" || role==="volunteer"){
                return(
                    <React.Fragment>
                        <li>
                            <NavLink onClick={()=>setToggle(false)} to={'/'}>الحالات العاجلة</NavLink>
                        </li>
                        <li>
                            <NavLink onClick={()=>setToggle(false)} to={'/departmentspage'}>الاقسام</NavLink>
                        </li>
                        <li>
                            <NavLink onClick={()=>setToggle(false)} to={'/contactus'}>تواصل معنا</NavLink>
                        </li>
                        <li className={classes.AccountLogo}>
                            <NavLink onClick={()=>setToggle(false)} to={`/profile/profiledata`}>
                                <span>{userData.full_name}</span>
                                <img src={userData.profile_image} alt="profImg" />
                            </NavLink>
                        </li>
                        {
                            role==="organization"&&
                            <li className={classes.create}>
                                <NavLink onClick={()=>setToggle(false)} to={'/createcase'}>
                                    <span><FontAwesomeIcon icon={faPlus} /></span>
                                    <span>إضافة حالة</span>
                                </NavLink>
                            </li>
                        }
                        
                    </React.Fragment>
                )
            }else if(role==="needy" || role==="user"){
                return(
                    <React.Fragment>
                        <li>
                            <NavLink onClick={()=>setToggle(false)} to={'/'}>كيفية الاستخدام</NavLink>
                        </li>
                        <li>
                            <NavLink onClick={()=>setToggle(false)} to={'/commonques'}>الاسئلة الشائعة</NavLink>
                        </li>
                        <li>
                            <NavLink onClick={()=>setToggle(false)} to={'/contactus'}>تواصل معنا</NavLink>
                        </li>
                        <li className={classes.AccountLogo}>
                            <NavLink onClick={()=>setToggle(false)} to={`/profile/profiledata`}>
                                <span>{userData.full_name}</span>
                                <img src={userData.profile_image} alt="profImg" />
                            </NavLink>
                        </li>
                        <li className={classes.create}>
                            <NavLink onClick={()=>setToggle(false)} to={'/createcase'}>
                                {
                                    role==="needy"?
                                    <span>طلب مساعدة</span>
                                    :
                                    <React.Fragment>
                                        <span><FontAwesomeIcon icon={faPlus} /></span>
                                        <span>إضافة حالة</span>
                                    </React.Fragment>
                                }
                            </NavLink>
                        </li>
                    </React.Fragment>
                )
            }
        }else if(role==="super_admin"){
            return(
                <React.Fragment>
                    <li>
                        <NavLink onClick={()=>setToggle(false)} to={'/'}>المستخدمين</NavLink>
                    </li>
                    <li>
                        <NavLink onClick={()=>setToggle(false)} to={'/addAdmin'}>إضافة مستخدم</NavLink>
                    </li>
                </React.Fragment>
            )
        }else if(role==="admin"){
            return(
                <React.Fragment>
                    <li>
                        <NavLink onClick={()=>setToggle(false)} to={'/'}>أقسام  الحالات</NavLink>
                    </li>
                    <li>
                        <NavLink onClick={()=>setToggle(false)} to={'/addPart'}>إضافة  قسم</NavLink>
                    </li>
                </React.Fragment>
            )
        }
        else{
            return(
                <React.Fragment>
                    <li>
                        {
                            loc==="/"?
                            <a onClick={handelToggle} href="#home">الرئيسية</a>
                            :
                            <NavLink onClick={handelToggle} to={'/'}>الرئيسية</NavLink>
                        }
                    </li>
                    <li>
                        {
                            loc==="/"?
                            <a onClick={handelToggle} href="#howtouse">كيفية الاستخدام</a>
                            :
                            <NavLink onClick={handelToggle} to={'/howtousepage'}>كيفية الاستخدام</NavLink>
                        }
                    </li>
                    <li>
                        {
                            loc==="/"?
                            <a onClick={handelToggle} href='#departments'>الاقسام</a>
                            :
                            <NavLink onClick={handelToggle} to={'/departmentspage'}>الاقسام</NavLink>
                        }
                    </li>
                    <li>
                        {
                            loc==="/"?
                            <a onClick={handelToggle} href="#needycases">حالات المساعدة</a>
                            :
                            <NavLink onClick={handelToggle} to={'/needycasespage'}>حالات المساعدة</NavLink>
                        }
                    </li>
                    <li>
                        {
                            loc==="/"?
                            <a onClick={handelToggle} href="#contactus">تواصل معنا</a>
                            :
                            <NavLink onClick={handelToggle} to={'/contactus'}>تواصل معنا</NavLink>
                        }
                    </li>
                    <li className={classes.login}>
                        <NavLink onClick={()=>setToggle(false)} to={'/login'}>تسجيل الدخول</NavLink>
                    </li>
                    <li className={classes.create}>
                        <NavLink onClick={()=>setToggle(false)} to={'/createacount'}>إنشاء حساب</NavLink>
                    </li>
                </React.Fragment>
            )
        }
        
    }

    return(
        <nav className={classes.navbar}>
            <div className={classes.logo}>
                <Link to={'/'}>
                   <img alt="logo" src={logo2} />
                </Link>
            </div>
            <div className={classes.toggler}>
                { 
                
                    toggle?
                    <FontAwesomeIcon icon={faTimes} onClick={()=>setToggle(!toggle)} />
                    :
                    <FontAwesomeIcon icon={faBars} onClick={()=>setToggle(!toggle)} />
                }
            </div>
            <ul className={`${classes.routes} ${toggle&&classes.showroutes}`}>
                {navRoutes()}
            </ul>
        </nav>
    )
}
export default Navbar;