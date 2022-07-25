import React, { useEffect,useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";
import classes from "./commentsection.module.css"
import { allCharityComments, clearCommentState, createComment } from "../../features/reducers/commentSlice";
import SingleComment from "./singleComment/SingleComment";
const CommentSection = ({charityId}) =>{

    const[text,setText] = useState("")
    const dispatch = useDispatch()
    const { addToast:notify } = useToasts()
    const { allComments,isSuccess } = useSelector((state)=>state.comment)
    const { token,role } = useSelector((state)=>state.user)

    useEffect(()=>{
        if(isSuccess){
            dispatch(allCharityComments({id:charityId}))
            dispatch(clearCommentState())
        }else{
            dispatch(clearCommentState())
            dispatch(allCharityComments({id:charityId}))
        }
    },[isSuccess])
    
    const handelCreate = () =>{
        if(token){
           if(text){
            dispatch(createComment({token,id:charityId,message:text}))
           }else{
            notify(`you have to write any text`,
            {appearance: 'warning',autoDismiss:"true"})
           }
        }else{
            notify(`you have to login first`,
            {appearance: 'warning',autoDismiss:"true"})
        }
        
    }
    return(
        <div className={classes.CommentsSection}>
           {
                allComments.length?
                <React.Fragment>
                    <h3>التعليقات</h3>
                    <div className={classes.allComments}>
                        {
                            allComments.map((item)=>{
                                return(
                                    <SingleComment charityId={charityId} key={item.id} item={item} />
                                )
                            })
                        }
                    </div>
                </React.Fragment>
                :
                null
           }
           {
            role&&
            (role=="admin" || role=="super_admin")?
            null
           :
           <div className={classes.addComment}>
              <h4>اترك تعليقك</h4>
              <textarea placeholder="قم بكتابة تعليقك هنا…" value={text} onChange={(e)=>setText(e.target.value)} />
              <button onClick={()=>handelCreate()}>اضافة تعليق</button>
           </div>
           }
        </div>
    )
}
export default CommentSection;