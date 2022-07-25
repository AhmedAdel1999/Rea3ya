import React from "react";
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGrip,faComputerMouse,faArrowUpRightFromSquare,faCoins } from "@fortawesome/free-solid-svg-icons";
import classes from "./howtouse.module.css"
const HowToUse = () =>{
    return(
        <div className={classes.howtouse} id="howtouse">
            <Fade right>
                <h2>كيف تستخدم موقع رعاية ؟</h2>
                <p>يمكنك التبرع و مساعدة المحتاجين من خلال الموقع بكل سهولة.</p>
            </Fade>
            <div className={classes.htuSections}>
                <Zoom>
                    <div className={classes.htuSecItem}>
                        <div><FontAwesomeIcon icon={faGrip} /></div>
                        <h2>١.اختر نوع الحالات من الاقسام</h2>
                        <p>
                        يمكنك التبرع و مساعدة المحتاجين من خلال الموقع بكل سهولة.
                        </p>
                    </div>
                </Zoom>
                <Zoom>
                    <div className={classes.htuSecItem}>
                        <div><FontAwesomeIcon icon={faArrowUpRightFromSquare} /></div>
                        <h2>٢.اختر الحالة التي تريد مساعدتها</h2>
                        <p>
                        يمكنك التبرع و مساعدة المحتاجين من خلال الموقع بكل سهولة.
                        </p>
                    </div>
                </Zoom>
                <Zoom>
                    <div className={classes.htuSecItem}>
                        <div><FontAwesomeIcon icon={faComputerMouse} /></div>
                        <h2>٣.تصفح تفاصيل الحالة للتأكد</h2>
                        <p>
                        يمكنك التبرع و مساعدة المحتاجين من خلال الموقع بكل سهولة.
                        </p>
                    </div>
                </Zoom>
                <Zoom>
                    <div className={classes.htuSecItem}>
                        <div><FontAwesomeIcon icon={faCoins} /></div>
                        <h2>٤.الدفع لمساعدة الحالة</h2>
                        <p>
                        يمكنك التبرع و مساعدة المحتاجين من خلال الموقع بكل سهولة.
                        </p>
                    </div>
                </Zoom>
            </div>
        </div>
    )
}
export default HowToUse;