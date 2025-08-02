import React, { useState } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import Layout from '../components/Layout'
import { cosmicTheme } from '../cosmic-theme'

// Hero Section Styles
const HeroSection = styled.section`
  background: ${cosmicTheme.gradients.primary};
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${cosmicTheme.space[8]};
  position: relative;
  overflow: hidden;
`

const HeroContent = styled.div`
  max-width: 800px;
  text-align: center;
  color: ${cosmicTheme.colors.text.inverse};
  z-index: 2;
`

const HeroTitle = styled.h1`
  font-family: ${cosmicTheme.typography.fonts.heading};
  font-size: ${cosmicTheme.typography.fontSizes['8xl']};
  font-weight: ${cosmicTheme.typography.fontWeights.bold};
  margin-bottom: ${cosmicTheme.space[6]};
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);

  @media (max-width: ${cosmicTheme.breakpoints.md}) {
    font-size: ${cosmicTheme.typography.fontSizes['6xl']};
  }
`

const HeroSubtitle = styled.p`
  font-size: ${cosmicTheme.typography.fontSizes['2xl']};
  margin-bottom: ${cosmicTheme.space[8]};
  opacity: 0.95;
  line-height: ${cosmicTheme.typography.lineHeights.relaxed};
  font-weight: ${cosmicTheme.typography.fontWeights.light};

  @media (max-width: ${cosmicTheme.breakpoints.md}) {
    font-size: ${cosmicTheme.typography.fontSizes.xl};
  }
`

const CTAButton = styled.a`
  display: inline-block;
  background: ${cosmicTheme.gradients.cta};
  color: ${cosmicTheme.colors.text.onAccent};
  padding: ${cosmicTheme.space[5]} ${cosmicTheme.space[10]};
  border-radius: ${cosmicTheme.radii.pill};
  font-weight: ${cosmicTheme.typography.fontWeights.semibold};
  font-size: ${cosmicTheme.typography.fontSizes.xl};
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: ${cosmicTheme.typography.letterSpacing.wider};
  box-shadow: ${cosmicTheme.shadows.cta};
  transition: ${cosmicTheme.transitions.all};
  margin: 0 ${cosmicTheme.space[4]} ${cosmicTheme.space[4]} 0;

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${cosmicTheme.shadows.ctaHover};
  }

  @media (max-width: ${cosmicTheme.breakpoints.md}) {
    padding: ${cosmicTheme.space[4]} ${cosmicTheme.space[8]};
    font-size: ${cosmicTheme.typography.fontSizes.lg};
    margin: ${cosmicTheme.space[2]};
    display: block;
    margin-bottom: ${cosmicTheme.space[4]};
  }
`

const SecondaryButton = styled(Link)`
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  color: ${cosmicTheme.colors.text.inverse};
  padding: ${cosmicTheme.space[5]} ${cosmicTheme.space[10]};
  border-radius: ${cosmicTheme.radii.pill};
  font-weight: ${cosmicTheme.typography.fontWeights.semibold};
  font-size: ${cosmicTheme.typography.fontSizes.xl};
  text-decoration: none;
  border: 2px solid rgba(255, 255, 255, 0.3);
  transition: ${cosmicTheme.transitions.all};
  margin: 0 ${cosmicTheme.space[4]};

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }

  @media (max-width: ${cosmicTheme.breakpoints.md}) {
    padding: ${cosmicTheme.space[4]} ${cosmicTheme.space[8]};
    font-size: ${cosmicTheme.typography.fontSizes.lg};
    margin: ${cosmicTheme.space[2]};
    display: block;
  }
`

// Features Section Styles
const FeaturesSection = styled.section`
  background: ${cosmicTheme.colors.background.primary};
  padding: ${cosmicTheme.space[20]} ${cosmicTheme.space[8]};
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const SectionTitle = styled.h2`
  font-family: ${cosmicTheme.typography.fonts.heading};
  font-size: ${cosmicTheme.typography.fontSizes['6xl']};
  text-align: center;
  margin-bottom: ${cosmicTheme.space[4]};
  color: ${cosmicTheme.colors.text.primary};
  font-weight: ${cosmicTheme.typography.fontWeights.bold};
`

const SectionSubtitle = styled.p`
  text-align: center;
  font-size: ${cosmicTheme.typography.fontSizes.xl};
  color: ${cosmicTheme.colors.text.secondary};
  margin-bottom: ${cosmicTheme.space[12]};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${cosmicTheme.space[8]};
  margin-bottom: ${cosmicTheme.space[12]};
