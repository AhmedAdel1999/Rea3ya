import React, { useEffect, useState } from "react";
import Fade from 'react-reveal/Fade';
import {Link} from "react-router-dom"
import { useSelector,useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { AllCharities } from "../../features/reducers/charitySlice";
import { AllOFParts } from "../../features/reducers/partSlice";
import PaymentModal from "../paymentmodal/PayMentModal";
import classes from "./allneedycases.module.css"
import { clearTransactionsState } from "../../features/reducers/transactionsSlice";


const AllNeedyCases = ({userCharities}) =>{

    const dispatch = useDispatch()
    const { addToast:notify } = useToasts()
    const[showModal,setShowModal]=useState(false)
    const[id,setId]=useState(null)
    const { allCharities } = useSelector((state)=>state.charity)
    const {isSuccess,successMsg,isError}=useSelector((state)=>state.transactions)
    const { allParts } = useSelector((state)=>state.part)
    const { token,role } = useSelector((state)=>state.user)

    const finalCharities = userCharities?userCharities:allCharities

    useEffect(()=>{
        dispatch(AllCharities())
        dispatch(AllOFParts())
    },[])

    useEffect(()=>{
        if(isSuccess){
            dispatch(AllCharities())
            notify(`${successMsg}`,
            {appearance: 'success',autoDismiss:"true"})
            dispatch(clearTransactionsState())
            setShowModal(false)
        }else if(isError){
            dispatch(clearTransactionsState())
            setShowModal(false)
        }
    },[isSuccess,isError])

    const getPart = (type) =>{
        let val
        allParts.forEach((x)=>{
            if(x.id==type){
                val=x.type
            }
        })
        return val
    }

    const handelHelp = (val) =>{
        if(!role){
            notify(`you have to login first`,
            {appearance: 'warning',autoDismiss:"true"})
        }else{
            setId(val)
            setShowModal(true)
       }
    }

    return(
        <div className={classes.NeedyCasesSec} id="needycases">
            <Fade right>
                <h2>تصفح الحالات العاجلة</h2>
                <p>يمكنك التبرع و مساعدة المحتاجين من خلال الموقع بكل سهولة.</p>
            </Fade>
            <div className={classes.AllCases}>
            <PaymentModal 
                showModal={showModal} 
                setShowModal={setShowModal} 
                charityId={id}
            />
                {
                    finalCharities.map((item,ind)=>{
                        if(item.remaining!=0){
                            return(
                                <Fade key={item.id} right={(ind%2)==0?true:false} left={(ind%2)!=0?true:false}>
<div key={item.id} className={classes.caseItem}>
                                    <div className={classes.itemImg}>
                                        <img alt="img" src={item.images[0]} />
                                        <div className={classes.itemPart}>{getPart(item.type_id)}</div>
                                    </div>
                                    
                                    <div className={classes.itemInfo}>
                                        <h3>{item.intro?item.intro:"null"}</h3>
                                        <p>{item.description}</p>
                                        <div className={classes.financeDetails}>
                                            <div>
                                                <span>المبلغ المطلوب:</span>
                                                <span> {item.value_of_need} EGP</span>
                                            </div>
                                            <div>
                                                <span>البلغ المتبقي:</span>
                                                <span> {item.remaining} EGP</span>
                                            </div>
                                        </div>
                                        <div className={classes.itemProgress}>
                                            <div style={{width:`${(((item.value_of_need-item.remaining)/item.value_of_need))*100}%`}}></div>
                                        </div>
                                        {
                                            role?
                                            (role==="organization" || role==="volunteer")?
                                            <button onClick={()=>handelHelp(item.id)}>تبرع</button>
                                            :
                                            null
                                            :
                                            <button onClick={()=>handelHelp(item.id)}>تبرع</button>
                                        }
                                        <Link to={`/helpcases/${item.id}`}>عرض الحالة</Link>
                                    </div>
                                </div>
                                </Fade>
                            )
                        }
                    })
                }
            </div>
        </div>
    )
}
export default AllNeedyCases;