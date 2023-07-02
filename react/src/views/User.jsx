import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";
import {RiTeamFill} from "react-icons/ri";
import {useStateContext} from "../contexts/ContextProvider.jsx";


export default function User(){
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const {user} = useStateContext()

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = () => {
        setLoading(true);
        axiosClient.get('/users/'+user.idTeam)
            .then(({data}) => {
                setLoading(false);
                setUsers(data.data);
            })
            .catch(() => {
                setLoading(false)
            })
    }

    const verifyStatus = (u) => {
        var date = new Date()
        var dateUser = new Date(u)
        var diferrence = dateUser.getDate()-date.getDate()
        var message = "Inactivo"

        if(diferrence>27){
            message = "Activo recientemente"
            return message
        }
        return message
    }

    return (
        <div className="bg-gray-100  rounded border-2 m-5  lg:w-[490%] ">
            <div className="text-3xl p-2 mt-10 mb-1 font-semibold flex items-center justify-center">
                    Mi Equipo de Trabajo
            </div>
            <div className=" flex items-center justify-center relative py-2 m-8">
                <div className="mt-4 w-full h-[1px] bg-black"></div>
            </div>

            <div>
                    {users.map(u =>(
                        <div className="m-8 bg-white rounded-2xl p-8 flex flex-col md:flex-row gap-8 shadow-lg">
                        {/*Icon*/}
                    <div className="w-full md:w-[10%] flex items-center justify-center">
                        <RiTeamFill className="text-7xl bg-purple-100 text-purple-600 p-4 rounded-md"/>
                    </div>
                    {/*Title*/}
                    <div className="w-full md:w-[70%]">
                        <h1 className="text-xl flex items-center gap-4 mb-2">{u.name}
                            <span className={`text-xs py-1 px-2 -100 bg- text-white font-bold`}>aaa</span>
                        </h1>
                        <p className="text-gray-500">{u.email}</p>
                    </div>
                    {/* Time */}
                    <div className="w-full md:w-[20%]">
                        <h3 className="text-xl text-gray-500 mb-2">{verifyStatus(u.created_at)}</h3>
                        <p className="text-gray-500">{u.created_at}</p>
                    </div>
                </div>
                    ))}
            </div>
        </div>
    )
}