`

const FeatureCard = styled.div`
  background: ${cosmicTheme.colors.background.primary};
  border-radius: ${cosmicTheme.radii['3xl']};
  padding: ${cosmicTheme.space[8]};
  box-shadow: ${cosmicTheme.shadows.lg};
  transition: ${cosmicTheme.transitions.all};
  text-align: center;
  border: 1px solid ${cosmicTheme.colors.gray[100]};

  &:hover {
    transform: translateY(-10px);
    box-shadow: ${cosmicTheme.shadows.xl};
  }
`

const FeatureIcon = styled.div`
  font-size: ${cosmicTheme.typography.fontSizes['7xl']};
  margin-bottom: ${cosmicTheme.space[4]};
`

const FeatureTitle = styled.h3`
  font-family: ${cosmicTheme.typography.fonts.heading};
  font-size: ${cosmicTheme.typography.fontSizes['2xl']};
  margin-bottom: ${cosmicTheme.space[4]};
  color: ${cosmicTheme.colors.text.primary};
  font-weight: ${cosmicTheme.typography.fontWeights.semibold};
`

const FeatureDescription = styled.p`
  color: ${cosmicTheme.colors.text.secondary};
  line-height: ${cosmicTheme.typography.lineHeights.relaxed};
`

// Screenshot Section Styles
const ScreenshotSection = styled.section`
  background: ${cosmicTheme.gradients.themes.minimal};
  padding: ${cosmicTheme.space[20]} ${cosmicTheme.space[8]};
`

const ScreenshotGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 3rem;
  margin-top: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const ScreenshotCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.15);
  }
`

const ScreenshotImage = styled.div`
  width: 100%;
  height: 250px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  font-weight: 500;
`

const ScreenshotTitle = styled.h4`
  font-family: 'Poppins', sans-serif;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 600;
`

const ScreenshotDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
`

// Pricing Section Styles
const PricingSection = styled.section`
  background: white;
  padding: 5rem 2rem;
`

const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 800px;
  margin: 3rem auto 0;
`

const PricingCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  border: 2px solid ${props => props.featured ? '#667eea' : '#f0f0f0'};
  position: relative;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.15);
  }
`

const PricingBadge = styled.div`
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  text-transform: uppercase;
  letter-spacing: 1px;
`

const PricingTitle = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
  font-weight: 600;
`

const PricingPrice = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 0.5rem;
`

const PricingPeriod = styled.div`
  color: #666;
  margin-bottom: 2rem;
`

const PricingFeatures = styled.ul`
  list-style: none;
  margin-bottom: 2rem;
  text-align: left;
`

const PricingFeature = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
  color: #555;

  &::before {
    content: "✓";
    color: #4caf50;
    font-weight: bold;
    margin-right: 0.8rem;
  }
`

const PricingButton = styled.a`
  display: block;
  background: ${props => props.featured ? 
    'linear-gradient(45deg, #667eea, #764ba2)' : 
    'linear-gradient(45deg, #ff6b6b, #ee5a24)'};
  color: white;
  padding: 1rem 2rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
  }
`

// New Mindful Coach Announcement Styles
const AnnouncementSection = styled.section`
  background: ${cosmicTheme.gradients.announcement};
  padding: ${cosmicTheme.space[16]} ${cosmicTheme.space[8]};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    animation: cosmic-pulse 8s ease-in-out infinite;
    pointer-events: none;
  }

  @keyframes cosmic-pulse {
    0%, 100% { transform: scale(0.8) rotate(0deg); opacity: 0.3; }
    50% { transform: scale(1.2) rotate(180deg); opacity: 0.6; }
  }
`

const AnnouncementContent = styled.div`
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
  color: ${cosmicTheme.colors.text.inverse};
  position: relative;
  z-index: 2;
`

const AnnouncementBadge = styled.div`
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  color: ${cosmicTheme.colors.text.inverse};
  padding: ${cosmicTheme.space[3]} ${cosmicTheme.space[8]};
  border-radius: ${cosmicTheme.radii['4xl']};
  font-weight: ${cosmicTheme.typography.fontWeights.semibold};
  font-size: ${cosmicTheme.typography.fontSizes.md};
  margin-bottom: ${cosmicTheme.space[6]};
  text-transform: uppercase;
  letter-spacing: ${cosmicTheme.typography.letterSpacing.widest};
  border: 2px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
`

