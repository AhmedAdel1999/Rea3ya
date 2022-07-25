import React, { useEffect } from "react";
import { Formik, Form, Field , ErrorMessage } from 'formik';
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { clearUserState, login } from "../../features/reducers/userSlice";
import { CircularProgress } from "react-cssfx-loading/lib";
import { Link, useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import ErrorMsg from "../../utils/errorMsg";
import classes from "../createacount/generalcreate.module.css"


const Login = () =>{
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const { addToast:notify } = useToasts()
    const{isLoading,isError,isSuccess,successMsg,errorMsg}=useSelector((state)=>state.user)

    const onSubmit = async(values)=>{
        dispatch(login(values))        
    }


    const schema = () =>{
        const schema = Yup.object().shape({
          email:Yup.string().email("email must be like this example@gmail.com").required("مطلوب*"),
          password:Yup.string().min(6, 'Too Short!').required("مطلوب*"),
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
                    <h2>تسجيل الدخول</h2>
                    <p>قم بملئ البينات للمتابعة.</p>
                </div>
                {
                    isError&&
                    <ErrorMsg msg={errorMsg} />
                }
                <div className={classes.cardForm}>
                    <Formik 
                        initialValues={{
                        email:"",
                        password:"",
                        }}
                        onSubmit={onSubmit}
                        validationSchema={schema}
                    >
                        <Form>
                            <div className={classes.formItem}>
                                <label>البريد الالكتروني</label>
                                <Field type="email" name="email" placeholder="Example@email.com" />
                                <ErrorMessage name="email" component="span" />
                            </div>

                            <div className={classes.formItem}>
                                <label>كلمة المرور</label>
                                <Field type="password" name="password" placeholder="**********" />
                                <ErrorMessage name="password" component="span" />
                            </div>

                            <div className={classes.creationBtn}>
                                <button type="submit">
                                  <span>تسجيل الدخول</span>
                                  {
                                    isLoading&&
                                    <CircularProgress width="25px" height="25px" duration="1s" />
                                  }
                                </button>
                                <Link to={`/login/forgetpassword`}>نسيت كلمة المرور؟</Link>
                            </div>
                        </Form>
                    </Formik>
                </div>
    
            </div>
        </div>
    )
}
export default Login;