import {Link} from "react-router-dom";
import {useRef, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";

export default function Signup(){
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const {setUser, setToken} = useStateContext()
    const [errors, setErrors] = useState(null);

    const onSubmit = (ev) =>{
        ev.preventDefault()
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        }
        axiosClient.post('/signup', payload)
            .then(({data})=>{
                setUser(data.user)
                setToken(data.token)
            })
            .catch(err =>{
                const response = err.response;
                if(response && response.status === 422){
                    setErrors(response.data.errors)
                }
            })
    }
    return (
        <div className="flex w-full h-screen">
            <div className="w-full flex items-center justify-center lg:w-1/2">
                <div className=" bg-white px-48 py-40 rounded-3xl border-2">
                <form onSubmit={onSubmit}>
                    <h1 className="text-5xl font-semibold">Registrate</h1>
                    <p className="font-medium text-large text-gray-500 mt-4">Registrate con tus datos</p>
                    <h1>
                        {errors && <div>
                                <p className="mt-2 flex items-center bg-violet-500 text-white text-sm font-bold px-4 py-3" role="alert">Confirma tus datos e intentalo nuevamente</p>
                        </div>}
                    </h1>
                    <div>
                        <div className="mt-4">
                            <input className="w-full border-2 border-gray-100 rounded-xl p-4 mt-2 bg-transparent" size="50" ref={nameRef} type="text" placeholder="Nombres y apellidos"/>
                        </div>
                        <div>
                            <input className="w-full border-2 border-gray-100 rounded-xl p-4 mt-2 bg-transparent" ref={emailRef} type="email" placeholder="Correo electronico"/>
                        </div>
                        <div>
                            <input className="w-full border-2 border-gray-100 rounded-xl p-4 mt-2 bg-transparent" ref={passwordRef} type="password" placeholder="Contraseña"/>
                        </div>
                        <div>
                            <input className="w-full border-2 border-gray-100 rounded-xl p-4 mt-2 bg-transparent" ref={passwordConfirmationRef} type="password" placeholder="Confirma tu contraseña"/>
                        </div>
                        <div className="mt-7 flex flex-col gap-y-4">
                            <button className="active:scale-[.98] active: duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-violet-500 text-white text-lg font-bold">Registrarse</button>
                        </div>
                    </div>
                    <div className="w-full flex items-center justify-center relative py-2">
                        <div className="mt-4 w-full h-[1px] bg-black"></div>
                    </div>
                    <div className="mt-5 justify-center items-center">
                        <p className="font-medium text-base text-base">
                            ¿Ya tienes una cuenta? <Link className="text-violet-500 text-base font-medium ml-2" to="/login">Inicia Sesion</Link>
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
