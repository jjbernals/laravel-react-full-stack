import React, {useState} from "react";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

const UploadFile = () =>{
    const tasks = useParams()
    const {user} = useStateContext()
    const navigate = useNavigate()

    const initialValues = {
        file: null,
        fileName: '',
        urlFile:''
    }
    const [file, setFile] = useState(initialValues)
    const onSubmitFile = async e => {
        e.preventDefault();
        const fd = new FormData();
        fd.append('file', file.file, file.fileName)
        await axios.post('http://localhost:8000/api/task/upload/'+tasks.id+'/'+file.fileName, fd)
        navigate('/tasks')
    }
    const fileSelecterHandle = (e) =>{
        setFile({
            file: e.target.files[0],
            fileName: e.target.files[0].name,
            urlFile: e.target.files[0].url
        })


    }


    return (
        <div className=" mt-6 md:w-[450%] h-[200%] m-12 flex items-center justify-center">
            <label htmlFor="dropzone-file"
                   className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor"
                         viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or
                        drag and drop</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
                <input id="dropzone-file" type="file" onChange={fileSelecterHandle} className=""/>
                <button onClick={onSubmitFile} className=" p-4 mt-5 mb-2 active:scale-[.98] active: duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-violet-500 text-white text-lg font-bold">Subir documentos</button>

                </label>
        </div>

    )
}

export default UploadFile
