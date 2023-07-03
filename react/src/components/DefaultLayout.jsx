import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import {useEffect} from "react";
import axiosClient from "../axios-client.js";
import {RiDashboardLine, RiLogoutBoxLine, RiMenu2Fill, RiCloseFill, RiGroupLine} from "react-icons/ri";
import React, {useState} from "react";
import SideBar from "./SideBar.jsx";
import {RxPlus} from "react-icons/rx";

export default function DefaultLayout(){
    const {user, token, setUser, setToken} = useStateContext()

    if(!token){
        return <Navigate to="/login"/>
    }
    const onLogout = (ev) => {
        ev.preventDefault()

        axiosClient.post('/logout')
            .then(()=>{
                setUser({})
                setToken(null)
            })
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
            <div className={`fixed lg:static w-[71%] lg:w-full top-0 z-50 bg-white ${sidebar ? "-left-0": "-left-full"} w-full h-full overflow-y-scroll col-span-1 p-8 border-r transition-all`}>
                <div className="text-center p-8 bg-purple-100 rounded-b-full ">
                    <h1 className="uppercase font-bold tracking-[4px]"> {user.name}  </h1>
                </div>

                <div className="flex flex-col justify-between h-[800px] mt-2">
                    <nav>
                        <ul>
                            <li>
                                <Link to="/user" className="flex items-center gap-4 hover:bg-violet-500 p-4 text-gray-400 hover:text-white rounded-lg transition-colors font-semibold">
                                    <RiGroupLine/>
                                    Mi equipo de trabajo
                                </Link>
                            </li>
                            <li>
                                <Link to="/tasks" className="flex items-center gap-4 hover:bg-violet-500 p-4 text-gray-400 hover:text-white rounded-lg transition-colors font-semibold">
                                    <RiDashboardLine/>
                                    Mis tareas y asignaciones
                                </Link>
                            </li>
                            <li>
                                <Link to="/team" className="flex items-center gap-4 hover:bg-violet-500 p-4 text-gray-400 hover:text-white rounded-lg transition-colors font-semibold">
                                    <RxPlus/>
                                    Crear nuevo equipo
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="flex flex-col gap-4">
                        <a href="#" className="flex items-center gap-4 hover:bg-violet-500 p-4 text-gray-400 hover:text-white rounded-lg transition-colors font-semibold" onClick={onLogout}>
                            <RiLogoutBoxLine/>
                            Cerrar Sesion
                        </a>
                    </div>
                </div>
            </div>

        {/*Btn Mobile Menu*/}
        <button onClick={handleSidebar} className="block lg:hidden absolute bottom-4 right-4 bg-violet-500 p-2 text-white rounded-full text-2xl">
            {sidebar ? <RiCloseFill/> : <RiMenu2Fill/>}
        </button>
        {/* Content */}
        <div>
            {/*Header*/}
                {/*Search*/}
                    <div>
                        <Outlet/>
                    </div>
        </div>
    </div>

    )
}
