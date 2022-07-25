import React, { useEffect, useState } from "react";
import { Formik, Form, Field , ErrorMessage } from 'formik';
import * as Yup from "yup";
import { CircularProgress } from "react-cssfx-loading/lib";
import classes from "../createacount/generalcreate.module.css"


const ResetPassword = () =>{
    
    const onSubmit = async(values)=>{
        
    }

    const schema = () =>{
        const schema = Yup.object().shape({
            password:Yup.string().min(6, 'Too Short!').required("مطلوب*"),
            repassword:Yup.string().min(6, 'Too Short!').required("مطلوب*"),
        })
        return schema
    }

    return(
        <div className={classes.creationPage}>
            <div className={classes.creationCard}>
                <div className={classes.cardHead}>
                    <h2>إعادة تعيين كلمة المرور</h2>
                    <p>قم بانشاء كلمة سر جديدة</p>
                </div>
                <div className={classes.cardForm}>
                    <Formik 
                        initialValues={{
                          repassword:"",
                        }}
                        onSubmit={onSubmit}
                        validationSchema={schema}
                    >
                        <Form>

                            <div className={classes.formItem}>
                                <label>كلمة المرور الجديدة</label>
                                <Field type="password" name="password" placeholder="**********" />
                                <ErrorMessage name="password" component="span" />
                            </div>

                            <div className={classes.formItem}>
                                <label>تأكيد كلمة المرور</label>
                                <Field type="password" name="repassword" placeholder="**********" />
                                <ErrorMessage name="repassword" component="span" />
                            </div>

                            <div className={classes.creationBtn}>
                                <button type="submit">
                                  <span>تأكيد</span>
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
export default ResetPassword;