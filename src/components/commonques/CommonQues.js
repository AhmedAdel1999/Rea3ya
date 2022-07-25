import React, { useState } from "react";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./commonques.module.css"
const CommonQues = () =>{
    const [quesItems,setQuesItems]=useState([
        {num:1,open:true},
        {num:2,open:false},
        {num:3,open:false}
    ])
   
    const handelToggle = (item,ind)=>{
        let newArr=[...quesItems]
        newArr.splice(ind,1,{...item,open:!item.open})
        setQuesItems(newArr)
    }

    return(
        <div className={classes.commonQues}>
            <h2>الاسئلة الشائعة</h2>
            <p>يمكنك التبرع و مساعدة المحتاجين من خلال الموقع بكل سهولة.</p>
            <div className={classes.quesBody}>
                {
                    quesItems.map((x,index)=>{
                        return(
                        <div className={classes.quesItem} key={x.num}>
                            <div className={classes.itemHead}>
                                <h3>
                                هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المق..
                                </h3>
                                <span onClick={()=>handelToggle(x,index)}>
                                    <FontAwesomeIcon icon={x.open?faMinus:faPlus} />
                                </span>
                            </div>
                            <p className={!x.open?classes.togglesHeight:''}>
                                هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء
                                لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي
                                للنص أو شكل توضع الفقرات في الصفحة التي يقرأها
                            </p>
                        </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default CommonQues;