import React, {useEffect, useState} from "react";
import {RxPlus} from "react-icons/rx";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import axiosClient from "../axios-client.js";
import {RiFolderUploadLine, RiTeamFill} from "react-icons/ri";
import UploadFile from "./UploadFile.jsx";

const Task = () =>{
    const [task, setTask] = useState([]);
    const {user} = useStateContext()
    const navigate = useNavigate()


    useEffect(() => {
        getTask()
    }, [])


    const getTask = async () => {
        const response = await axios.get('http://localhost:8000/api/task/' + user.id)
        setTask(response.data)
    }

    const store = async (e) =>{
        if(user.rol =="Administrador"){
            navigate('/newTask')
        }else{
            alert('No tienes permisos para asignar una tarea')
            navigate('/')
        }

    }



return(
    <div className="bg-gray-100  rounded border-2 m-5  lg:w-[490%] ">
        <div className="text-3xl mt-10 mb-1 font-semibold flex items-center justify-center">
            <h1 className="text-5xl font-semibold bg-purple-100 text-black rounded-l-full p-14 border-r transition-all">
                Mis tareas y asignaciones
            </h1>
        </div>

        <div className=" flex items-center justify-center relative py-2 m-8">
            <div className="mt-4 w-full h-[1px] bg-black"></div>
        </div>
        <div>
            {task.map(u =>(
                <div className="m-8 bg-white rounded-2xl p-8 flex flex-col md:flex-row gap-8 shadow-lg">
                    {/*Icon*/}
                    <div className="w-full md:w-[10%] flex items-center justify-center">
                        <RiTeamFill className="text-7xl bg-purple-100 text-purple-600 p-4 rounded-md"/>
                    </div>
                    {/*Title*/}
                    <div className="w-full md:w-[70%]">
                        <h1 className="text-xl flex items-center gap-4 mb-2">{u.name}
                            <span className="text-xs py-1 px-2 -100 bg-green-500 text-white rounded font-bold">{u.status}</span>
                            <Link to={`/status/${u.id}/${u.status}/${user.rol}`} className="text-xs py-1 px-2 -100 bg-purple-500 text-white rounded font-bold">Actualizar estado</Link>
                            <span className="text-2xl py-1 px-2 -100 rounded font-bold"><Link to={`/upload/${u.id}`}><RiFolderUploadLine/></Link></span>
                        </h1>
                        <p className="text-gray-500">{u.description}</p>
                    </div>
                    {/* Time */}
                    <div className="w-full md:w-[20%]">
                        <h3 className="text-xl text-gray-500 mb-2">Fecha limite</h3>
                        <p className="text-gray-500">{u.endDate}</p>
                    </div>
                </div>
            ))}
        </div>
        <form onSubmit={store}>
            <div className="m-8 w-[40%] md:w-[15%] bg-white rounded-2xl p-8 flex flex-col md:flex-row gap-8 shadow-lg">
                {/*Icon*/}

                <div className="w-[100%] flex items-center justify-center ">
                    <button>
                        <RxPlus className="active:scale-[.98] active: duration-75 hover:scale-[1.1] ease-in-out transition-all text-7xl bg-purple-100 text-purple-600 p-4 rounded-md"/>
                    </button>
                    <div className="w-full md:w-[70%]">
                        <h1 className="text-xl flex items-center p-4 gap-4 mb-2">
                            Nueva Tarea
                        </h1>
                    </div>
                </div>
            </div>
        </form>
    </div>
)
}

export default Task