const AnnouncementTitle = styled.h2`
  font-family: ${cosmicTheme.typography.fonts.heading};
  font-size: ${cosmicTheme.typography.fontSizes['7xl']};
  font-weight: ${cosmicTheme.typography.fontWeights.bold};
  margin-bottom: ${cosmicTheme.space[6]};
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  line-height: ${cosmicTheme.typography.lineHeights.tight};

  @media (max-width: ${cosmicTheme.breakpoints.md}) {
    font-size: ${cosmicTheme.typography.fontSizes['5xl']};
  }
`

const AnnouncementSubtitle = styled.p`
  font-size: 1.3rem;
  margin-bottom: 2rem;
  opacity: 0.95;
  line-height: 1.6;
  font-weight: 300;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`

const AnnouncementFeatures = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`

const AnnouncementFeature = styled.div`
  background: rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-5px);
  }
`

const AnnouncementFeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`

const AnnouncementFeatureTitle = styled.h4`
  font-family: 'Poppins', sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
  color: white;
`

const AnnouncementFeatureDesc = styled.p`
  font-size: 0.9rem;
  opacity: 0.9;
  line-height: 1.5;
  color: white;
`

const AnnouncementCTA = styled.div`
  margin-top: 2.5rem;
`

const AnnouncementButton = styled(Link)`
  display: inline-block;
  background: white;
  color: #ff6b6b;
  padding: 1.2rem 2.5rem;
  border-radius: 50px;
  font-weight: 700;
  font-size: 1.1rem;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  margin: 0 1rem;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
    background: #f8f9fa;
  }

  @media (max-width: 768px) {
    padding: 1rem 2rem;
    font-size: 1rem;
    margin: 0.5rem;
    display: block;
    margin-bottom: 1rem;
  }
`

// Data for the landing page
const features = [
  {
    icon: '🧘‍♀️',
    title: 'AI Mindful Coach',
    description: 'Your personal cosmic wellness guide that detects stress patterns and offers gentle wisdom with guided interventions when you need them most.'
  },
  {
    icon: '🌟',
    title: 'AI-Powered Affirmations',
    description: 'Personalized positive affirmations delivered every time you open a new tab, carefully crafted to boost your mindset and energy.'
  },
  {
    icon: '🎨',
    title: 'Beautiful Themes',
    description: 'Choose from stunning cosmic-inspired themes that transform your browser into a peaceful, mindful space.'
  },
  {
    icon: '🔒',
    title: 'Privacy First',
    description: 'All data stays local on your device. No tracking, no data collection, just pure mindful moments.'
  },
  {
    icon: '📱',
    title: 'Cross-Device Sync',
    description: 'Sync your preferences and favorites across all your Chrome browsers and devices.'
  },
  {
    icon: '💎',
    title: 'Premium Content',
    description: 'Unlock exclusive themes, personalized AI content, and advanced customization options.'
  }
]

const screenshots = [
  {
    title: 'AI Mindful Coach in Action',
    description: 'Your personal wellness guide detects stress patterns and offers gentle, cosmic wisdom with guided breathing and grounding exercises.',
    image: '🧘‍♀️ Mindful Coach Interface'
  },
  {
    title: 'Beautiful New Tab Experience',
    description: 'Transform every new tab into a moment of peace and positivity with cosmic backgrounds and inspiring affirmations.',
    image: 'New Tab Interface'
  },
  {
    title: 'Personalized Settings',
    description: 'Customize themes, affirmation frequency, and content preferences to match your unique mindfulness journey.',
    image: 'Settings Panel'
  },
  {
    title: 'Smart Affirmation System',
    description: 'Our AI delivers contextually relevant affirmations based on time of day, your mood, and personal preferences.',
    image: 'Affirmation Engine'
  }
]

