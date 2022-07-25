import React, { useEffect, useState } from "react";
import { Formik, Form, Field , ErrorMessage } from 'formik';
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { imagesUpload } from "../../utils/uploadImg";
import { createCharity,clearCharityState, updateCharity } from "../../features/reducers/charitySlice";
import { CircularProgress } from "react-cssfx-loading/lib";
import ErrorMsg from "../../utils/errorMsg";
import { useNavigate,useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import classes from "./generalcreate.module.css"

const CreateCase = () =>{

    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const { addToast:notify } = useToasts()
    const[imgs,setImgs]=useState([])
    const[imgLoad,setImgLoad]=useState(false)
    const{isLoading,isError,allCharities,isSuccess,successMsg,errorMsg}=useSelector((state)=>state.charity)
    const{allParts}=useSelector((state)=>state.part)
    const{token}=useSelector((state)=>state.user)
    const currentCharity = id && allCharities.filter((x)=>x.id==id)[0]
    const [finalImgs,setFinalImgs] = useState(id?[...currentCharity.images,...imgs]:[...imgs])
    
    const onSubmit = async(values)=>{
        if(id){
            if(imgs.length){
                try {
                    setImgLoad(true)
                    let images= await imagesUpload(finalImgs.filter((x)=>typeof(x)!=="string"))
                    await dispatch(updateCharity({
                        values:{
                        ...values,
                        images:[...finalImgs.filter((x)=>typeof(x)==="string"),...images]
                        },
                        token,
                        id
                    }))
                    setImgLoad(false)
                } catch (error) {
                    setImgLoad(false)
                }
            }else{
                dispatch(updateCharity({
                    values:{
                    ...values,
                    images:[...finalImgs]
                    },
                    token,id
                }))
            }
        }else{
            if(imgs.length){
                setImgLoad(true)
                let images= await imagesUpload(imgs)
                await dispatch(createCharity({
                    values:{
                    ...values,
                    images
                    },
                    token
                }))
                setImgLoad(false)
            }else{
                notify(`you have to fill all fields first`,
                {appearance: 'warning',autoDismiss:"true"})
            }
        }
    }


    useEffect(()=>{
        dispatch(clearCharityState())
     },[dispatch])

     useEffect(()=>{
        setFinalImgs(id?[...finalImgs,...imgs]:[...imgs])
     },[imgs])

      useEffect(()=>{
          if(isSuccess){
            dispatch(clearCharityState())
            notify(`${successMsg}`,
            {appearance: 'success',autoDismiss:"true"})
            navigate('/')
          }
      },[isSuccess])

    const schema = () =>{
        const schema = Yup.object().shape({
          intro:Yup.string().min(10, 'Too Short!').required("مطلوب*"),
          description:Yup.string().min(50, 'Too Short!').required("مطلوب*"),
          type_id:Yup.number().typeError("That doesn't look like a number").required('مطلوب*'),
          value_of_need:Yup.number().typeError("That doesn't look like a number").required('مطلوب*'),
        })
        return schema
      }

     
    return(
        <div className={classes.creationPage}>
            <div className={classes.creationCard}>
                <div className={classes.cardHead}>
                    <h2>تقديم طلب مساعدة</h2>
                    <p>ادخل البيانات المطلوبة لتقديم طلب</p>
                </div>
                {
                    isError&&
                    <ErrorMsg msg={errorMsg} />
                }
                <div className={classes.cardForm}>
                    <Formik 
                        initialValues={{
                        intro:id?`${currentCharity.intro}`:"",
                        description:id?`${currentCharity.description}`:"",
                        type_id:id?`${currentCharity.type_id}`:"",
                        value_of_need:id?`${currentCharity.value_of_need}`:"",
                        }}
                        onSubmit={onSubmit}
                        validationSchema={schema}
                    >
                        <Form>
                            <div className={classes.formItem}>
                                <label>عنوان مختصر للطلب</label>
                                <Field type="text" name="intro" placeholder="وصف الطلب…" />
                                <ErrorMessage name="intro" component="span" />
                            </div>

                            <div className={classes.formItem}>
                                <label>اخبرنا المزيد عن حالتك</label>
                                <Field as="textarea" name="description" placeholder="اخبرنا المزيد…" />
                                <ErrorMessage name="description" component="span" />
                            </div>

                            <div className={classes.formItem}>
                               <label>إثبات الهوية</label>
                                <div className={classes.idImgBox}>
                                   <label htmlFor="idimgs">قم بإدراج صور هنا</label>
                                   <input 
                                      type="file" id="idimgs" 
                                      style={{display:"none"}}
                                      multiple
                                      onChange={(e)=>setImgs([...Object.values(e.target.files)])} 
                                    />
                                    {
                                        finalImgs.length>0&&
                                        <div className={classes.imgsBox}>
                                            {
                                                finalImgs.map((img,ind)=>{
                                                    return(
                                                        <div key={ind} className={classes.singleImg}>
                                                            {
                                                                typeof(img)==="string"?
                                                                <img src={`${img}`} alt="idimage"/>
                                                                :
                                                                <img src={URL.createObjectURL(img)} alt="idimage"/>
                                                            }
                                                            <span onClick={()=>setFinalImgs(finalImgs.filter((x,i)=>i!==ind))}>
                                                                <FontAwesomeIcon icon={faTimes} />
                                                            </span>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    }
                               </div>
                            </div>

                            <div className={classes.formItem}>
                                <label>نوع الحالة</label>
                                <Field name="type_id" as="select">
                                    {
                                        allParts.map((item)=>{
                                            return(
                                                <option value={item.id} key={item.id}>{item.type}</option>
                                            )
                                        })
                                    }
                                </Field>
                                <ErrorMessage name="type_id" component="span" />
                            </div>

                            <div className={classes.formItem}>
                                <label>قيمة المساعدة</label>
                                <Field type="text" name="value_of_need" placeholder="قيمة المبلغ…" />
                                <ErrorMessage name="value_of_need" component="span" />
                            </div>

                            <div className={classes.creationBtn}>
                                <button type="submit">
                                    {
                                      id?
                                      <span>تعديل</span>
                                      :
                                      <span>حفظ</span>
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
export default CreateCase;