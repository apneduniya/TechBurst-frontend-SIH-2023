import './register.css';
import { createStyles, Card, Text, Group, Button, getStylesRef, rem, TextInput, PasswordInput, LoadingOverlay, Alert, Checkbox, FileInput, Radio, Center } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { useContext, useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { IconCheck, IconLockCancel, IconUpload } from '@tabler/icons-react';
import axios from 'axios';
import authContext from '../../context/authContext';
import Navbar from '../../components/Navbar';

const Register = () => {

    const [alertState, setAlertState] = useState({ showAlert: false, alertMessage: '', alertColor: '', alertIcon: '', alertTitle: '', });
    const [loading, setLoading] = useState(false);
    const [loadingVisible, { open: startLoading, close: stopLoading }] = useDisclosure(false); // For displaying loading overlay
    const userData = useContext(authContext);

    const form = useForm({
        initialValues: {
            username: '',
            phone_number: '',
            email: '',
            // profile_pic: null,
            password: '',
            confirm_password: '',
            role: 'hire',
            // pan_number: '',
            // pan_card_pic: null,
            // aadhar_number: '',
            // aadhar_card_pic: null,
            checkboxAgreement: false,
        },
        validate: {
            // profile_pic: (value) => (value ? null : 'Please select an image'),
            username: (value) => (value.length < 4 ? 'User name should be at least 4 characters long' : null),
            phone_number: (value) => (value.length < 10 ? 'Invalid phone number' : null),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => (value.length < 6 ? 'Password should be at least 6 characters long' : null),
            confirm_password: (value) => (value !== form.values.password ? 'Passwords do not match' : null),
            role: (value) => (value ? null : 'Please select a role'),
            // pan_number: (value) => (value.length < 10 ? 'Invalid PAN number' : null),
            // pan_card_pic: (value) => (value ? null : 'Please select an image'),
            // aadhar_number: (value) => (value.length !== 12 ? 'Invalid Aadhar number' : null),
            aadhar_card_pic: (value) => (value ? null : 'Please select an image'),
            checkboxAgreement: (value) => (value ? null : 'You must agree to the Terms of Services and Privacy Policy'),
        },
    });

    const getBase64 = (file) => {
        return new Promise(resolve => {
            // let fileInfo;
            let baseURL = "";
            // Make new FileReader
            let reader = new FileReader();

            // Convert the file to base64 text
            reader.readAsDataURL(file);

            // on reader load somthing...
            reader.onload = () => {
                // Make a fileInfo Object
                console.log("Called", reader);
                baseURL = reader.result;
                console.log(baseURL);
                resolve(baseURL);
            };
            // console.log(fileInfo);
        });
    };

    const getFile = async (file) => {
        const result = await getBase64(file);
        return { "filename": file.name, "file_data": result };
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        form.validate();

        if (form.errors.username || form.errors.phone_number || form.errors.email || form.errors.password || form.errors.confirm_password || form.errors.checkboxAgreement || form.values.password < 6) {
            // Show alert if form is invalid
            return;
        }

        if (form.values.username.includes(' ') || form.values.username.includes('@') || form.values.username.includes('#') || form.values.username.includes('$') || form.values.username.includes('%') || form.values.username.includes('^') || form.values.username.includes('&') || form.values.username.includes('*') || form.values.username.includes('(') || form.values.username.includes(')') || form.values.username.includes('-') || form.values.username.includes('+') || form.values.username.includes('=') || form.values.username.includes('/') || form.values.username.includes('\\') || form.values.username.includes('|') || form.values.username.includes('[') || form.values.username.includes(']') || form.values.username.includes('{') || form.values.username.includes('}') || form.values.username.includes(';') || form.values.username.includes(':') || form.values.username.includes('"') || form.values.username.includes('\'') || form.values.username.includes('<') || form.values.username.includes('>')) {
            // Show alert if username contains special characters
            setAlertState({
                showAlert: true,
                alertMessage: 'Username should not contain special characters',
                alertColor: 'red',
                alertIcon: <IconLockCancel size="1rem" color='#ffffff' />,
                alertTitle: 'Username Error',
            });

            return;
        }

        if (form.values.password !== form.values.confirm_password) {
            // Show alert if passwords do not match
            setAlertState({
                showAlert: true,
                alertMessage: 'Passwords do not match',
                alertColor: 'red',
                alertIcon: <IconLockCancel size="1rem" color='#ffffff' />,
                alertTitle: 'Password Error',
            });

            return;

        } else {

            // if (!form.values.profile_pic || !form.values.pan_card_pic || !form.values.aadhar_card_pic) {
            if (!form.values.aadhar_card_pic) {
                // Show alert if any of the images are not selected
                setAlertState({ showAlert: true, alertMessage: 'Please upload aaadhar card image', alertColor: 'red', alertIcon: <IconLockCancel size="1rem" color='#ffffff' />, alertTitle: 'Image Error', });
                return;
            }

            setAlertState ({ showAlert: false, alertMessage: '', alertColor: '', alertIcon: '', alertTitle: '', }); // Hide alert if any

            setLoading(true);
            startLoading();

            // const profile_pic = await getFile(form.values.profile_pic);
            // const pan_card_pic = await getFile(form.values.pan_card_pic);
            const aadhar_card_pic = await getFile(form.values.aadhar_card_pic);

            const payload = {
                "username": `${form.values.name}`,
                "phone_number": `${form.values.phone_number}`,
                "email": `${form.values.email}`,
                // "profile_pic": profile_pic,
                "password": `${form.values.password}`,
                "role": `${form.values.role}`,
                // confirm_password: form.values.confirm_password,
                // "pan_number": `${form.values.pan_number}`,
                // "pan_card_pic": pan_card_pic,
                // "aadhar_number": `${form.values.aadhar_number}`,
                "aadhar_card_pic": aadhar_card_pic,
            };

            console.log(payload);

            await axios.post("http://localhost:8000/user/create",
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'accept': 'application/json',
                    }
                }
            ).then(function (response) {
                console.log(response);
                if (response.data) {
                    console.log(response.data);
                    // localStorage.setItem("token", response.data.access_token);
                    // localStorage.setItem("token", response.data.refresh_token);
                    setAlertState({
                        showAlert: true,
                        alertMessage: 'Register successfully!',
                        alertColor: 'green',
                        alertIcon: <IconCheck size="1rem" color='#ffffff' />,
                        alertTitle: 'Success',
                    });
                    // setTimeout(() => {
                        
                    // }, 1000);
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

            // console.log(form.values);
            // Your form submission logic here...
            // console.log('Form submitted successfully!');
            // Proceed with form submission

            setLoading(false);
            stopLoading();
        }
    }

    useEffect(() => {
        if (userData && userData.role) {
            if (userData.role === 'service_provider') {
                window.location.href = '/service-provider';
            }

            else if (userData.role === 'member') {
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
                    <h1 className="loginHeading">Sign up</h1>
                </div>
                {alertState.showAlert && (
                    <Alert icon={alertState.alertIcon} title={alertState.alertTitle} color={alertState.alertColor} variant="filled" mb={20}>
                        {alertState.alertMessage}
                    </Alert>
                )}
                <form onSubmit={handleSubmit}>
                    {/* <FileInput label={<span className={`${styles.registerFormLabel} ${poppins.className}`}>Profile picture</span>} placeholder='Pick image' size="md" required withAsterisk clearable accept="image/*" className={styles.registerForm} icon={<IconUpload size={rem(14)} />} {...form.getInputProps('profile_pic')} /> */}
                    <TextInput type='text' label={<span className="registerFormLabel">Username</span>} placeholder="jhon_doe" mt="sm" size="md" required withAsterisk max={50} className="registerForm" {...form.getInputProps('username')} error={form.errors.username} />
                    <TextInput type='number' label={<span className="registerFormLabel">Contact number</span>} placeholder="9876543210" mt="sm" size="md" required withAsterisk className="registerForm" {...form.getInputProps('phone_number')} error={form.errors.phone_number} icon={"+91"} description="Enter same number as registered with your aadhar card" />
                    <TextInput label={<span className="registerFormLabel">Email</span>} placeholder="hello@gmail.com" mt="sm" size="md" required max={50} className="registerForm" {...form.getInputProps('email')} error={form.errors.email} />
                    {/* <TextInput type='text' label={<span className={`${styles.registerFormLabel} ${poppins.className}`}>Pan number</span>} placeholder="ABCDE1234F" size="md" required withAsterisk max={50} className={styles.registerForm} {...form.getInputProps('pan_number')} error={form.errors.pan_number} />
                    <FileInput label={<span className={`${styles.registerFormLabel} ${poppins.className}`}>Pan card picture</span>} placeholder='Pick pan card image' size="md" required withAsterisk clearable accept="image/*" className={styles.registerForm} icon={<IconUpload size={rem(14)} />} {...form.getInputProps('pan_card_pic')} />
                    <TextInput type='text' label={<span className={`${styles.registerFormLabel} ${poppins.className}`}>Aadhar number</span>} placeholder="123456789012" size="md" required withAsterisk max={50} className={styles.registerForm} {...form.getInputProps('aadhar_number')} error={form.errors.aadhar_number} /> */}
                    <FileInput label={<span className="registerFormLabel">Aadhar card picture</span>} placeholder='Pick aadhar card image' mt="sm" size="md" required withAsterisk clearable accept="image/jpeg, image/png" className="registerForm" icon={<IconUpload size={rem(14)} />} {...form.getInputProps('aadhar_card_pic')} error={form.errors.aadhar_card_pic} />
                    <Radio.Group
                        label={<span className="registerFormLabel">Who are you?</span>}
                        mt="sm"
                        {...form.getInputProps('role')}
                        error={form.errors.role}
                        required
                        withAsterisk
                    >
                        <Group mt="sm">
                            <Radio label="Hire" value="hire" />
                            <Radio label="Legal Service Provider" value="service_provider" />
                        </Group>
                    </Radio.Group>
                    <PasswordInput label={<span className="registerFormLabel">Password</span>} placeholder="Your password" mt="sm" size="md" required max={50} className="registerForm" {...form.getInputProps('password')} error={form.errors.password} />
                    <PasswordInput label={<span className="registerFormLabel">Confirm Password</span>} placeholder="Confirm your password" mt="sm" size="md" required max={50} className="registerForm" {...form.getInputProps('confirm_password')} error={form.errors.confirm_password} />
                    <Checkbox color='blue' required label={<span>I agree to the <Link to="#" target='_blank' scroll={false} style={{ textDecoration: "none" }}><span className="registerTermsOfServicesLink">Terms of Services</span></Link> and <Link to="#" target='_blank' scroll={false} style={{ textDecoration: "none" }}><span className="registerPrivacyPolicyLink">Privacy Policy</span></Link>.</span>} mt="xl" size="md" {...form.getInputProps('checkboxAgreement')} error={form.errors.checkboxAgreement} />
                    {loading ?
                        <Button type='button' fullWidth mt="xl" size="md" className="registerFormSubmitButton" loading>
                            Sign up
                        </Button>
                        :
                        <Button type='submit' fullWidth mt="xl" size="md" className="registerFormSubmitButton">
                            Sign up
                        </Button>
                    }
                </form>
                <div className="registerForgotPasswordContainer">
                    <span className="registerDescription">Have an Account?</span>
                    <Link to="/login" scroll={false} style={{ textDecoration: "none" }}><span className="registerSignUpLink">Sign in</span></Link>
                </div>
            </div>
        </>
    )
}

export default Register;
