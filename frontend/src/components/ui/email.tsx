import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Text,
  Heading,
  Button,
  Section,
} from "@react-email/components";

export function HiringEmail(props:{url:string,candidateName:string,position:string}) {
  const { url, candidateName , position } = props;

  return (
    <Html lang="en">
      <Head />
      <Preview>Exciting Opportunity at Our Company – Join Us!</Preview>
      <Body style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f4f4f4", padding: "20px" }}>
        <Container style={{ backgroundColor: "#ffffff", padding: "40px", borderRadius: "8px" }}>
          <Heading as="h1" style={{ fontSize: "24px", marginBottom: "20px" }}>
            Hi {candidateName},
          </Heading>
          <Text style={{ fontSize: "16px", marginBottom: "20px" }}>
            We came across your profile and were really impressed by your work! We're currently hiring for a <strong>{position}</strong> role and believe you could be a great fit.
          </Text>
          <Text style={{ fontSize: "16px", marginBottom: "20px" }}>
            If you're interested in learning more, please click the button below to view the job details and apply.
          </Text>
          <Section style={{ textAlign: "center", marginBottom: "30px" }}>
            <Button
              href={url}
              style={{
                backgroundColor: "#0070f3",
                color: "#ffffff",
                padding: "12px 24px",
                borderRadius: "6px",
                textDecoration: "none",
                fontSize: "16px",
              }}
            >
              View Opportunity
            </Button>
          </Section>
          <Text style={{ fontSize: "14px", color: "#555" }}>
            Looking forward to hearing from you!
            <br />
            — The Hiring Team
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default HiringEmail;
