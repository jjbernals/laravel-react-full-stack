import {createBrowserRouter, Navigate} from "react-router-dom";
import Login from "./views/Login.jsx";
import Signup from "./views/Signup.jsx";
import User from "./views/User.jsx";
import NotFound from "./views/NotFound.jsx";
import DefaultLayout from "./components/DefaultLayout.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import Team from "./components/Team.jsx";
import NewMember from "./components/NewMember.jsx";
import Task from "./components/Task.jsx";
import CreateTask from "./components/CreateTask.jsx";
import UploadFile from "./components/UploadFile.jsx";
import StatusTask from "./components/StatusTask.jsx";




const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout/>,
        children: [
            {
                path: '/team',
                element: <Team/>
            },
            {
                path: '/',
                element: <Navigate to = "/user"/>
            },
            {
                path: '/tasks',
                element: <Task/>
            },
            {
                path: '/user',
                element: <User/>
            },
            {
                path: '/newMember',
                element: <NewMember/>
            },
            {
                path: '/newTask',
                element: <CreateTask/>
            },
            {
                path: '/upload/:id',
                element: <UploadFile/>
            },
            {
                path: '/status/:id/:status/:rol',
                element: <StatusTask/>
            },

        ]
    },
    {
        path: '/',
        element: <GuestLayout/>,
        children: [
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/signup',
                element: <Signup/>
            },
        ]
    },

    {
        path: '*',
        element: <NotFound/>
    }
])

export default router;
