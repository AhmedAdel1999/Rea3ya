import React, { useEffect, useState } from "react";
import { Formik, Form, Field , ErrorMessage } from 'formik';
import * as Yup from "yup";
import { CircularProgress } from "react-cssfx-loading/lib";
import classes from "../createacount/generalcreate.module.css"


const ForgetPassword = () =>{
    
    const onSubmit = async(values)=>{
        
    }

    const schema = () =>{
        const schema = Yup.object().shape({
          email:Yup.string().email("email must be like this example@gmail.com").required("مطلوب*"),
        })
        return schema
      }

    return(
        <div className={classes.creationPage}>
            <div className={classes.creationCard}>
                <div className={classes.cardHead}>
                    <h2>إعادة تعيين كلمة المرور</h2>
                    <p>قم بإدخال بريدك الالكتروني لارسال رابط اعادة التعيين.</p>
                </div>
                <div className={classes.cardForm}>
                    <Formik 
                        initialValues={{
                        email:"",
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

                            <div className={classes.creationBtn}>
                                <button type="submit">
                                  <span>متابعة</span>
                                  <CircularProgress width="25px" height="25px" duration="1s" />
                                </button>
                            </div>
                        </Form>
                    </Formik>
                </div>
    
            </div>
        </div>
    )
}
export default ForgetPassword;