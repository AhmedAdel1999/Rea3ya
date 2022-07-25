import React, { useEffect } from "react";
import { faPlus,faTrashCan,faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { useDispatch, useSelector } from "react-redux";
import { AllOFParts,clearPartState,DeletePart } from "../../../features/reducers/partSlice";
import classes from  "./allparts.module.css"

const AllParts = () =>{

    const dispatch = useDispatch()
    const { addToast:notify } = useToasts()
    const { token } = useSelector((state)=>state.user)
    const { allParts,isSuccess,successMsg } = useSelector((state)=>state.part)
    


    useEffect(()=>{
      dispatch(clearPartState())
    },[])

    useEffect(()=>{
       dispatch(AllOFParts())
       if(isSuccess){
        notify(`${successMsg}`,
        {appearance: 'success',autoDismiss:"true"})
        dispatch(clearPartState())
       }
    },[isSuccess])


    return(
        <div className={classes.AllPartsPage}>
            <div className={classes.addPart}>
                <Link to={`/addPart`}>
                    <FontAwesomeIcon icon={faPlus} />
                    <span>إضافة قسم</span>
                </Link>
            </div>
            <div className={classes.allParts}>
                {
                    allParts.map((item,ind)=>{
                        return(
                            <div key={ind} className={classes.partItem}>
                                <div className={classes.itemData}>
                                    <img alt="img" src={item.image} />
                                    <h3>{item.type}</h3>
                                </div>
                                <div className={classes.itemControll}>
                                    <Link to={`/addPart/${item.id}`}>
                                        <FontAwesomeIcon icon={faPen} />
                                    </Link>
                                    <span onClick={()=>dispatch(DeletePart({id:item.id,token}))}>
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
export default AllParts;