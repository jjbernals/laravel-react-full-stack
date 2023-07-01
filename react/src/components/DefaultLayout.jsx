import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import {useEffect} from "react";
import axiosClient from "../axios-client.js";
import { RiDashboardLine, RiLogoutBoxLine, RiMenu2Fill, RiCloseFill } from "react-icons/ri";
import React, {useState} from "react";
import SideBar from "./SideBar.jsx";

export default function DefaultLayout(){
    const {user, token, setUser, setToken} = useStateContext()

    if(!token){
        return <Navigate to="/login"/>
    }


    useEffect(()=>{
        axiosClient.get('/user')
            .then(({data})=>{
                setUser(data)
            })
    }, [])

    const [sidebar, setSidebar] = useState(false);
    const handleSidebar = () =>{
        setSidebar(!sidebar);
    }

    return (
    <div className="min-h-screen grid grid-col-1 lg:grid-cols-6">
        {/* sidebar */}
            <div className={`fixed lg:static w-[80%] md:w-[40%] lg:w-full top-0 z-50 bg-white ${sidebar ? "-left-0": "-left-full"} -left-full w-full h-full overflow-y-scroll col-span-1 p-8 border-r transition-all`}>
                <SideBar/>
            </div>

        {/*Btn Mobile Menu*/}
        <button onClick={handleSidebar} className="block lg:hidden absolute bottom-4 right-4 bg-violet-500 p-2 text-white rounded-full text-2xl">
            {sidebar ? <RiCloseFill/> : <RiMenu2Fill/>}
        </button>
        {/* Content */}
        <div className="col-span-5">
            {/*Header*/}
            <header>
                {/*Search*/}
                <form>
                    <div>
                        <Outlet/>
                    </div>
                </form>
            </header>
        </div>
    </div>

    )
}
