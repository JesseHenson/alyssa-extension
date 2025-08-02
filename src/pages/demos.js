import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import Layout from '../components/Layout'

const Container = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding: 2rem;
`

const Content = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`

const Header = styled.div`
  text-align: center;
  color: white;
  margin-bottom: 3rem;
`

const Title = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const Subtitle = styled.p`
  font-size: 1.1rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`

const BackButton = styled(Link)`
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  text-decoration: none;
  margin-bottom: 2rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
`

const MockupsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const MockupCard = styled(Link)`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(20px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  color: inherit;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
  }
`

const MockupIcon = styled.div`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 1rem;
`

const MockupTitle = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
  text-align: center;
`

const MockupDescription = styled.p`
  color: #666;
  line-height: 1.5;
  text-align: center;
  margin-bottom: 1.5rem;
`

const FeatureList = styled.ul`
  list-style: none;
  margin-bottom: 1.5rem;
`

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #555;

  &::before {
    content: "✨";
    margin-right: 0.5rem;
  }
`

const ViewButton = styled.div`
  width: 100%;
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  padding: 0.8rem;
  border-radius: 12px;
  font-weight: 500;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
  }
`

const InfoSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  color: white;
  text-align: center;
  backdrop-filter: blur(10px);
`

const InfoTitle = styled.h2`
  font-family: 'Poppins', sans-serif;
  margin-bottom: 1rem;
`

const InfoText = styled.p`
  opacity: 0.9;
  line-height: 1.6;
`

const mockups = [
  {
    path: '/cosmic-tab',
    icon: '🏠',
    title: 'Main New Tab Interface',
    description: 'The core experience - what users see when they open a new tab',
    features: [
      'Interactive affirmation rotation',
      'Theme switching (3 free themes)',
      'Animated cosmic background',
      'Working navigation buttons',
      'Refresh button for new content'
    ]
  },
  {
    path: '/settings',
    icon: '⚙️',
    title: 'Settings Panel',
    description: 'Comprehensive settings interface for customization',
    features: [
      'Interactive theme selection grid',
      'Live frequency controls',
      'Text size adjustment slider',
      'Toggle switches for preferences',
      'Premium features preview'
    ]
  },
  {
    path: '/themes',
    icon: '🎨',
    title: 'Theme Gallery',
    description: 'Visual gallery of all available themes with live previews',
    features: [
      '10+ theme variations',
      'Free vs Premium indicators',
      'Interactive theme previews',
      'Detailed theme descriptions',
      'Premium unlock modals'
    ]
  },
  {
    path: '/upgrade',
    icon: '✨',
    title: 'Premium Upgrade Flow',
    description: 'Compelling upgrade experience with feature comparison',
    features: [
      'Monthly vs one-time pricing toggle',
      'Comprehensive feature comparison',
      'Social proof testimonials',
      'FAQ section',
      'Clear value proposition'
    ]
  },
  {
    path: '/affirmation-demo',
    icon: '🤖',
    title: 'Affirmation System Demo',
    description: 'Interactive demonstration of the JSON-based affirmation engine',
    features: [
      '500+ curated affirmations',
      '12 themed categories',
      'Live search functionality',
      'Theme-based selection',
      'Real-time statistics'
    ]
  }
]

const DemosPage = () => {
  return (
    <Layout 
      title="Interactive Demos - Cosmic Tab Coach"
      description="Explore the complete user experience of Cosmic Tab Coach Chrome extension through interactive mockups and demonstrations"
    >
      <Container>
        <Content>
          <BackButton to="/">← Back to Main Site</BackButton>
          
          <Header>
            <Title>🌟 Interactive Demos</Title>
            <Subtitle>
              Explore the complete user experience of Cosmic Tab Coach through interactive mockups. 
              Click on any demo to experience the interface.
            </Subtitle>
          </Header>

          <MockupsGrid>
            {mockups.map((mockup, index) => (
              <MockupCard key={index} to={mockup.path}>
                <MockupIcon>{mockup.icon}</MockupIcon>
                <MockupTitle>{mockup.title}</MockupTitle>
                <MockupDescription>{mockup.description}</MockupDescription>
                <FeatureList>
                  {mockup.features.map((feature, featureIndex) => (
                    <FeatureItem key={featureIndex}>{feature}</FeatureItem>
                  ))}
                </FeatureList>
                <ViewButton>
                  Explore {mockup.title.split(' ')[0]}
                </ViewButton>
              </MockupCard>
            ))}
          </MockupsGrid>

          <InfoSection>
            <InfoTitle>💡 About These Demos</InfoTitle>
            <InfoText>
              These interactive React components demonstrate the complete user experience of Cosmic Tab Coach. 
              They feature working animations, theme switching, and realistic content to showcase the 
              extension's gentle, mindful approach to browser enhancement. Each demo represents a 
              different aspect of the user journey from first use to premium upgrade.
            </InfoText>
          </InfoSection>
        </Content>
      </Container>
    </Layout>
  )
}

export default DemosPage