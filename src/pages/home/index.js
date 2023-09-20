import FAQs from "../../components/FAQs";
import Footer from "../../components/Footer";
import Hero from "../../components/Hero"
import Navbar from "../../components/Navbar";
import PopularServices from "../../components/Popular_Services";


const Home = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <PopularServices />
            <FAQs />
            <Footer />
        </>
    );
};

export default Home;


