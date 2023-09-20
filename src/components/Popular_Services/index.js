import { Card, SimpleGrid, Text, Title } from "@mantine/core";
import "./popular_services.css";


const PopularServices = () => {

    const data = [
        {
            title: "Extreme performance",
            description: "This dust is actually a powerful poison that will even make a pro wrestler sick, Regice cloaks itself with frigid air of -328 degrees Fahrenheit",
        },
        {
            title: "Privacy focused",
            description: "People say it can run at the same speed as lightning striking, Its icy body is so cold, it will not melt even if it is immersed in magma",
        },
        {
            title: "No third parties",
            description: "They're popular, but they're rare. Trainers who show them off recklessly may be targeted by thieves",
        },
        {
            title: "No third parties",
            description: "They're popular, but they're rare. Trainers who show them off recklessly may be targeted by thieves",
        },
    ];

    const features = data.map((feature) => (
        <Card key={feature.title} shadow="md" radius="md" className="homePopularServicesCard" padding="xl">
            {/* <feature.icon
                style={{ width: rem(50), height: rem(50) }}
                stroke={2}
                color={theme.colors.blue[6]}
            /> */}
            <Text fz="lg" fw={500} className="homePopularServicesCardTitle" mt="md">
                {feature.title}
            </Text>
            <Text fz="sm" c="dimmed" mt="sm">
                {feature.description}
            </Text>
        </Card>
    ));

    return (
        <>
            <Title order={1} className="homePopularServicesTitle" ta="center">
                Popular Services
            </Title>
            <SimpleGrid
                // cols={3}
                // spacing={20}
                cols={{ base: 1, sm: 2, lg: 4 }}
                spacing={{ base: 10, sm: 'xl' }}
                verticalSpacing={{ base: 'md', sm: 'xl' }}
                className="homePopularServicesGrid"
            >
                {features}
            </SimpleGrid>
        </>
    )
}


export default PopularServices;

