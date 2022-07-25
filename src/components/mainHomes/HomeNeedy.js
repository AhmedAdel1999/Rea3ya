import React, { useEffect, useLayoutEffect } from "react";
import ContactUs from "../contactus/ContactUs";
import Footer from "../footer/Footer";
import HowToUse from "../howtouse/HowToUse";
import CommonQues from "../commonques/CommonQues"
const HomeNeedy = () =>{
    return(
        <div>
            <HowToUse />
            <CommonQues />
            <ContactUs />
            <Footer />
        </div>
    )
}
export default HomeNeedy;