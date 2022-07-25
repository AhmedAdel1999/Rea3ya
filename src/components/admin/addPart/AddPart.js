import React, { useEffect, useState } from "react";
import { Formik, Form, Field , ErrorMessage } from 'formik';
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "react-cssfx-loading/lib";
import ErrorMsg from "../../../utils/errorMsg";
import classes from "../../createacount/generalcreate.module.css"
import { useNavigate, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { AddParts,clearPartState,EditPart } from "../../../features/reducers/partSlice";
import { imageUpload } from "../../../utils/uploadImg";
const AddPart = () =>{

    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const { addToast:notify } = useToasts()
    const[partImg,setPartImg]=useState(null)
    const[imgLoad,setImgLoad]=useState(false)
    const { token } = useSelector((state)=>state.user)
    const { isError,isSuccess,successMsg,errorMsg,isLoading,allParts } = useSelector((state)=>state.part)
    const partData = id && allParts.filter((x) => x.id==id)[0]


    const onSubmit = async(values)=>{
        try {
            if(id){
                if(partImg){
                    setImgLoad(true)
                    let image=await imageUpload(partImg)
                    await dispatch(EditPart({id,token,values:{...values,image}}))
                    setImgLoad(false)
                }else{
                    dispatch(EditPart({id,values}))
                }
                
            }else{
                if(!partImg){
                    notify(`you have to choose an image`,
                    {appearance: 'warning',autoDismiss:"true"})
                }else{
                    setImgLoad(true)
                    let image = await imageUpload(partImg)
                    await dispatch(AddParts({values:{...values,image},token}))
                    setImgLoad(false)
                }
            }
        } catch (error) {
            setImgLoad(false)
        }
        
    }
    
    useEffect(()=>{
        if(id){
            setPartImg(partData.image)
        }
        dispatch(clearPartState())
    },[])

    useEffect(()=>{
        const fun = async () =>{
            await dispatch(clearPartState())
            notify(`${successMsg}`,
            {appearance: 'success',autoDismiss:"true"})
            navigate('/')
        }
      if(isSuccess){
        fun();
      }
    },[isSuccess])

    const schema = () =>{
        const schema = Yup.object().shape({
          type:Yup.string().min(4, 'Too Short!').required("مطلوب*"),
          description:Yup.string().min(10, 'Too Short!').required("مطلوب*"),
        })
        return schema
      }


    return(
        <div className={classes.creationPage}>
            <div className={classes.creationCard}>
                <div className={classes.cardHead}>
                    <h2>إضافة قسم جديد</h2>
                    <p>قم بملئ البيانات لاضافة قسم جديد.</p>
                </div>
               {
                isError &&
                <ErrorMsg msg={errorMsg} />
               }
                <div className={classes.cardForm}>
                    <Formik 
                        initialValues={{
                        type:id?partData.type:"",
                        description:id?partData.description:""
                    }}
                        onSubmit={onSubmit}
                        validationSchema={schema}
                    >
                        <Form>
                            <div className={classes.formItem}>
                                <label>اسم القسم</label>
                                <Field type="text" name="type" placeholder="اسم القسم…." />
                                <ErrorMessage name="type" component="span" />
                            </div>

                            <div className={classes.formItem}>
                                <label>وصف القسم</label>
                                <Field type="text" as="textarea" name="description" placeholder="وصف القسم…." />
                                <ErrorMessage name="description" component="span" />
                            </div>


                            <div className={classes.formItem}>
                               <label>إثبات الهوية</label>
                                <div className={classes.idImgBox}>
                                   <label htmlFor="idimg">قم بإدراج صورة للقسم…</label>
                                   <input 
                                      type="file" id="idimg" 
                                      style={{display:"none"}}
                                      onChange={(e)=>setPartImg(e.target.files[0])} 
                                    />
                                    {
                                        partImg&&
                                        <div className={classes.imgBox}>
                                            <img src={id?typeof(partImg)==="string"?`${partImg}`:URL.createObjectURL(partImg):URL.createObjectURL(partImg)} alt="idimage"/>
                                            <span onClick={()=>setPartImg(null)}>
                                                <FontAwesomeIcon icon={faTimes} />
                                            </span>
                                        </div>
                                    }
                               </div>
                            </div>

                            <div className={classes.creationBtn}>
                                <button type="submit">
                                {
                                    id?
                                    <span>تعديل القسم</span>
                                    :
                                    <span>إضافة قسم</span>
                                }
                                  
                                  {
                                    (isLoading || imgLoad)&&
                                    <CircularProgress width="25px" height="25px" duration="1s" />
                                  }
                                </button>
                            </div>
                        </Form>
                    </Formik>
                </div>
    
            </div>
        </div>
    )
}
export default AddPart;