import './login.css';
import { Button, TextInput, PasswordInput, LoadingOverlay, Alert } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { useContext, useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { IconCheck, IconLockCancel } from '@tabler/icons-react';
import axios from 'axios';
import authContext from '../../context/authContext';
import Navbar from '../../components/Navbar';

const Login = () => {

    const [alertState, setAlertState] = useState({ showAlert: false, alertMessage: '', alertColor: '', alertIcon: '', alertTitle: '', });
    const [loading, setLoading] = useState(false);
    const [loadingVisible, { open: startLoading, close: stopLoading }] = useDisclosure(false); // For displaying loading overlay

    const userData = useContext(authContext);


    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => (value.length < 6 ? 'Password should be at least 6 characters long' : null),
        },
    });

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        startLoading();

        const payload = {
            "username": `${form.values.email}`,
            "password": `${form.values.password}`,
        };

        await axios.post("https://api.earnifyy.online/user/login",
            payload,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            }
        ).then(function (response) {
            console.log(response);
            if (response.data) {
                console.log(response.data);
                // localStorage.setItem("token", response.data.access_token);
                localStorage.setItem("token", response.data.refresh_token);
                setAlertState({
                    showAlert: true,
                    alertMessage: 'Login successfully!',
                    alertColor: 'green',
                    alertIcon: <IconCheck size="1rem" color='#ffffff' />,
                    alertTitle: 'Success',
                });
                setTimeout(() => {
                    if (response.data.role === 'admin') {
                        // router.push('/admin');
                        window.location.href = '/admin';
                    }
                    else {
                        // router.push('/');
                        window.location.href = '/';
                    }
                }, 1000);
            }
        }).catch(function (error) {
            console.log(error, "error");
            try {
                if (error.response.data.detail) {
                    // navigate("/login");
                    setAlertState({ showAlert: true, alertMessage: error.response.data.detail, alertColor: 'red', alertIcon: <IconLockCancel size="1rem" color='#ffffff' />, alertTitle: 'Error', });
                }
            }
            catch { }
        });

        setLoading(false);
        stopLoading();

        // console.log(form.values);
        // Your form submission logic here...\
        // Proceed with form submission
    }


    useEffect(() => {
        if (userData && userData.role) {
            if (userData.role === 'admin') {
                // router.push('/admin');
                window.location.href = '/admin';
            }
            else {
                // router.push('/');
                window.location.href = '/';
            }
        }
    }, [userData])


    return (
        <>
            <LoadingOverlay
                loaderProps={{ size: 'md', color: "#85144B" }}
                overlayOpacity={0.3}
                overlayBlur={2}
                visible={loadingVisible}
            />

            <Navbar />
            <div className="loginContainer">
                <div className='headingContainer'>
                    <h1 className="loginHeading">Sign in</h1>
                    <span className="loginDescription">Hi there! Nice to see you again.</span>
                </div>
                <form onSubmit={handleSubmit}>
                    {alertState.showAlert && (
                        <Alert icon={alertState.alertIcon} title={alertState.alertTitle} color={alertState.alertColor} variant="filled" mb={20}>
                            {alertState.alertMessage}
                        </Alert>
                    )}
                    <TextInput label={<span className="loginFormLabel">Email</span>} placeholder="hello@gmail.com" size="md" required max={50} className="loginFormEmail" {...form.getInputProps('email')} error={form.errors.email} />
                    <PasswordInput label={<span className="loginFormLabel">Password</span>} placeholder="Your password" mt="md" size="md" required max={50} className="loginFormPassword" {...form.getInputProps('password')} error={form.errors.password} />
                    {loading ?
                        <Button type='button' fullWidth mt="xl" size="md" className="loginFormSubmitButton" loading>
                            Sign in
                        </Button>
                        :
                        <Button type='submit' fullWidth mt="xl" size="md" className="loginFormSubmitButton">
                            Sign in
                        </Button>
                    }
                </form>
                <div className="loginForgotPasswordContainer">
                    <span className="loginDescription">New User?</span>
                    <Link to="/register" scroll={false} style={{ textDecoration: "none" }}><span className="loginSignUpLink">Sign up</span></Link>
                </div>
            </div>
        </>
    )
}

export default Login;
