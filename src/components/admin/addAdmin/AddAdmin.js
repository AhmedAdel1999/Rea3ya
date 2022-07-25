import React, { useEffect, useState } from "react";
import { Formik, Form, Field , ErrorMessage } from 'formik';
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "react-cssfx-loading/lib";
import ErrorMsg from "../../../utils/errorMsg";
import classes from "../../createacount/generalcreate.module.css"
import { useNavigate, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { AddAdmins,clearAdminState, EditAdmin } from "../../../features/reducers/adminSlice";
const AddAdmin = () =>{

    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const { addToast:notify } = useToasts()
    const { isError,isSuccess,successMsg,errorMsg,isLoading,allAdmins } = useSelector((state)=>state.admin)
    const adminData = id && allAdmins.filter((x) => x.admin_id==id)[0]


    const calcDate = () =>{
        let d = new Date(adminData.birthday);
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

    const onSubmit = async(values)=>{
        if(id){
            dispatch(EditAdmin({id,values}))
        }else{
            dispatch(AddAdmins(values))
        }
    }
    
    useEffect(()=>{
        dispatch(clearAdminState())
    },[])

    useEffect(()=>{
        const fun = async () =>{
            await dispatch(clearAdminState())
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
          full_name:Yup.string().min(2, 'Too Short!').required("مطلوب*"),
          email:Yup.string().email("email must be like this example@gmail.com").required("مطلوب*"),
          password:Yup.string().min(6, 'Too Short!').required("مطلوب*"),
          phone:Yup.number().typeError('you must specify a number').min(8, 'Min value 0.').required("مطلوب*"),
          birthday: Yup.date().required('مطلوب*').nullable().default(undefined),
          address:Yup.string().min(2, 'Too Short!').required("مطلوب*"),
        })
        return schema
      }


    return(
        <div className={classes.creationPage}>
            <div className={classes.creationCard}>
                <div className={classes.cardHead}>
                    <h2>إضافة مستخدم جديد</h2>
                    <p>قم بملئ البيانات لاضافة مستخدم جديد.</p>
                </div>
               {
                isError &&
                <ErrorMsg msg={errorMsg} />
               }
                <div className={classes.cardForm}>
                    <Formik 
                        initialValues={{
                        full_name:id?adminData.full_name:"",
                        email:id?adminData.email:"",
                        password:"",
                        phone:id?adminData.phone:"",
                        birthday:id?calcDate():"",
                        address:id?adminData.address:""
                    }}
                        onSubmit={onSubmit}
                        validationSchema={schema}
                    >
                        <Form>
                            <div className={classes.formItem}>
                                <label>الاسم</label>
                                <Field type="text" name="full_name" placeholder="الاسم بالكامل…" />
                                <ErrorMessage name="full_name" component="span" />
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

                            <div className={classes.formItem}>
                                <label>تاريخ الميلاد</label>
                                <Field type="date" name="birthday"/>
                                <ErrorMessage name="birthday" component="span" />
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
                                {
                                    id?
                                    <span>تعديل مستخدم</span>
                                    :
                                    <span>إضافة مستخدم</span>
                                }
                                  
                                  {
                                    isLoading&&
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
export default AddAdmin;