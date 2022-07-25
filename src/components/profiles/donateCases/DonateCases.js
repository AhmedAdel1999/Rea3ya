import React, { useEffect } from "react";
import { Link } from "react-router-dom"
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from "react-redux";
import { getAllTransactions } from "../../../features/reducers/transactionsSlice";
import classes from "./donatecase.module.css"
const DonateCases = () =>{

    const dispatch = useDispatch();
    const { userData,role } = useSelector((state)=>state.user)
    const { allParts } = useSelector((state)=>state.part)
    const { allCharities } = useSelector((state)=>state.charity)
    const { allTransactions } = useSelector((state)=>state.transactions)
    const allDonation = (role==="admin" || role==="super_admin")?allTransactions:allTransactions.filter((x)=>x.volanteer_id==userData.id)
    
    console.log(allParts)
    console.log(allCharities)

    const getDonateType = (id) =>{
        let type
        let val

        allCharities.forEach(ele => {
            if(ele.id==id){
                type=ele.type_id
            }
        });

        allParts.forEach((ele)=>{
            if(ele.id==type){
                val=ele.type
            }
        })
        return val;
    }

    useEffect(()=>{
      dispatch(getAllTransactions())
    },[])
    return(
        <div className={classes.DonateCases}>
           <h2>جميع حالات التبرع.</h2>
           <p>يمكنك التبرع و مساعدة المحتاجين من خلال الموقع بكل سهولة.</p>
           {
            allDonation.length?
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>قيمة التبرع</th>
                        <th>نوع الحالة</th>
                        <th>عرض الحالة</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allDonation.map((item,ind)=>{
                            if(item.charity_case_id){
                                return(
                                    <tr key={item.id}>
                                        
                                        <td>{ind+1}</td>
                                        <td>EGP {item.amount}</td>
                                        <td>{getDonateType(item.charity_case_id)}</td>
                                        <td>
                                            <Link to={`/helpcases/${item.charity_case_id}`}>الذهاب للحالة</Link>
                                        </td>
                                    </tr>
                                )
                            }
                        })
                    }
                </tbody>
            </Table>            
            :
            null
           }
        </div>
    )
}
export default DonateCases;