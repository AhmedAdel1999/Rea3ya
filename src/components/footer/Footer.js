import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import logo from "../../assets/Logo.png"
import classes from "./footer.module.css"
const Footer = () =>{
    return(
        <div className={classes.MainFooter}>
            <div className={classes.footContent}>
                <div className={classes.footText}>
                    <img alt="logo" src={logo} />
                    <p>
                        لوريم ايبسوم هو نموذج افتراضي يوضع في التصاميم
                        لتعرض على العميل ليتصور طريقه وضع النصوص بالتصاميم سواء
                        كانت تصاميم مطبوعه … بروشور او فلاير على سبيل المثال.
                    </p>
                </div>
                <div className={classes.footCategory}>
                    <h3>أقسام الموقع</h3>
                    <ul>
                        <li>الرئيسية</li>
                        <li>تواصل معنا</li>
                        <li>حالات المساعدة</li>
                        <li>الاقسام</li>
                        <li>كيفية الاستخدام</li>
                    </ul>
                </div>
                <div className={classes.footCategory}>
                    <h3>روابط إضافية</h3>
                    <ul>
                        <li>شروط الاستخدام</li>
                        <li>الخصوصية</li>
                        <li>الاحكام و الشروط</li>
                    </ul>
                </div>
            </div>
            <div className={classes.footer}>
                <p>©2022 كافة الحقوق محفوظة لـ مؤسسة رعاية.</p>
                <ul>
                    <li><FontAwesomeIcon icon={faInstagram} /></li>
                    <li><FontAwesomeIcon icon={faFacebook} /></li>
                    <li><FontAwesomeIcon icon={faTwitter} /></li>
                </ul>
            </div>
        </div>
    )
}
export default Footer;