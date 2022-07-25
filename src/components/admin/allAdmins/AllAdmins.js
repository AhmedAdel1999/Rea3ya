import React, { useEffect } from "react";
import { faPlus,faTrashCan,faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { useDispatch, useSelector } from "react-redux";
import { AllOFAdmins, clearAdminState, DeleteAdmin } from "../../../features/reducers/adminSlice";
import classes from  "./alladmins.module.css"

const AllAdmins = () =>{

    const dispatch = useDispatch()
    const { addToast:notify } = useToasts()
    const { allAdmins,isSuccess,successMsg } = useSelector((state)=>state.admin)


    useEffect(()=>{
      dispatch(clearAdminState())
    },[])

    useEffect(()=>{
       dispatch(AllOFAdmins())
       if(isSuccess){
        notify(`${successMsg}`,
        {appearance: 'success',autoDismiss:"true"})
        dispatch(clearAdminState())
       }
    },[isSuccess])


    return(
        <div className={classes.AllAdminsPage}>
            <div className={classes.addAdmin}>
                <Link to={`/addAdmin`}>
                    <FontAwesomeIcon icon={faPlus} />
                    <span>إضافة مستخدم</span>
                </Link>
            </div>
            <div className={classes.allAdmins}>
                {
                    allAdmins.map((item,ind)=>{
                        return(
                            <div key={ind} className={classes.adminItem}>
                                <div className={classes.itemData}>
                                    <h3>{item.full_name}</h3>
                                    <p>{item.email}</p>
                                </div>
                                <div className={classes.itemControll}>
                                    <Link to={`/addAdmin/${item.admin_id}`}>
                                        <FontAwesomeIcon icon={faPen} />
                                    </Link>
                                    <span onClick={()=>dispatch(DeleteAdmin(item.admin_id))}>
                                        <FontAwesomeIcon icon={faTrashCan} />
                                    </span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default AllAdmins;