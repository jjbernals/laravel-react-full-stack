import axios from "axios";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";


const Team = () => {
    const [name, setName] = useState('')
    const navigate = useNavigate()
    const store = async (e) =>{
        e.preventDefault()
        await axios.post('http://localhost:8000/api/team', {name : name})
        navigate('/user')
    }

    return(
        <div className="rounded m-5  lg:w-[490%]">

            <div className="w-full flex items-center justify-center">
                <div className="mt-20 bg-white px-24 py-32 rounded-3xl border-2">
                    <form onSubmit={store}>
                        <h1 className="text-5xl font-semibold">Crea un nuevo equipo</h1>
                        <p className="font-medium text-large text-gray-500 mt-4">Ingresa el nombre del equipo</p>

                        <div className="mt-6">
                            <div>
                                <label className="text-lg font-medium">Nombre del equipo</label>
                                <input className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent" size="50" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre del equipo"/>
                            </div>

                            <div className="mt-7 flex flex-col gap-y-4">
                                <button className="active:scale-[.98] active: duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-violet-500 text-white text-lg font-bold">Crear equipo</button>
                            </div>
                            <div className="w-full flex items-center justify-center relative py-2">
                                <div className="mt-4 w-full h-[1px] bg-black"></div>
                            </div>
                        </div>
                        <div className="mt-5 justify-center items-center">
                            <p className="font-medium text-base text-base">
                                Los equipos son la mejor forma de organizar las tareas
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Team
