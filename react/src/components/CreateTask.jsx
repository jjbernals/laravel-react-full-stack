import axios from "axios";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";

const CreateTask = () =>{
    const {user} = useStateContext()
    const [name, setName] = useState('')
    const [endDate, setEndDate] = useState('')
    const [idUser, setIdUser] = useState('')
    const [description, setDescription] = useState('')
    const fd = new FormData();
    const navigate = useNavigate()

    const newTask = async (e) => {
        e.preventDefault()
        await axios.post('http://localhost:8000/api/task', {name: name, idUser: idUser, description: description, endDate: endDate, idTeam: user.idTeam})
        navigate('/tasks')
    }

    return(
        <div className="rounded m-5  lg:w-[490%]">

            <div className="w-full flex items-center justify-center">
                <div className="mt-20 bg-white px-24 py-32 rounded-3xl border-2">
                    <form onSubmit={newTask}>
                        <h1 className="text-5xl font-semibold">Agrega una nueva tarea a tu equipo {fd.urlFile}</h1>
                        <p className="font-medium text-large text-gray-500 mt-4">Ingresa el nombre del compromiso tributario</p>
                        <div className="mt-6">
                            <div>
                                <label className="text-lg font-medium">Nombre de la tarea</label>
                                <input value={name} onChange={(e) => setName(e.target.value)} className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent" size="50" placeholder="Nombre"/>
                            </div>
                            <div>
                                <label className="text-lg font-medium">A quien vas a asignar esta tarea</label>
                                <input value={idUser} onChange={(e) => setIdUser(e.target.value)} className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent" size="50" placeholder="Correo electronico"/>
                            </div>
                            <div>
                                <label className="text-lg font-medium">Descripcion de la tarea</label>
                                <input value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent" size="50" placeholder="Nombre"/>
                            </div>
                            <div className="mt-3">
                                <label className="text-lg font-medium">Fecha maxima de cumplimiento</label>
                                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-[20%] ml-3 border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent" size="50" placeholder="Fecha maxima"/>
                            </div>
                            <div className="mt-7 flex flex-col gap-y-4">
                                <button className="active:scale-[.98] active: duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-violet-500 text-white text-lg font-bold">Asignar Tarea</button>
                            </div>
                            <div className="w-full flex items-center justify-center relative py-2">
                                <div className="mt-4 w-full h-[1px] bg-black"></div>
                            </div>
                        </div>
                        <div className="mt-5 justify-center items-center">
                            <p className="font-medium text-base text-base">
                                Añade gente a tu equipo para completar los compromisos
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateTask
