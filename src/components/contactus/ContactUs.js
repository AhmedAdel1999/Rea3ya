import React from "react";
import Fade from 'react-reveal/Fade';
import classes from "./contactus.module.css"
const ContactUs = () =>{
    return(
        <div className={classes.contactusSec} id="contactus">
                <Fade right>
                    <h2>تواصل معنا</h2>
                    <p>يمكنك التبرع و مساعدة المحتاجين من خلال الموقع بكل سهولة.</p>
                </Fade>
                <Fade top>
                    <form className={classes.contactForm}>
                        <div>
                            <label>الاسم</label>
                            <input type="text" placeholder="الاسم بالكامل…" />
                        </div>
                        <div>
                            <label>البريد الالكتروني</label>
                            <input type="email" placeholder="Example@email.com" />
                        </div>
                        <div>
                            <label>رسالتك</label>
                            <textarea type="text" placeholder="اترك رسالتك هنا…" />
                        </div>
                        <button type="submit">إرسال</button>
                    </form>
                </Fade>
            </div>
    )
}
export default ContactUs;