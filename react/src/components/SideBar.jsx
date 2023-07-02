import {Link} from "react-router-dom";

import { RiDashboardLine, RiLogoutBoxLine,  } from "react-icons/ri";
import React, {useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";


const SideBar = () => {
    const {user, token, setUser, setToken} = useStateContext()
    const onLogout = (ev) => {
        ev.preventDefault()

        axiosClient.post('/logout')
            .then(()=>{
                setUser({})
                setToken(null)
            })
    }


    return(
        <div>
            <div className={`fixed lg:static w-[69%] lg:w-full top-0 z-50 bg-white ${sidebar ? "-left-0": "-left-full"} w-full h-full overflow-y-scroll col-span-1 p-8 border-r transition-all`}>
                <div className="text-center p-8">
                    <h1 className="uppercase font-bold tracking-[4px]"> {user.name}  </h1>
                </div>

                <div className="flex flex-col justify-between h-[800px]">
                    <nav>
                        <ul>
                            <li>
                                <Link to="/dashboard" className="flex items-center gap-4 hover:bg-violet-500 p-4 text-gray-400 hover:text-white rounded-lg transition-colors font-semibold">
                                    <RiDashboardLine/>
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link to="/user" className="flex items-center gap-4 hover:bg-violet-500 p-4 text-gray-400 hover:text-white rounded-lg transition-colors font-semibold">
                                    <RiDashboardLine/>
                                    User
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

        </div>

    );
};


export default SideBar;
