import React, { useState } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import Layout from '../components/Layout'

const Container = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding: 2rem;
  position: relative;
  overflow: hidden;
`

const BackButton = styled(Link)`
  position: fixed;
  top: 2rem;
  left: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  z-index: 1000;
  font-size: 0.9rem;
  text-decoration: none;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`

const Content = styled.div`
  max-width: 1000px;
  margin: 4rem auto 2rem;
`

const Header = styled.div`
  text-align: center;
  color: white;
  margin-bottom: 3rem;
`

const Title = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-size: 3rem;
  margin-bottom: 1rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const Subtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.6;
`

const PricingToggle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
`

const ToggleLabel = styled.span`
  color: white;
  font-weight: 500;
  opacity: ${props => props.active ? 1 : 0.7};
`

const ToggleSwitch = styled.div`
  position: relative;
  width: 60px;
  height: 30px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    top: 3px;
    left: ${props => props.monthly ? '3px' : '33px'};
    width: 24px;
    height: 24px;
    background: white;
    border-radius: 50%;
    transition: all 0.3s ease;
  }
`

const PricingCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`

const PricingCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(20px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  border: ${props => props.featured ? '3px solid #667eea' : '1px solid rgba(255, 255, 255, 0.2)'};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
  }
`

const PopularBadge = styled.div`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
`

const PlanName = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 1rem;
  color: #333;
`

const PlanPrice = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`

const Price = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #667eea;
  line-height: 1;
`

const PricePeriod = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.5rem;
`

const Savings = styled.div`
  background: #4caf50;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  display: inline-block;
  margin-top: 0.5rem;
`

const FeatureList = styled.ul`
  list-style: none;
  margin-bottom: 2rem;
`

const Feature = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  color: #555;
  font-size: 0.95rem;

  &::before {
    content: "${props => props.included ? '✓' : '✗'}";
    color: ${props => props.included ? '#4caf50' : '#ccc'};
    font-weight: bold;
    margin-right: 1rem;
    font-size: 1.2rem;
  }
`

const ActionButton = styled.button`
  width: 100%;
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;

  &.primary {
    background: linear-gradient(45deg, #667eea, #764ba2);
    color: white;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
    }
  }

  &.secondary {
    background: #f0f0f0;
    color: #333;

    &:hover {
      background: #e0e0e0;
    }
  }
`