const IndexPage = () => {
  const [isMonthly, setIsMonthly] = useState(true)

  // Chrome Web Store URL (placeholder for now)
  const chromeStoreUrl = "https://chrome.google.com/webstore/detail/cosmic-tab-coach/placeholder"

  return (
    <Layout 
      title="Cosmic Tab Coach - Transform Every Tab Into a Mindful Moment"
      description="AI-powered Chrome extension that transforms new tabs into moments of positivity, peace, and personal growth. Get personalized affirmations and beautiful themes."
      showNav={true}
    >
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <HeroTitle>🌟 Cosmic Tab Coach</HeroTitle>
          <HeroSubtitle>
            The first browser extension with an AI Mindful Coach that detects your stress and guides you 
            to cosmic peace. Transform every tab into a mindful moment with gentle wisdom and wellness interventions.
          </HeroSubtitle>
          <div>
            <CTAButton href={chromeStoreUrl} target="_blank" rel="noopener noreferrer">
              Add to Chrome - Free
            </CTAButton>
            <SecondaryButton to="/cosmic-tab">
              Try Demo
            </SecondaryButton>
          </div>
        </HeroContent>
      </HeroSection>

      {/* NEW: Mindful Coach Announcement */}
      <AnnouncementSection>
        <AnnouncementContent>
          <AnnouncementBadge>✨ Just Launched</AnnouncementBadge>
          <AnnouncementTitle>🧘‍♀️ Meet Your AI Mindful Coach</AnnouncementTitle>
          <AnnouncementSubtitle>
            The first browser extension with an AI wellness coach that detects when you're overwhelmed 
            and offers gentle, cosmic wisdom to guide you back to your center.
          </AnnouncementSubtitle>
          
          <AnnouncementFeatures>
            <AnnouncementFeature>
              <AnnouncementFeatureIcon>🫂</AnnouncementFeatureIcon>
              <AnnouncementFeatureTitle>Stress Detection</AnnouncementFeatureTitle>
              <AnnouncementFeatureDesc>
                AI analyzes your messages to detect overwhelm, anxiety, and urgency patterns with gentle awareness.
              </AnnouncementFeatureDesc>
            </AnnouncementFeature>
            
            <AnnouncementFeature>
              <AnnouncementFeatureIcon>🌌</AnnouncementFeatureIcon>
              <AnnouncementFeatureTitle>Cosmic Wisdom</AnnouncementFeatureTitle>
              <AnnouncementFeatureDesc>
                Receive guidance in our signature gentle, non-judgmental voice using cosmic metaphors and loving support.
              </AnnouncementFeatureDesc>
            </AnnouncementFeature>
            
            <AnnouncementFeature>
              <AnnouncementFeatureIcon>💨</AnnouncementFeatureIcon>
              <AnnouncementFeatureTitle>Guided Interventions</AnnouncementFeatureTitle>
              <AnnouncementFeatureDesc>
                Interactive breathing exercises, grounding techniques, and perspective shifts when you need them most.
              </AnnouncementFeatureDesc>
            </AnnouncementFeature>
          </AnnouncementFeatures>

          <AnnouncementCTA>
            <AnnouncementButton to="/cosmic-tab">
              Try the Coach Now
            </AnnouncementButton>
          </AnnouncementCTA>
        </AnnouncementContent>
      </AnnouncementSection>

      {/* Features Section */}
      <FeaturesSection>
        <Container>
          <SectionTitle>Why Choose Cosmic Tab Coach?</SectionTitle>
          <SectionSubtitle>
            More than just a new tab page - it's your AI-powered wellness companion with a personal 
            mindful coach that understands your stress and guides you to cosmic peace.
          </SectionSubtitle>
          <FeaturesGrid>
            {features.map((feature, index) => (
              <FeatureCard key={index}>
                <FeatureIcon>{feature.icon}</FeatureIcon>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureCard>
            ))}
          </FeaturesGrid>
        </Container>
      </FeaturesSection>

      {/* Screenshots Section */}
      <ScreenshotSection>
        <Container>
          <SectionTitle>See It In Action</SectionTitle>
          <SectionSubtitle>
            Experience the beautiful, mindful interface that transforms your browsing experience.
          </SectionSubtitle>
          <ScreenshotGrid>
            {screenshots.map((screenshot, index) => (
              <ScreenshotCard key={index}>
                <ScreenshotImage>
                  {screenshot.image}
                </ScreenshotImage>
                <ScreenshotTitle>{screenshot.title}</ScreenshotTitle>
                <ScreenshotDescription>{screenshot.description}</ScreenshotDescription>
              </ScreenshotCard>
            ))}
          </ScreenshotGrid>
        </Container>
      </ScreenshotSection>

      {/* Pricing Section */}
      <PricingSection>
        <Container>
          <SectionTitle>Simple, Honest Pricing</SectionTitle>
          <SectionSubtitle>
            Start free forever. Upgrade when you're ready for premium mindfulness features.
          </SectionSubtitle>
          <PricingGrid>
            <PricingCard>
              <PricingTitle>Free Forever</PricingTitle>
              <PricingPrice>$0</PricingPrice>
              <PricingPeriod>Always free</PricingPeriod>
              <PricingFeatures>
                <PricingFeature>Daily affirmations</PricingFeature>
                <PricingFeature>🧘‍♀️ Basic Mindful Coach (3 sessions/day)</PricingFeature>
                <PricingFeature>3 beautiful themes</PricingFeature>
                <PricingFeature>Basic customization</PricingFeature>
                <PricingFeature>Privacy-first approach</PricingFeature>
                <PricingFeature>No ads, ever</PricingFeature>
              </PricingFeatures>
              <PricingButton href={chromeStoreUrl} target="_blank" rel="noopener noreferrer">
                Get Started Free
              </PricingButton>
            </PricingCard>

            <PricingCard featured>
              <PricingBadge>Most Popular</PricingBadge>
              <PricingTitle>Premium</PricingTitle>
              <PricingPrice>${isMonthly ? '0.99' : '2.99'}</PricingPrice>
              <PricingPeriod>{isMonthly ? 'per month' : 'one-time'}</PricingPeriod>
              <PricingFeatures>
                <PricingFeature>Everything in Free</PricingFeature>
                <PricingFeature>🧘‍♀️ AI Mindful Coach with unlimited sessions</PricingFeature>
                <PricingFeature>🫂 Advanced stress detection & wellness interventions</PricingFeature>
                <PricingFeature>AI-personalized content</PricingFeature>
                <PricingFeature>10+ premium themes</PricingFeature>
                <PricingFeature>Advanced customization</PricingFeature>
                <PricingFeature>Cross-device sync</PricingFeature>
                <PricingFeature>Priority support</PricingFeature>
              </PricingFeatures>
              <PricingButton featured href="#upgrade">
                Upgrade to Premium
              </PricingButton>
            </PricingCard>
          </PricingGrid>
          
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button 
              onClick={() => setIsMonthly(!isMonthly)}
              style={{
                background: 'none',
                border: '2px solid #667eea',
                borderRadius: '25px',
                padding: '0.8rem 1.5rem',
                color: '#667eea',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Switch to {isMonthly ? 'One-time' : 'Monthly'} Pricing
            </button>
          </div>
        </Container>
      </PricingSection>

      {/* Roadmap Teaser Section */}
      <FeaturesSection style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
        <Container>
          <SectionTitle>🚀 Exciting Features Coming Soon</SectionTitle>
          <SectionSubtitle>
            We're building the future of mindful browsing with AI-powered personalization and deeper wellness integration.
          </SectionSubtitle>
          
          <FeaturesGrid style={{ marginBottom: '2rem' }}>
            <FeatureCard>
              <FeatureIcon>🧠</FeatureIcon>
              <FeatureTitle>Mood-Aware AI</FeatureTitle>
              <FeatureDescription>
                AI that detects your emotional state and delivers perfectly timed affirmations for your current needs.
              </FeatureDescription>
            </FeatureCard>
            
            <FeatureCard>
              <FeatureIcon>🗣️</FeatureIcon>
              <FeatureTitle>Voice Affirmations</FeatureTitle>
              <FeatureDescription>
                Custom AI-generated voice affirmations with soothing nature soundscapes for deeper mindfulness.
              </FeatureDescription>
            </FeatureCard>
            
            <FeatureCard>
              <FeatureIcon>🤝</FeatureIcon>
              <FeatureTitle>Mindfulness Circles</FeatureTitle>
              <FeatureDescription>
                Join small groups for shared mindfulness challenges and anonymous peer support.
              </FeatureDescription>
            </FeatureCard>
          </FeaturesGrid>
          
          <div style={{ textAlign: 'center' }}>
            <SecondaryButton to="/roadmap" style={{ 
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              color: 'white',
              border: 'none'
            }}>
              🗺️ View Full Roadmap
            </SecondaryButton>
          </div>
        </Container>
      </FeaturesSection>

      {/* Final CTA Section */}
      <HeroSection style={{ minHeight: '60vh' }}>
        <HeroContent>
          <HeroTitle style={{ fontSize: '2.5rem' }}>Ready to Transform Your Browsing?</HeroTitle>
          <HeroSubtitle>
            Join thousands of users who've made mindfulness a daily habit with Cosmic Tab Coach.
          </HeroSubtitle>
          <div>
            <CTAButton href={chromeStoreUrl} target="_blank" rel="noopener noreferrer">
              Add to Chrome - Free
            </CTAButton>
            <SecondaryButton to="/cosmic-tab">
              View Live Demo
            </SecondaryButton>
          </div>
          <p style={{ marginTop: '1rem', opacity: 0.8, fontSize: '0.9rem' }}>
            ⭐ Free forever • No signup required • Privacy-first • 30-second setup
          </p>
        </HeroContent>
      </HeroSection>
    </Layout>
  )
}

export default IndexPage