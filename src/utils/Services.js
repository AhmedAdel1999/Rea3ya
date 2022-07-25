import MainAdmin from "../components/admin/mainadmin/MainAdmin";
import MainParts from "../components/admin/mainparts/MainParts";
import HomeNeedy from "../components/mainHomes/HomeNeedy";
import HomeOrganization from "../components/mainHomes/HomeOrganization";
import HomeUser from "../components/mainHomes/HomeUser";
import HomeVolunteer from "../components/mainHomes/HomeVolunteer";

const kindofuser = (role) =>{
    if(role==="needy"){
        return <HomeNeedy />
    }
    else if(role==="user"){
        return <HomeUser />
    }
    else if(role==="organization"){
        return <HomeOrganization />
    }
    else if(role==="volunteer"){
        return <HomeVolunteer />
    }
    else if(role==="super_admin"){
        return <MainAdmin />
    }
    else if(role==="admin"){
        return <MainParts />
    }
}
export default kindofuser