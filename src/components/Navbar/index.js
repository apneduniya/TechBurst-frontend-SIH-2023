import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { useState, useEffect, useContext } from 'react';
import { motion, useCycle, useScroll, useMotionValueEvent } from "framer-motion";
import { IconGlobe, IconQuestionMark, IconSearch } from "@tabler/icons-react";
import { LoadingOverlay } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import authContext from "../../context/authContext";

const sidebar = {
    open: (height = 1000) => ({
        clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
        transition: {
            type: "spring",
            stiffness: 20,
            restDelta: 2
        }
    }),
    closed: {
        clipPath: "circle(30px at 40px 40px)",
        transition: {
            delay: 0.5,
            type: "spring",
            stiffness: 400,
            damping: 40
        }
    }
};

const navVariants = {
    open: {
        opacity: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "25px",
        paddingTop: "100px",
        position: "absolute",
        top: "-16px",
        left: 0,
        width: "100%",
        height: "101vh",
        zIndex: 9998,
        backgroundColor: "white",
        transition: {
            opacity: { duration: 0.3 },
            staggerChildren: 0.07,
            delayChildren: 0.2,
            // type: 'spring'
        }
    },
    closed: {
        transition: {
            opacity: { duration: 0.3 },
            staggerChildren: 0.05,
            staggerDirection: -1,
            // type: 'spring'
        },
        opacity: 0,
        display: "none"
    }
};

const itemsVariants = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            y: { stiffness: 1000, velocity: -100 }
        }
    },
    closed: {
        y: 50,
        opacity: 0,
        transition: {
            y: { stiffness: 1000 }
        }
    }
};

