import React from "react";
import ContactUs from "../contactus/ContactUs";
import Footer from "../footer/Footer";
import HowToUse from "../howtouse/HowToUse";
const HowToUsePage = () =>{
    return(
        <React.Fragment>
            <HowToUse />
            <ContactUs />
            <Footer />
        </React.Fragment>

    )
}
export default HowToUsePage