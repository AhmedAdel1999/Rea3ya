import React from "react";
import CommonQues from "../commonques/CommonQues";
import ContactUs from "../contactus/ContactUs";
import Footer from "../footer/Footer";
import HowToUse from "../howtouse/HowToUse";
const HomeUser = () =>{
    return(
        <div>
            <HowToUse />
            <CommonQues />
            <ContactUs />
            <Footer />
        </div>
    )
}
export default HomeUser;