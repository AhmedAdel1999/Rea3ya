import React, { useEffect, useState } from "react";
import { Formik, Form, Field , ErrorMessage } from 'formik';
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { clearUserState, register } from "../../features/reducers/userSlice";
import { imageUpload } from "../../utils/uploadImg";
import { CircularProgress } from "react-cssfx-loading/lib";
import avatar from "../../assets/avatar.png"
import ErrorMsg from "../../utils/errorMsg";
import classes from "./generalcreate.module.css"
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";


const Organization = (props) =>{
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const { addToast:notify } = useToasts()
    const[img,setImg]=useState(null)
    const[imgLoad,setImgLoad]=useState(false)
    const{isLoading,isError,isSuccess,successMsg,errorMsg}=useSelector((state)=>state.user)

    const onSubmit = async(values)=>{
        if(img){
            setImgLoad(true)
            let profImage= await imageUpload(img)
            await dispatch(register({
                ...values,
                role:`${props.route}`,
                profile_image:profImage
            }))
            setImgLoad(false)
        }else{
            notify(`you have to fill all fields first`,
            {appearance: 'warning',autoDismiss:"true"})
        }
    }
    const schema = () =>{
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


    return(
        <div className={classes.creationPage}>
            <div className={classes.creationCard}>
                <div className={classes.cardHead}>
                    <h2> إنشاء حساب جديد لـ<span> مؤسسة</span></h2>
                    <p>قم بملئ البيانات لانشاء حسابك.</p>
                </div>
                {
                    isError&&
                    <ErrorMsg msg={errorMsg} />
                }
                <div className={classes.cardForm}>
                    <Formik 
                        initialValues={{
                            full_name:"",
                            link:"",
                            email:"",
                            password:"",
                            phone:"",
                            birthday:'',
                            city:'',
                            address:''
                        }}
                        onSubmit={onSubmit}
                        validationSchema={schema}
                    >
                        <Form>
                            <div className={classes.addimage}>
                                <img 
                                 src={img?URL.createObjectURL(img):avatar}
                                 alt="profile" />
                                <input 
                                    type="file" id="profimg" 
                                    style={{display:"none"}}
                                    onChange={(e)=>setImg(e.target.files[0])} 
                                />
                                <label htmlFor="profimg">إدراج شعار المؤسسة</label>
                            </div>

                            <div className={classes.formItem}>
                                <label>اسم المؤسسة</label>
                                <Field type="text" name="full_name" placeholder="الاسم بالكامل…" />
                                <ErrorMessage name="full_name" component="span" />
                            </div>

                            <div className={classes.formItem}>
                                <label>رابط موقع المؤسسة</label>
                                <Field type="text" name="link" placeholder="www.organizationname.org" />
                                <ErrorMessage name="link" component="span" />
                            </div>

                            <div className={classes.formItem}>
                                <label>البريد الالكتروني</label>
                                <Field type="email" name="email" placeholder="Example@email.com" />
                                <ErrorMessage name="email" component="span" />
                            </div>

                            <div className={classes.formItem}>
                                <label>رقم الهاتف</label>
                                <Field type="text" name="phone" placeholder="- - - - - - - - - - -" />
                                <ErrorMessage name="phone" component="span" />
                            </div>

                            <div className={classes.itemCollection}>
                                <div className={classes.formItem}>
                                    <label>تاريخ الانشاء</label>
                                    <Field type="date" name="birthday"/>
                                    <ErrorMessage name="birthday" component="span" />
                                </div>

                                <div className={classes.formItem}>
                                    <label>المدينة</label>
                                    <Field type="text" name="city" placeholder="المنوفية…"/>
                                    <ErrorMessage name="city" component="span" />
                                </div>
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

                            <div className={classes.creationBtn}>
                                <button type="submit">
                                  <span>إنشاء حساب</span>
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
        </div>
    )
}
export default Organization;