import { LoadingOverlay } from "@mantine/core";

const { useRouter } = require("next/router");
const { useEffect } = require("react")


const Logout = () => {

    const router = useRouter();

    useEffect(() => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');

        setTimeout(() => {
            window.location.href = '/login';
        }, 1000);

    }, [])

    return (
        <div>
            {/* <h1>Redirecting to login page...</h1> */}
            <LoadingOverlay
                loaderProps={{ size: 'md', color: "#85144B" }}
                overlayOpacity={0.3}
                overlayBlur={2}
                visible={true}
            />
        </div>
    )
}

export default Logout;