const MenuItem = (data) => {
    // const style = { border: `3px solid ${colors[id]}` };
    return (
        <motion.li
            variants={itemsVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="navToggleLi"
        >
            {/* <div className="navTextPlaceholder" style={style}> */}
            <Link href={data.link} scroll={false} className="navToggleLink" onClick={data.toggle}>
                <div className="navTextPlaceholder">
                    {<data.icon size="20px" color="black" />}
                    <span className="navText">{data.text}</span>
                </div>
            </Link>
        </motion.li>
    );
};

const Items = [
    { id: "0", text: "How It Works", link: "/", icon: IconQuestionMark },
    { id: "1", text: "Explore", link: "/explore", icon: IconGlobe },
    { id: "2", text: "Find Work", link: "/register?type=service_provider", icon: IconSearch },
];


const Navbar = (props) => {
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useCycle(false, true);
    const [isMobile, setIsMobile] = useState(false);
    const [latestScroll, setLatestScroll] = useState(null);
    const [loadingVisible, { open: startLoading, close: stopLoading }] = useDisclosure(false); // For displaying loading overlay
    const [name, setName] = useState("Legal Market");
    const [alertState, setAlertState] = useState({ showAlert: false, alertMessage: "", alertColor: "", alertIcon: null, alertTitle: "" });
    const userData = useContext(authContext);

    const { scrollY } = useScroll();

    const MenuToggle = ({ toggle }) => (
        <button onClick={toggle} className="navToggleButton" style={{ backgroundColor: "transparent", border: "0 solid transparent" }}>
            <svg
                viewBox="0 0 100 100"
                height="50"
                width="50"
                style={isOpen ? { transform: "rotate(45deg)" } : {}}
            >
                <path
                    strokeLinecap="round"
                    style={isOpen ? { strokeWidth: 4, fill: "none", transition: "stroke-dasharray 400ms, stroke-dashoffset 400ms", stroke: "#2938aa", strokeDasharray: "25 160", strokeDashoffset: -64 } : { strokeWidth: 4, fill: "none", transition: "stroke-dasharray 400ms, stroke-dashoffset 400ms", stroke: "#2938aa", strokeDasharray: "25 160" }}
                    d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20"
                />
                <path
                    strokeLinecap="round"
                    style={isOpen ? { strokeWidth: 4, fill: "none", transition: "stroke-dasharray 400ms, stroke-dashoffset 400ms", stroke: "#2938aa", strokeDasharray: "60 142", transformOrigin: "50%", transition: "transform 400ms", transform: "rotate(90deg)" } : { strokeWidth: 4, fill: "none", transition: "stroke-dasharray 400ms, stroke-dashoffset 400ms", stroke: "#2938aa", strokeDasharray: "60 142", transformOrigin: "50%", transition: "transform 400ms" }}
                    d="m 30,50 h 40"
                />
                <path
                    strokeLinecap="round"
                    style={isOpen ? { strokeWidth: 4, fill: "none", transition: "stroke-dasharray 400ms, stroke-dashoffset 400ms", stroke: "#2938aa", strokeDasharray: "25 85", transformOrigin: "50%", strokeDashoffset: -64 } : { strokeWidth: 4, fill: "none", transition: "stroke-dasharray 400ms, stroke-dashoffset 400ms", stroke: "#2938aa", strokeDasharray: "25 85", transformOrigin: "50%" }}
                    d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20"
                />
            </svg>
        </button>
    );

    const Navigation = () => (
        // <motion.ul variants={navVariants} className={isOpen? "navToggleUl": "navToggleUlRemove"}>
        <motion.ul
            style={{ display: "flex" }}
            className="navToggleUl"
            variants={navVariants}
            initial="closed"
            animate={isOpen ? "open" : "closed"}
        >
            {Items.map((item) => (
                <MenuItem id={item.id} key={item.id} text={item.text} link={item.link} icon={item.icon} toggle={() => setIsOpen()} />
            ))}
            <Link to="/register?type=hire" scroll={false} className="navToggleLink" onClick={() => setIsOpen()}>
                <motion.button
                    className="navbar-contact-button"
                    style={{ color: "#ffffff", margin: "auto", marginTop: 7, marginLeft: 120, padding: "12px 44px", fontSize: "1.1em", backgroundColor: "#2938aa", border: "0 solid transparent", cursor: "pointer", borderRadius: 10, boxShadow: "0px 5px 30px rgba(65, 84, 241, 0.4)", userSelect: "none", width: "max-content" }}
                    initial={{ y: 100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 2, type: "spring", stiffness: 120 }}
                    whileHover={{ y: -10, boxShadow: "0 7px 32px rgba(36, 56, 237, 0.4)" }}
                    whileTap={{ scale: .88 }}
                >
                    Hire Now
                </motion.button>
            </Link>
        </motion.ul>
    );

    useMotionValueEvent(scrollY, "change", (latest) => {
        setLatestScroll(latest);
    })

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 1300px)');
        setIsMobile(mediaQuery.matches);

        // const listener = () => setIsMobile(mediaQuery.matches);

    }, []);

    useEffect(() => {
        // console.log(userData);

        startLoading();

        if (userData) {
            console.log(userData);
            if (userData.role === 'service_provider') {
                navigate("/service-provider");
            }
            else if (userData.role === 'support') {
                navigate("/support");
            }
            else {
            }
        }

        stopLoading();

    }, [userData])

    return (
        <>
            <LoadingOverlay
                loaderProps={{ size: 'md', color: "#2938aa" }}
                overlayOpacity={0.3}
                overlayBlur={2}
                visible={loadingVisible}
            />
            <header
                className="navbar"
                style={
                    (latestScroll > 40 || props.isBackground === true) ? { backgroundColor: "rgb(255, 255, 255)", boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }
                        :
                        {}
                }
            >
                <div className="navbarNameContainer">
                    <Link to="/" scroll={false} style={{ textDecoration: "none" }}><span>{name}</span></Link>
                </div>
                {isMobile ? (
                    <motion.nav
                        initial={false}
                        animate={isOpen ? "open" : "closed"}
                        custom="100%"
                    >
                        <motion.div className="navbar" variants={sidebar} />
                        <Navigation />
                        <MenuToggle toggle={() => setIsOpen()} />
                    </motion.nav>
                ) : (
                    ""
                )}
                <ul className="navLinksContainer">
                    {
                        Items.map((item) => (
                            <li><Link key={item.id} to={item.link} className="navLinks">{item.text}</Link></li>
                        ))
                    }
                    <Link to="/register?type=hire" style={{ textDecoration: "none", margin: 0, padding: 0 }}>
                        <motion.button
                            className="navbar-contact-button"
                            style={{ color: "#ffffff", margin: "auto", marginTop: 7, marginLeft: 120, padding: "12px 44px", fontSize: "1.1em", backgroundColor: "#2938aa", border: "0 solid transparent", cursor: "pointer", borderRadius: 10, boxShadow: "0px 5px 30px rgba(65, 84, 241, 0.4)", userSelect: "none", width: "max-content" }}
                            initial={{ y: 100, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: false }}
                            transition={{ duration: 2, type: "spring", stiffness: 120 }}
                            whileHover={{ y: -10, boxShadow: "0 7px 32px rgba(36, 56, 237, 0.4)" }}
                            whileTap={{ scale: .88 }}
                        >
                            Hire Now
                        </motion.button>
                    </Link>
                </ul>
            </header>
        </>
    )
}

export default Navbar;