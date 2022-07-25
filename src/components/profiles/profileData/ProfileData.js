import React, { useState,useEffect } from "react";
import { faCamera,faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik, Form, Field , ErrorMessage } from 'formik';
import * as Yup from "yup";
import ErrorMsg from "../../../utils/errorMsg";
import { CircularProgress } from "react-cssfx-loading/lib";
import { imageUpload } from "../../../utils/uploadImg";
import { updateUser,clearUserState } from "../../../features/reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import classes from "./profileData.module.css"
const ProfileData = () =>{

    const{userData,role,isError,isLoading,isSuccess,errorMsg,successMsg} = useSelector((state)=>state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { addToast:notify } = useToasts()
    const[imgUpdate,setImgUpdate]=useState(null)
    const[idImgUpdate,setIdImgUpdate]=useState(userData.id_image)
    const[imgLoad,setImgLoad]=useState(false)

    const onSubmit = async(values)=>{
      try
      {
        if(imgUpdate&&idImgUpdate){
            setImgLoad(true)
            let profImage= await imageUpload(imgUpdate)
            let idImage= await imageUpload(idImgUpdate)
            await dispatch(updateUser({
                value:{
                    ...values,
                    id_image:idImage,
                    profile_image:profImage
                },
                id:userData.id
            }))
            setImgLoad(false)
        }else if(imgUpdate){
            setImgLoad(true)
            let profImage= await imageUpload(imgUpdate)
            await dispatch(updateUser({value:{...values,profile_image:profImage},id:userData.id}))
            setImgLoad(false)
        }else if(idImgUpdate){
            setImgLoad(true)
            let idImage= await imageUpload(idImgUpdate)
            await dispatch(updateUser({value:{...values,id_image:idImage},id:userData.id}))
            setImgLoad(false)
        }else if(!idImgUpdate&&!imgUpdate){
            console.log("hiiii")
            await dispatch(updateUser({value:{...values,},id:userData.id}))
        }
      } catch (error) {
          setImgLoad(false)
      }
    }

    const calcDate = () =>{
        let d = new Date(userData.birthday);
        let month = (d.getMonth() + 1).toString();
        let day = d.getDate().toString();
        let year = d.getFullYear();
        if (month.length < 2) {
            month = '0' + month;
        }
        if (day.length < 2) {
            day = '0' + day;
        }
        return [year, month, day].join('-');
    }

    const initialVal=role==="organization"?{
        full_name:`${userData.full_name}`,
        link:`${userData.link}`,
        email:`${userData.email}`,
        password:"",
        phone:`${userData.phone}`,
        birthday:`${calcDate()}`,
        city:`${userData.city}`,
        address:`${userData.address}`,
    }
    :
    {
        full_name:`${userData.full_name}`,
        email:`${userData.email}`,
        password:"",
        phone:`${userData.phone}`,
        birthday:`${calcDate()}`,
        city:`${userData.city}`,
        address:`${userData.address}`,
    }
    
    useEffect(()=>{
        dispatch(clearUserState())
    },[dispatch])

    useEffect(()=>{
        if(isSuccess){
          dispatch(clearUserState())
          notify(`${successMsg}`,
          {appearance: 'success',autoDismiss:"true"})
          navigate('/')
        }
    },[isSuccess])

    const schema = () =>{
        if(role==="organization"){
            const schema = Yup.object().shape({
                full_name:Yup.string().min(2, 'Too Short!').required("مطلوب*"),
                link:Yup.string().required("مطلوب*"),
                email:Yup.string().email("email must be like this example@gmail.com").required("مطلوب*"),
                password:Yup.string().min(6, 'Too Short!').required("مطلوب*"),
                phone:Yup.number().typeError('you must specify a number').min(8, 'Min value 0.').required("مطلوب*"),
                birthday: Yup.date().required('مطلوب*').nullable().default(undefined),
                address:Yup.string().min(2, 'Too Short!').required("مطلوب*"),
                city:Yup.string().min(2, 'Too Short!').required("مطلوب*"),
              })
              return schema
        }
        const schema = Yup.object().shape({
          full_name:Yup.string().min(2, 'Too Short!').required("مطلوب*"),
          email:Yup.string().email("email must be like this example@gmail.com").required("مطلوب*"),
          password:Yup.string().min(6, 'Too Short!').required("مطلوب*"),
          phone:Yup.number().typeError('you must specify a number').min(8, 'Min value 0.').required("مطلوب*"),
          birthday: Yup.date().required('مطلوب*').nullable().default(undefined),
          address:Yup.string().min(2, 'Too Short!').required("مطلوب*"),
          city:Yup.string().min(2, 'Too Short!').required("مطلوب*"),
        })
        return schema
    }

    return(
        <div className={classes.ProfileData}>
            <div className={classes.profImage}>
                <img src={imgUpdate?URL.createObjectURL(imgUpdate):userData.profile_image} alt="profimg" />
                <label htmlFor="profimg">
                    <FontAwesomeIcon icon={faCamera} />
                </label>
                <input id="profimg" 
                type="file" style={{display:"none"}}
                onChange={(e)=>setImgUpdate(e.target.files[0])}
                />
            </div>
            {
                isError&&
                <ErrorMsg msg={errorMsg} />
            }
            <div className={classes.mainData}>
                <Formik 
                    initialValues={{
                        ...initialVal
                    }}
                    onSubmit={onSubmit}
                    validationSchema={schema}
                >
                    <Form>
                        <div className={classes.formItem}>
                            <label>
                                {
                                    role==="organization"?
                                    <span>اسم المؤسسة</span>
                                    :
                                    <span>الاسم</span>
                                }
                            </label>
                            <Field type="text" name="full_name" placeholder="الاسم بالكامل…" />
                            <ErrorMessage name="full_name" component="span" />
                        </div>

                        <div className={classes.formItem}>
                            <label>البريد الالكتروني</label>
                            <Field type="email" name="email" placeholder="Example@email.com" />
                            <ErrorMessage name="email" component="span" />
                        </div>

                        {
                            role==="organization"&&
                            <div className={classes.formItem}>
                                <label>رابط موقع المؤسسة</label>
                                <Field type="text" name="link" placeholder="www.organizationname.org" />
                                <ErrorMessage name="link" component="span" />
                            </div>
                        }

                        <div className={classes.formItem}>
                            <label>رقم الهاتف</label>
                            <Field type="text" name="phone" placeholder="- - - - - - - - - - -" />
                            <ErrorMessage name="phone" component="span" />
                        </div>

                        <div className={classes.formItem}>
                            <label>
                                {
                                    role==="organization"?
                                    <span>تاريخ الانشاء</span>
                                    :
                                    <span>تاريخ الميلاد</span>
                                }
                            </label>
                            <Field type="date" name="birthday"/>
                            <ErrorMessage name="birthday" component="span" />
                        </div>

                        <div className={classes.formItem}>
                            <label>المدينة</label>
                            <Field type="text" name="city" placeholder="المنوفية…"/>
                            <ErrorMessage name="city" component="span" />
                        </div>
                    
                        <div className={classes.formItem}>
                            <label>العنوان</label>
                            <Field type="text" name="address" placeholder="العنوان بالتفصيل…."/>
                            <ErrorMessage name="address" component="span" />
                        </div>

                        <div className={classes.formItem}>
                            <label>كلمة المرور</label>
                            <Field type="password" name="password" placeholder="**********" />
                            <ErrorMessage name="password" component="span" />
                        </div>
                        {
                            (role==="needy" || role==="user")&&
                            <div className={`${classes.formItem} ${classes.formItemImg}`}>
                                <label>إثبات الهوية</label>
                                <div className={classes.idImgBox}>
                                    <label htmlFor="idimg">قم بإدراج ملف اثبات الهوية كبطاقة او باسبور الخ..</label>
                                    <input 
                                        type="file" id="idimg" 
                                        style={{display:"none"}}
                                        onChange={(e)=>setIdImgUpdate(e.target.files[0])} 
                                    />
                                    
                                    {
                                        idImgUpdate&&
                                        <div className={classes.imgBox}>
                                            <img src={typeof(idImgUpdate)=="string"?`${idImgUpdate}`:URL.createObjectURL(idImgUpdate)} alt="idimage"/>
                                            <span onClick={()=>setIdImgUpdate(null)}>
                                                <FontAwesomeIcon icon={faTimes} />
                                            </span>
                                        </div>
                                    }
                                    
                                </div>
                            </div>
                        }
                        <div className={classes.creationBtn}>
                            <button type="submit">
                                <span>حفظ</span>
                                {
                                    (isLoading||imgLoad)&&
                                    <CircularProgress width="25px" height="25px" duration="1s" />
                                }
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}
export default ProfileData;