import "./styles/globals.css";
import "./styles/themes/light.css";
import "./styles/themes/dark.css";
import Login from "./features/auth/components/Login";
import Register from "./features/auth/components/Register";
import Home from "./pages/Home";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "./features/auth/components/ProtectedRoute";

function App() {
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
                    <Route path="register" element={<Register />} />
                    <Route
                        path="*"
                        element={
                            <p className="text-center pt-11 font-bold text-gray-900 dark:text-gray-100">
                                Hey Bro, its Not Correct URL
                            </p>
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
