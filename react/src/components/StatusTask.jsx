import React, {useEffect, useState} from "react";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const StatusTask = () => {
    const navigate = useNavigate()
    const {user} = useStateContext()
    const status = useParams()


    useEffect(() => {
        getTask()
    }, [])


    const getTask = async () => {
        if(status.status==="Asignado"){
            await axios.put('http://localhost:8000/api/task/'+status.id+'/Progeso')
        }
        else if(status.rol === "Administrador"){
            await axios.put('http://localhost:8000/api/task/'+status.id+'/Terminado')
        }
        if(status.status ==="Terminado"){
            alert('La tarea ya esta finalizada')
    }
        navigate('/tasks')
    }

}

export default StatusTask
