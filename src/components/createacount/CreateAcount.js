import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus,faUserMinus,faUsers,faUserSecret } from "@fortawesome/free-solid-svg-icons";
import classes from "./createacount.module.css"
const CreateAcount = () =>{
    const routes=[
        {
            id:1,
            unique:'volunteer',
            headText:'متبرع',
            paraText:'التبرع لمحلات الموقع و تقديم المساعدة لهم من خلالنا او من خلال مؤسسة.',
            icon:faUserPlus
        },
        {
            id:2,
            unique:'needy',
            headText:'محتاج للمساعدة',
            paraText:'طلب مساعدة من المتطوعين او من المتبرعين في الموقع.',
            icon:faUserMinus
        },
        {
            id:3,
            unique:'organization',
            headText:'مؤسسة خيرية',
            paraText:'مساعدة المحتاجين عن طريق نشر حالات لطلب مساعدة لهم.',
            icon:faUsers
        },
        {
            id:4,
            unique:'user',
            headText:'متطوع',
            paraText:'مساعدة المحتاجين عن طريق نشر حالات لطلب مساعدة لهم.',
            icon:faUserSecret
        }
    ]
    const[route,setRoute] = useState('volunteer')
    return(
        <div className={classes.createPage}>
            <div className={classes.createHead}>
                <h2>إنشاء حساب جديد</h2>
                <p>اختر نوع الحساب لاستكمال باقي الخطوات</p>
            </div>
            <div className={classes.createSections}>
                {
                    routes.map((x)=>{
                        return(
                            <div key={x.id} 
                            className={`${classes.createItem} ${x.unique===route&&classes.activeRoute}`}
                            onClick={()=>setRoute(x.unique)}
                            >
                                <div>
                                    <FontAwesomeIcon icon={x.icon} />
                                </div>
                                <h3>{x.headText}</h3>
                                <p>{x.paraText}</p>
                            </div>
                        )
                    })
                }
            </div>
            <div className={classes.createRoute}>
                <Link to={`/createacount/${route}`}>متابعة</Link>
            </div>
        </div>
    )
}
export default CreateAcount;