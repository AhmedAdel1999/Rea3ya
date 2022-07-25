import React,{ useEffect } from "react";
import { useParams,Link,useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare,faTrash } from "@fortawesome/free-solid-svg-icons";
import { useToasts } from "react-toast-notifications";
import { deleteCharity,clearCharityState } from "../../features/reducers/charitySlice";
import { useSelector,useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import CommentSection from "../comments/commentSection";
import 'swiper/css/navigation';
import 'swiper/css';
import classes from "./singlecase.module.css"



const SingleCase = () =>{
    const { id } = useParams();
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const { addToast:notify } = useToasts()
    const { allCharities,isSuccess,successMsg } = useSelector((state)=>state.charity)
    const { allParts } = useSelector((state)=>state.part)
    const { userData,token } = useSelector((state)=>state.user)
    const currentCharity = allCharities.filter((x)=>x.id==id)[0]

    const getPart = (type) =>{
        let val
        allParts.forEach((x)=>{
            if(x.id==type){
                val=x.type
            }
        })
        return val
    }

    const handelDelete = () =>{
       dispatch(deleteCharity({id,token}))
    }

    useEffect(()=>{
        dispatch(clearCharityState())
     },[dispatch])

      useEffect(()=>{
          if(isSuccess){
            dispatch(clearCharityState())
            notify(`${successMsg}`,
            {appearance: 'success',autoDismiss:"true"})
            navigate('/')
          }
      },[isSuccess])
    return(
        <div className={classes.singleCasePage}>
            <div className={classes.caseBody}>
            <div className={classes.caseImages}>
                    <div className={classes.itemPart}>{getPart(currentCharity.type_id)}</div>
                    {
                        currentCharity.images.length===1?
                        <img src={currentCharity.images[0]} />
                        :
                        <Swiper 
                         modules={[Navigation]}
                         slidesPerView={1}
                         navigation
                        >
                            {
                                currentCharity.images.map((x,ind)=>{
                                    return(
                                        <SwiperSlide key={ind}><img src={x} alt="" /></SwiperSlide>
                                    )
                                })
                            }
                        </Swiper>
                    }

                </div>

                <div className={classes.caseInfo}>
                    <div className={classes.textInfo}>
                        <h3>{currentCharity.intro}</h3>
                        <p>{currentCharity.description}</p>
                    </div>
                    <div className={classes.financeInfo}>
                        <div className={classes.finance}>
                            <div>
                                <span>المبلغ المطلوب:</span>
                                <span> {currentCharity.value_of_need} EGP</span>
                            </div>
                            <div>
                                <span>البلغ المتبقي:</span>
                                <span> {currentCharity.remaining} EGP</span>
                            </div>
                        </div>
                        <div className={classes.caseProgress}>
                            <div style={{width:`${(((currentCharity.value_of_need-currentCharity.remaining)/currentCharity.value_of_need))*100}%`}}></div>
                        </div>
                    </div>
                </div>
                {
                    (userData&&currentCharity.needy_id==userData.id)&&
                    <div className={classes.editCase}>
                        <Link to={`/createcase/${currentCharity.id}`}>
                            <span>تعديل الطلب</span>
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </Link>
                        <button onClick={()=>handelDelete()}>
                            <span>حذف الحالة</span>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>
                }
                <CommentSection charityId={id} />
            </div>
        </div>
    )
}
export default SingleCase;

/**
 * 
 */