import React,{useEffect} from "react";
import Fade from 'react-reveal/Fade';
import { useDispatch, useSelector } from "react-redux";
import { AllOFParts } from "../../features/reducers/partSlice";
import { AllCharities } from "../../features/reducers/charitySlice";
import classes from "./alldepartments.module.css"
const AllDepartments = () =>{

    const dispatch = useDispatch()
    const{allParts} = useSelector((state)=>state.part)
    const{allCharities} = useSelector((state)=>state.charity)

    useEffect(()=>{
        const fun = async ()=>{
           await dispatch(AllOFParts())
           await dispatch(AllCharities())
        }
        fun()
    },[])

    const getNumberOfCases = (id) =>{
       let num=0
       allCharities.forEach(ele => {
          if(ele.type_id==id){
            num+=1
          }
       });
       return num
    }
    return(
        <div className={classes.AllDepartments} id="departments">
            <Fade right>
                <h2>تصفح الحالات حسب القسم</h2>
                <p>يمكنك التبرع و مساعدة المحتاجين من خلال الموقع بكل سهولة.</p>
            </Fade>
            <div className={classes.departsSections}>
                {
                    allParts.map((item,ind)=>{
                        return(
                            <Fade key={item.id} right={(ind%2)==0?true:false} left={(ind%2)!=0?true:false}>
                                <div className={classes.partItem}>
                                    <img src={item.image} alt="" />
                                    <div className={classes.partDetails}>
                                        <span>{item.type}</span>
                                        <span>{getNumberOfCases(item.id)} حالة</span>
                                    </div>
                                </div>
                            </Fade>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default React.memo(AllDepartments);