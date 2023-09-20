import { Container, Group } from '@mantine/core';
import { Link } from 'react-router-dom';
import "./footer.css";

const Links = [
    { id: "0", label: "How It Works", link: "/" },
    { id: "1", label: "Explore", link: "/explore" },
    { id: "2", label: "Find Work", link: "/find-work" },
];

const Footer = () => {
    const items = Links.map((link) => (
        <Link
            c="dimmed"
            key={link.id}
            to={link.link}
            size="sm"
            style={{ textDecoration: "none", color: "black" }}
        >
            {link.label}
        </Link>
    ));

    return (
        <div className="footerContainer">
            <Container size='lg' className="footerInner">
                <div className="navbarNameContainer">
                    <Link to="/" scroll={false} style={{ textDecoration: "none" }}><span>Legal Market</span></Link>
                </div>
                <Group className="footerLinks">{items}</Group>
            </Container>
        </div>
    );
}


export default Footer;

