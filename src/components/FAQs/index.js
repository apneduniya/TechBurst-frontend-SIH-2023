import { Container, Title, Accordion } from '@mantine/core';
import "./faqs.css";

const placeholder = "It cant help but hear a pin drop from over half a mile away, so it lives deep in the mountains where there aren't many people or Pokémon.It was born from sludge on the ocean floor. In a sterile environment, the germs within its body can't multiply, and it dies.It has no eyeballs, so it can't see. It checks its surroundings via the ultrasonic waves it emits from its mouth.";

const FAQs = () => {
    return (
        <Container size="md" className="homeFAQsWrapper">
            <Title ta="center" className="homeFAQsTitle">
                Frequently Asked Questions
            </Title>

            <Accordion variant="separated" mt={40}>
                <Accordion.Item className="homeFAQsItem" value="reset-password">
                    <Accordion.Control>How can I reset my password?</Accordion.Control>
                    <Accordion.Panel>{placeholder}</Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item className="homeFAQsItem" value="another-account">
                    <Accordion.Control>Can I create more that one account?</Accordion.Control>
                    <Accordion.Panel>{placeholder}</Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item className="homeFAQsItem" value="newsletter">
                    <Accordion.Control>How can I subscribe to monthly newsletter?</Accordion.Control>
                    <Accordion.Panel>{placeholder}</Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item className="homeFAQsItem" value="credit-card">
                    <Accordion.Control>Do you store credit card information securely?</Accordion.Control>
                    <Accordion.Panel>{placeholder}</Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item className="homeFAQsItem" value="payment">
                    <Accordion.Control>What payment systems to you work with?</Accordion.Control>
                    <Accordion.Panel>{placeholder}</Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </Container>
    );
} 


export default FAQs;