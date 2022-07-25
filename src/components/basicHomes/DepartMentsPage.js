import React from "react";
import AllDepartmenst from "../allDepartments/AllDepartmenst";
import ContactUs from "../contactus/ContactUs";
import Footer from "../footer/Footer";
const DepartMentsPage = () =>{
    return(
        <React.Fragment>
            <AllDepartmenst />
            <ContactUs />
            <Footer />
        </React.Fragment>

    )
}
export default DepartMentsPage