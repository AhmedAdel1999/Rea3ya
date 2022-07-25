import React from "react"
import { useSelector } from 'react-redux';
import AllNeedyCases from "../../allNeedyCases/AllNeedyCases";
const HelpCases = () =>{
    const { allCharities } = useSelector((state)=>state.charity)
    const { userData,role } = useSelector((state)=>state.user)
    let userCharities = (role==="admin" || role==="super_admin")?allCharities:allCharities.filter((x)=>x.needy_id==userData.id)
    
    return(
        <React.Fragment>
            <AllNeedyCases userCharities={userCharities} />
        </React.Fragment>
    )
}
export default HelpCases