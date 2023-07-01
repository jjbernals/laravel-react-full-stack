import {Link} from "react-router-dom";
import {useRef, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";

export default function Login(){

    const passwordRef = useRef();
    const emailRef = useRef();
    const {setUser, setToken} = useStateContext()
    const [errors, setErrors] = useState(null);

    const onSubmit = (ev) =>{
        ev.preventDefault()
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        axiosClient.post('/login', payload)
            .then(({data})=>{
                setUser(data.user)
                setToken(data.token)
            })
            .catch(err =>{
                const response = err.response;
                if(response && response.status === 422){
                    if(response.data.errors){
                        setErrors(response.data.errors)
                    }else {
                        setErrors({
                            email: [response.data.message]
                        })
                    }
                }
            })
    }
    return (
    <div className="flex w-full h-screen">
        <div className="w-full flex items-center justify-center lg:w-1/2">
            <div className="bg-white px-24 py-32 rounded-3xl border-2">
            <form onSubmit={onSubmit}>
                <h1 className="text-5xl font-semibold">Inicia Sesion</h1>
                <p className="font-medium text-large text-gray-500 mt-4">Ingresa tus datos</p>
                <h1>
                    {errors && <div className="mt-2 flex items-center bg-violet-500 text-white text-sm font-bold px-4 py-3" role="alert">
                        <p>Correo o contraseña incorrectos</p>
                    </div>}
                </h1>
                <div className="mt-6">
                    <div>
                        <label className="text-lg font-medium">Correo electronico</label>
                        <input className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent" size="50"  ref={emailRef} type="email" placeholder="Correo electronico"/>
                    </div>
                    <div className="mt-4">
                        <label className="text-lg font-medium ">Contraseña</label>
                        <input className="w-full border-2 border-gray-100 rounded-xl p-4 mt-2 bg-transparent" ref={passwordRef} type="password" placeholder="Contraseña"/>
                    </div>

                    <div className="mt-7 flex flex-col gap-y-4">
                        <button className="active:scale-[.98] active: duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-violet-500 text-white text-lg font-bold">Inicia Sesion</button>
                    </div>
                    <div className="w-full flex items-center justify-center relative py-2">
                        <div className="mt-4 w-full h-[1px] bg-black"></div>
                    </div>
                </div>
                <div className="mt-5 justify-center items-center">
                    <p className="font-medium text-base text-base">
                        ¿No estas registrado? <Link className="text-violet-500 text-base font-medium ml-2" to="/signup">Crea una cuenta</Link>
                    </p>
                </div>
            </form>
            </div>
        </div>
        <div className="hidden relative lg:flex w-1/2 h-full items-center justify-center bg-gray-200">
            <div className="w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-bounce"/>
            <div className="w-full h-1/2 bg-white/10 absolute bottom-0 backdrop-blur-lg"/>
        </div>
    </div>
    )
}
