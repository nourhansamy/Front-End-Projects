import { createContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";

export let AuthContext = createContext(null);

export default function AuthContextProvider(props) {
    const [userData, setUserData] = useState(null);
    function saveUserData() {
        // 1. Get data from local storage
        let encodedToken = localStorage.getItem("token");
        // 2. Decode
        let decodedToken = jwtDecode(encodedToken);
        console.log("decodedToken:", decodedToken);
        // 3. Store decodedToken info in state
        setUserData(decodedToken);
    }
    function logout() {
        // 1. Remove token from local storage
        localStorage.removeItem("token");
        // 2. Clear userData in state
        setUserData(null);
        // 3. Navigate the user to login page
        // return <Navigate to="/login" />;
    }
    useEffect(() => {
        if (localStorage.getItem("token")) {
            saveUserData();
        }
    }, []);
    return (
        <AuthContext.Provider value={{ userData, saveUserData, logout }}>{props.children}</AuthContext.Provider>
    );
}
