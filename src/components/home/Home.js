import React from "react";
import AllDepartments from "../allDepartments/AllDepartmenst";
import AllNeedyCases from "../allNeedyCases/AllNeedyCases";
import ContactUs from "../contactus/ContactUs";
import Footer from "../footer/Footer";
import HowToUse from "../howtouse/HowToUse";
import Fade from 'react-reveal/Fade';
import Bounce from 'react-reveal/Bounce'
import AnimatedText from 'react-animated-text-content';
import classes from "./home.module.css"

const Home = () =>{

    const handelToggle = (e) => {
        e.preventDefault();
        const target = e.target.getAttribute('href')
        const location = document.querySelector(target).offsetTop
        let app = document.getElementById("App")
        app.scrollTo({
            left:0,
            top: location - 80,
        })
    }
    return(
        <div className="home-page">
            <div className={classes.homeHeader} id="home">
                <div className={classes.headContent}>
                    <Fade top>
                    <h2>أهلاً بكم في موقع رعاية</h2>
                    </Fade>
                    <AnimatedText
                        type="words" // animate words or chars
                        animation={{
                            x: '200px',
                            y: '-20px',
                            scale: 1.1,
                            ease: 'ease-in-out',
                        }}
                        animationType="float"
                        interval={0.01}
                        duration={0.8}
                        tag="p"
                        className="animated-paragraph"
                        includeWhiteSpaces
                        threshold={0.1}
                        rootMargin="20%"
                        >
                            قناة آمنة للتبرع لمشاريع البر الخيرية المختلفة،
                            ويستفيد منه أكثر من 32000 أسرة محتاجة مابين أيتام وأرامل وفقراء 
                            ، من خلال الزكوات والصدقات والوقف الخيري
                    </AnimatedText>

                    <div className={classes.headroutes}>
                        <Bounce right>
                        <a onClick={handelToggle} href="#needycases">تبرع الآن</a>
                        </Bounce>
                        <Bounce left>
                        <a onClick={handelToggle} href="#howtouse">معرفة المزيد!</a>
                        </Bounce>
                    </div>
                </div>
            </div>
            <HowToUse />
            <AllDepartments />
            <AllNeedyCases />
            <ContactUs />
            <Footer />
        </div>
    )
}
export default Home;