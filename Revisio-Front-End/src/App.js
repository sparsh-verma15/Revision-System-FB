import "./App.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Categories from "./components/Categories";
import { createContext, useState } from "react";
import { AuthContextProvider, useAuthContext } from "./context/AuthContext";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import TasksPage from "./components/TasksPage";
import TasksDetails from "./components/TasksDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import NoRouteMatch from "./components/NoRouteMatch";


function App() {
    const auth = useAuthContext();
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login/>}/>
                    <Route path='/signup' element={<SignUp/>}/>
                    <Route path='/categories' element={ <ProtectedRoute><Categories/></ProtectedRoute> }/>
                    <Route path='/categories/:categoryName/:categoryId' element={<ProtectedRoute><TasksPage/></ProtectedRoute> }/>
                    <Route path='/tasks/:taskName/:taskId' element={<ProtectedRoute><TasksDetails/></ProtectedRoute> }/>
                    <Route path='*' element={<NoRouteMatch/>}/>
                </Routes>
            </BrowserRouter>
        </div>
	);
}

export default App;
