import { Background, Companies, Connect, Container, CTA, Features, Pricing, Reviews, Wrapper, } from "@/components";
import Perks2 from "@/components/marketing/perks2";
import Offers from "@/components/marketing/offers";
import  Start  from "@/components/marketing/start";
import { Spotlight } from "@/components/ui/spotlight";
import CaseStudies  from "@/components/marketing/brands";
import PricingQuestions from "@/components/marketing/faq";

const CreatorsPage = () => {
    return (
        <Background>
            <Wrapper className="py-20 relative">
                <Container className="relative">
                    <Spotlight
                        className="-top-40 left-0 md:left-60 md:-top-20"
                        fill="rgba(255, 255, 255, 0.5)"
                    />
                 <Offers />
                </Container>
                <Perks2 />
                <Pricing />
                <CaseStudies />
                <Start />
                <PricingQuestions />
                <Companies />
                <Reviews />
                <CTA />
            </Wrapper>
        </Background>
    )
};

export default CreatorsPage
