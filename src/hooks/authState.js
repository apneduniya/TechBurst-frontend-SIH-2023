import AuthContext from "@/context/authContext";
import { LoadingOverlay } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthState = (props) => {
    const [loadingVisible, { open: startLoading, close: stopLoading }] = useDisclosure(false); // For displaying loading overlay
    const [data, setData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        
        startLoading();

        const token = localStorage.getItem("token") || sessionStorage.getItem("token");

        const isAuthenticated = async () => {

            await axios.get("http://localhost:8000/user/me",
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                    
                }).then(function (response) {
                    console.log(response);
                    if (response.data) {
                        // if (response.data.role === "client") {
                        //     router.push("/");
                        // }
                        setData(response.data);
                    }
                }).catch(function (error) {
                    console.log(error, "error");
                    navigate("/login");
                    try {
                        if (error.response.data.detail) {
                            navigate("/login");
                        }
                    }
                    catch { }
                });

        }

        if (token) {
            isAuthenticated();
        }

        else {
            // alert("No token found");
            navigate("/login");
        }

        stopLoading();

    }, []);

    return (
        <>
            <LoadingOverlay
                loaderProps={{ size: 'md', color: "#85144B" }}
                // overlayOpacity={0.3}
                overlayOpacity={1}
                overlayBlur={2}
                visible={loadingVisible}
            />
            <AuthContext.Provider value={data}>
                {props.children}
            </AuthContext.Provider></>
    )
}

export default AuthState;