const ComparisonSection = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(20px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  margin-bottom: 3rem;
`

const ComparisonTitle = styled.h2`
  font-family: 'Poppins', sans-serif;
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
`

const ComparisonTable = styled.div`
  overflow-x: auto;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const TableHeader = styled.th`
  padding: 1rem;
  text-align: center;
  font-weight: 600;
  color: #333;
  border-bottom: 2px solid #f0f0f0;
`

const TableCell = styled.td`
  padding: 1rem;
  text-align: center;
  border-bottom: 1px solid #f0f0f0;
  color: #555;

  &.feature-name {
    text-align: left;
    font-weight: 500;
  }
`

const CheckIcon = styled.span`
  color: #4caf50;
  font-weight: bold;
  font-size: 1.2rem;
`

const CrossIcon = styled.span`
  color: #ccc;
  font-weight: bold;
  font-size: 1.2rem;
`

const TestimonialSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  color: white;
  text-align: center;
  backdrop-filter: blur(10px);
  margin-bottom: 3rem;
`

const TestimonialText = styled.blockquote`
  font-size: 1.2rem;
  font-style: italic;
  margin-bottom: 1rem;
  line-height: 1.6;
`

const TestimonialAuthor = styled.cite`
  font-weight: 500;
  opacity: 0.9;
`

const FAQSection = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(20px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
`

const FAQTitle = styled.h2`
  font-family: 'Poppins', sans-serif;
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
`

const FAQItem = styled.div`
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 1.5rem;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`

const FAQQuestion = styled.h4`
  color: #333;
  margin-bottom: 0.5rem;
  font-weight: 600;
`

const FAQAnswer = styled.p`
  color: #666;
  line-height: 1.6;
`

const UpgradePage = () => {
  const [isMonthly, setIsMonthly] = useState(true)

  const features = [
    { name: 'Daily affirmations', free: true, premium: true },
    { name: 'Basic themes (3)', free: true, premium: false },
    { name: 'Premium themes (10+)', free: false, premium: true },
    { name: 'AI personalization', free: false, premium: true },
    { name: 'Mood-based content', free: false, premium: true },
    { name: 'Cross-device sync', free: false, premium: true },
    { name: 'Advanced customization', free: false, premium: true },
    { name: 'Priority support', free: false, premium: true },
    { name: 'No ads', free: true, premium: true },
    { name: 'Privacy-first', free: true, premium: true }
  ]

  return (
    <Layout 
      title="Upgrade to Premium - Cosmic Tab Coach"
      description="Unlock premium features, exclusive themes, and AI-powered personalization for your mindful browsing experience"
    >
      <Container>
        <BackButton to="/cosmic-tab">← Back to New Tab</BackButton>
        
        <Content>
          <Header>
            <Title>✨ Upgrade to Premium</Title>
            <Subtitle>
              Unlock the full potential of your mindful browsing experience with premium features, 
              exclusive themes, and AI-powered personalization.
            </Subtitle>
            
            <PricingToggle>
              <ToggleLabel active={isMonthly}>Monthly</ToggleLabel>
              <ToggleSwitch 
                monthly={isMonthly}
                onClick={() => setIsMonthly(!isMonthly)}
              />
              <ToggleLabel active={!isMonthly}>One-time</ToggleLabel>
            </PricingToggle>
          </Header>

          <PricingCards>
            <PricingCard>
              <PlanName>Free Forever</PlanName>
              <PlanPrice>
                <Price>$0</Price>
                <PricePeriod>Always free</PricePeriod>
              </PlanPrice>
              <FeatureList>
                <Feature included>Daily affirmations</Feature>
                <Feature included>3 beautiful themes</Feature>
                <Feature included>Basic customization</Feature>
                <Feature included>Privacy-first approach</Feature>
                <Feature included>No ads, ever</Feature>
                <Feature>AI personalization</Feature>
                <Feature>Premium themes</Feature>
                <Feature>Cross-device sync</Feature>
              </FeatureList>
              <ActionButton className="secondary">
                Current Plan
              </ActionButton>
            </PricingCard>

            <PricingCard featured>
              <PopularBadge>Most Popular</PopularBadge>
              <PlanName>Premium</PlanName>
              <PlanPrice>
                <Price>${isMonthly ? '0.99' : '2.99'}</Price>
                <PricePeriod>{isMonthly ? 'per month' : 'one-time purchase'}</PricePeriod>
                {!isMonthly && <Savings>Save 70%</Savings>}
              </PlanPrice>
              <FeatureList>
                <Feature included>Everything in Free</Feature>
                <Feature included>AI-personalized content</Feature>
                <Feature included>10+ premium themes</Feature>
                <Feature included>Advanced customization</Feature>
                <Feature included>Mood-based affirmations</Feature>
                <Feature included>Cross-device sync</Feature>
                <Feature included>Priority support</Feature>
                <Feature included>Early access to features</Feature>
              </FeatureList>
              <ActionButton className="primary">
                Upgrade Now
              </ActionButton>
            </PricingCard>
          </PricingCards>

          <ComparisonSection>
            <ComparisonTitle>🔍 Feature Comparison</ComparisonTitle>
            <ComparisonTable>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Feature</TableHeader>
                    <TableHeader>Free</TableHeader>
                    <TableHeader>Premium</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature, index) => (
                    <tr key={index}>
                      <TableCell className="feature-name">{feature.name}</TableCell>
                      <TableCell>
                        {feature.free ? <CheckIcon>✓</CheckIcon> : <CrossIcon>✗</CrossIcon>}
                      </TableCell>
                      <TableCell>
                        {feature.premium ? <CheckIcon>✓</CheckIcon> : <CrossIcon>✗</CrossIcon>}
                      </TableCell>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </ComparisonTable>
          </ComparisonSection>

          <TestimonialSection>
            <TestimonialText>
              "Cosmic Tab Coach has completely transformed my browsing habits. The premium themes are 
              gorgeous and the AI personalization really understands what I need to hear each day. 
              Best $2.99 I've ever spent!"
            </TestimonialText>
            <TestimonialAuthor>— Sarah K., Meditation Teacher</TestimonialAuthor>
          </TestimonialSection>

          <FAQSection>
            <FAQTitle>❓ Frequently Asked Questions</FAQTitle>
            
            <FAQItem>
              <FAQQuestion>Can I cancel my subscription anytime?</FAQQuestion>
              <FAQAnswer>
                Yes! If you choose monthly billing, you can cancel anytime. The one-time purchase 
                option gives you lifetime access with no recurring charges.
              </FAQAnswer>
            </FAQItem>

            <FAQItem>
              <FAQQuestion>What happens to my data if I downgrade?</FAQQuestion>
              <FAQAnswer>
                Your data stays safe and private. You'll keep access to free features, but premium 
                features like AI personalization and extra themes will be disabled.
              </FAQAnswer>
            </FAQItem>

            <FAQItem>
              <FAQQuestion>How does the AI personalization work?</FAQQuestion>
              <FAQAnswer>
                Our AI learns from your interactions (which affirmations you favorite, themes you prefer, 
                time of day patterns) to deliver more relevant content. All learning happens locally 
                on your device.
              </FAQAnswer>
            </FAQItem>

            <FAQItem>
              <FAQQuestion>Do you offer student discounts?</FAQQuestion>
              <FAQAnswer>
                Currently, our pricing is already very affordable for everyone. However, the free version 
                provides substantial value for students on a budget.
              </FAQAnswer>
            </FAQItem>

            <FAQItem>
              <FAQQuestion>Is there a free trial for premium features?</FAQQuestion>
              <FAQAnswer>
                Yes! All new users get a 7-day free trial of premium features. No credit card required 
                to start the trial.
              </FAQAnswer>
            </FAQItem>
          </FAQSection>
        </Content>
      </Container>
    </Layout>
  )
}

export default UpgradePage