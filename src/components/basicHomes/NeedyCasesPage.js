import React from "react";
import AllNeedyCases from "../allNeedyCases/AllNeedyCases";
import ContactUs from "../contactus/ContactUs";
import Footer from "../footer/Footer";
const NeedyCasePage = () =>{
    return(
        <React.Fragment>
           <AllNeedyCases />
           <ContactUs />
           <Footer />
        </React.Fragment>
    )
}
export default NeedyCasePage