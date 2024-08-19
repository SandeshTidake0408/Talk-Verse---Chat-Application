import "./App.css";
import Resister from "./pages/resister";
import Navbar from "./Components/navbar";
import Login from "./pages/login";
import Home from "./pages/Home";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { Children, useContext } from "react";
import { AuthContext } from "./context/AuthContext";
function App() {
    const { currentUser } = useContext(AuthContext);
    // console.log(currentUser);

    const ProtectedRoute = ({ children }) => {
        if (!currentUser) {
            return <Navigate to="/login" />;
        }
        return children;
    };
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route
                        index
                        element={
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Resister />} />
                    <Route
                        path="*"
                        element={
                            <p className=" text-center pt-11 font-bold  siz">
                                Hey Bro,its Not Correct URL
                            </p>
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
