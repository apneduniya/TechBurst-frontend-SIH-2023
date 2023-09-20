import { Image, Container, Title, Button, Group, Text } from '@mantine/core';
import hero_img from '../../assets/images/hero_banner.svg';
import './hero.css';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <Container size="xl" mt={30}>
            <div className="homeHeroInner">
                <div className="homeHeroContent">
                    <Title className="homeHeroTitle" order={1}>
                        Find best <span className="homeHeroHighlight">Legal</span> Service <br /> Provider here
                    </Title>
                    <Text c="dimmed" mt="md">
                        Legal Market provides a platform for lawyers and clients to connect and interact with each other. Best legal service provider can be found here.
                    </Text>

                    {/* <List
                        mt={30}
                        spacing="sm"
                        size="sm"
                        icon={
                            <ThemeIcon size={20} radius="xl">
                                <IconCheck style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                            </ThemeIcon>
                        }
                    >
                        <List.Item>
                            <b>Transparent</b> - Our goal is to make Legal Market as transparent as possible, we can
                        </List.Item>
                        <List.Item>
                            <b>User friendly</b> - We are trying to make Legal Market as easy to use as possible
                        </List.Item>
                        <List.Item>
                            <b>Secure</b> - The security of our users is our top priority
                        </List.Item>
                    </List> */}

                    <Group mt={40}>
                        <Link to="/explore">
                            <Button variant='gradient' gradient={{ deg: 133, from: 'blue', to: 'cyan' }} radius="xl" size="md" className="homeHeroControl">
                                Explore
                            </Button>
                        </Link>
                        <Link to="/register">
                            <Button variant="default" radius="xl"size="md" className="homeHeroControl">
                                Join us
                            </Button>
                        </Link>
                    </Group>
                </div>
                <Image src={hero_img} className="homeHeroImage" />
            </div>
        </Container>
    );
}


export default Hero;
