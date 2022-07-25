import React, {useState} from "react";
import { useSelector,useDispatch } from "react-redux";
import moment from "moment"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH,faXmark,faPen } from "@fortawesome/free-solid-svg-icons";
import OutsideClickHandler from 'react-outside-click-handler';
import classes from "./singlecomment.module.css"
import { deleteComment, updateComment } from "../../../features/reducers/commentSlice";

const SingleComment = ({item,charityId}) =>{
    
    const dispatch = useDispatch();
    const[isOpen,setIsOpen]=useState(false)
    const[isEdit,setIsEdit]=useState(false)
    const[text,setText]=useState(item.message)

    const { token,userData,role,allUsers } = useSelector((state)=>state.user)

    const handelDelete = () =>{
        dispatch(deleteComment({token,id:charityId,comId:item.id}))
    }

    const handelUpdate = async() =>{
        console.log(text)
        await dispatch(updateComment({token,id:charityId,comId:item.id,message:text}))
        setIsEdit(false)
    }

    const getComProfile = (id) =>{
        let profImg
        let prof_full_name
        allUsers.forEach(ele => {
            if(ele.id==id){
                profImg=ele.profile_image;
                prof_full_name=ele.full_name
            }
        });
        return{
            profImg,prof_full_name
        }
    }

    return(
        <div key={item.id} className={classes.singleComment}>
            <div className={classes.commentImg}>
                <img alt="img" src={`${getComProfile(item.user_id).profImg}`} />
            </div>
            <div className={classes.commentBody}>
                <div className={classes.bodyHead}>
                    <div>
                        <span>{`${getComProfile(item.user_id).prof_full_name}`}</span>
                        <span>{moment(item.created_time).fromNow()}</span>
                    </div>
                    {
                        (role==="admin" || role==="super_admin" || (userData&&item.user_id==userData.id) )&&
                        <OutsideClickHandler
                            onOutsideClick={() => setTimeout(() => {
                                setIsOpen(false)
                            }, 100)}
                        >
                            <FontAwesomeIcon onClick={()=>setIsOpen(!isOpen)}
                            icon={faEllipsisH} />
                        </OutsideClickHandler>
                    }
                </div>
                {
                    isOpen&&
                    <ul className={classes.dropDown}>
                        <li onClick={()=>handelDelete()}>
                            <span>حذف</span>
                            <FontAwesomeIcon icon={faXmark} />
                        </li>
                        {
                            userData&&
                            item.user_id==userData.id&&
                            <li onClick={()=>setIsEdit(true)}>
                                <span>تعديل</span>
                                <FontAwesomeIcon icon={faPen} />
                            </li>
                        }
                    </ul>
                }
                
                {
                    isEdit?
                    <div className={classes.updateBox}>
                        <textarea value={text} onChange={(e)=>setText(e.target.value)} />
                        <div className={classes.updateControlls}>
                            <button onClick={()=>setIsEdit(false)}>تراجع</button>
                            <button onClick={()=>handelUpdate()}>تحديث</button>
                        </div>
                    </div>
                    :
                    <p className={classes.bodyText}>{item.message}</p>
                }
            </div>
        </div>
    )
}
export default SingleComment;