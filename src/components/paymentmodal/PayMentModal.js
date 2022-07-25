import React, { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { CircularProgress } from "react-cssfx-loading/lib";
import ErrorMsg from "../../utils/errorMsg";
import { Formik, Form, Field } from 'formik';
import Modal from 'react-bootstrap/Modal'
import { createTransactions } from "../../features/reducers/transactionsSlice";
import classes from "../createacount/generalcreate.module.css"

const PaymentModal = ({charityId,showModal,setShowModal}) =>{

    const {isError,errorMsg,isLoading}=useSelector((state)=>state.transactions)
    const {token}=useSelector((state)=>state.user)
    const dispatch = useDispatch()

    const onSubmit = (values) =>{
        dispatch(createTransactions({values:{...values,charity_case_id:charityId},token}))
    }
    return(
        <Modal show={showModal} onHide={()=>setShowModal(false)}>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
            <div className={classes.creationPage}>
            <div className={classes.creationCard}>
                <div className={classes.cardHead}>
                    <h2>إدخال بيانات الدفع</h2>
                    <p>قم بادخال بيانات بطاقة الدفع للتبرع</p>
                </div>
                {
                    isError&&
                    <ErrorMsg msg={errorMsg} />
                }
                <div className={classes.cardForm}>
                    <Formik 
                        initialValues={{
                        cardNumbaer:"",
                        cardName:"",
                        vpn:"",
                        endDate:'',
                        amount:'',
                        }}
                        onSubmit={onSubmit}
                    >
                        <Form>
                            <div className={classes.formItem}>
                                <label>رقم بطاقة الدفع</label>
                                <Field type="text" name="cardNumbaer" placeholder="_ _ _ _ _ _ _ _ _ _ _ _. _ _ _ _" />
                            </div>

                            <div className={classes.formItem}>
                                <label>اسم صاحب البطاقة</label>
                                <Field type="text" name="cardName" placeholder="الاسم…." />
                            </div>

                            <div className={classes.formItem}>
                                <label>رمز الامان</label>
                                <Field type="text" name="vpn" placeholder="CVV" />
                            </div>

                            <div className={classes.formItem}>
                                <label>تاريخ الانتهاء</label>
                                <Field type="date" name="endDate"/>
                            </div>

                            <div className={classes.formItem}>
                                <label>مبلغ التبرع</label>
                                <Field type="text" name="amount" placeholder="EGP" />
                            </div>

                            <div className={classes.creationBtn}>
                                <button type="submit">
                                  <span>إتمام الدفع</span>
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
            </Modal.Body>
        </Modal>
    )
}
export default PaymentModal;