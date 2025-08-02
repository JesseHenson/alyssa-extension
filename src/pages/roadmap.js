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
  max-width: 1200px;
  margin: 4rem auto 2rem;
`

const Header = styled.div`
  text-align: center;
  color: white;
  margin-bottom: 4rem;
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
  max-width: 700px;
  margin: 0 auto 2rem;
  line-height: 1.6;
`

const Timeline = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 3px;
    background: rgba(255, 255, 255, 0.3);
    transform: translateX(-50%);

    @media (max-width: 768px) {
      left: 20px;
    }
  }
`

const TimelinePhase = styled.div`
  margin-bottom: 4rem;
  position: relative;
`

const PhaseMarker = styled.div`
  position: absolute;
  left: 50%;
  top: 0;
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  transform: translateX(-50%);
  z-index: 2;

  @media (max-width: 768px) {
    left: 20px;
  }
`

const PhaseContent = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(20px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  margin-left: ${props => props.side === 'right' ? '60%' : '0'};
  margin-right: ${props => props.side === 'left' ? '60%' : '0'};

  @media (max-width: 768px) {
    margin-left: 60px;
    margin-right: 0;
  }
`

const PhaseTitle = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const PhaseTimeline = styled.span`
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 1rem;
  display: inline-block;
`

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`

const FeatureCard = styled.div`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  border-left: 4px solid ${props => {
    switch(props.type) {
      case 'ai': return '#667eea';
      case 'mindfulness': return '#4caf50';
      case 'social': return '#ff6b6b';
      case 'health': return '#9c27b0';
      default: return '#667eea';
    }
  }};

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`

const FeatureIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
`

const FeatureName = styled.h4`
  font-family: 'Poppins', sans-serif;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 600;
`

const FeatureDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
`

const FeatureType = styled.span`
  background: ${props => {
    switch(props.type) {
      case 'ai': return 'linear-gradient(45deg, #667eea, #764ba2)';
      case 'mindfulness': return 'linear-gradient(45deg, #4caf50, #66bb6a)';
      case 'social': return 'linear-gradient(45deg, #ff6b6b, #ee5a24)';
      case 'health': return 'linear-gradient(45deg, #9c27b0, #e91e63)';
      default: return 'linear-gradient(45deg, #667eea, #764ba2)';
    }
  }};
  color: white;
  padding: 0.2rem 0.6rem;
  border-radius: 10px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const VotingSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  margin-top: 3rem;
  text-align: center;
  backdrop-filter: blur(10px);
`

const VotingTitle = styled.h2`
  font-family: 'Poppins', sans-serif;
  color: white;
  margin-bottom: 1rem;
`

const VotingText = styled.p`
  color: white;
  opacity: 0.9;
  margin-bottom: 2rem;
  line-height: 1.6;
`

const VoteButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 1rem 2rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0 1rem;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
`

const phases = [
  {
    id: 'q1-2025',
    title: '🤖 AI Intelligence Phase',
    timeline: 'Q1 2025',
    side: 'left',
    features: [
      {
        icon: '🧠',
        name: 'Mood-Aware AI',
        description: 'AI detects your emotional state from browsing patterns and delivers perfectly timed affirmations for your current needs.',
        type: 'ai'
      },
      {
        icon: '🗣️',
        name: 'Voice Affirmations',
        description: 'Custom AI-generated voice affirmations in your choice of calming voices, including nature sounds integration.',
        type: 'ai'
      },
      {
        icon: '⏰',
        name: 'Smart Break Reminders',
        description: 'AI learns your work patterns and suggests perfect moments for mindfulness breaks before you burn out.',
        type: 'ai'
      },
      {
        icon: '🎯',
        name: 'Goal-Based Content',
        description: 'Set personal growth goals and receive AI-curated affirmations and exercises to support your journey.',
        type: 'ai'
      }
    ]
  },
  {
    id: 'q2-2025',
    title: '🧘 Deep Mindfulness Phase',
    timeline: 'Q2 2025',
    side: 'right',
    features: [
      {
        icon: '💨',
        name: 'Breathing Coach',
        description: 'Guided breathing exercises with visual cues and customizable patterns (4-7-8, box breathing, etc.).',
        type: 'mindfulness'
      },
      {
        icon: '🎵',
        name: 'Ambient Soundscapes',
        description: 'Curated nature sounds, binaural beats, and ambient music to enhance your mindful browsing experience.',
        type: 'mindfulness'
      },
      {
        icon: '📓',
        name: 'Gratitude Journal',
        description: 'Quick gratitude prompts and a beautiful journal interface to capture daily moments of appreciation.',
        type: 'mindfulness'
      },
      {
        icon: '🌅',
        name: 'Micro-Meditations',
        description: '30-second to 3-minute guided meditations that fit perfectly into your browsing breaks.',
        type: 'mindfulness'
      }
    ]
  },
  {
    id: 'q3-2025',
    title: '🌐 Digital Wellness Phase',
    timeline: 'Q3 2025',
    side: 'left',
    features: [
      {
        icon: '📊',
        name: 'Mindful Browsing Score',
        description: 'Track your digital wellness with insights on browsing habits, break frequency, and mindfulness engagement.',
        type: 'health'
      },
      {
        icon: '🚫',
        name: 'Focus Shield',
        description: 'Gentle interventions when visiting distracting websites, with breathing prompts and intention setting.',
        type: 'health'
      },
      {
        icon: '🌙',
        name: 'Circadian Sync',
        description: 'Themes and content that adapt to your natural circadian rhythm for better sleep and energy cycles.',
        type: 'health'
      },
      {
        icon: '📱',
        name: 'Cross-Platform Sync',
        description: 'Seamless experience across Chrome, mobile app, and smart home devices for 24/7 mindfulness support.',
        type: 'ai'
      }
    ]
  },
  {
    id: 'q4-2025',
    title: '💫 Community & Connection Phase',
    timeline: 'Q4 2025',
    side: 'right',
    features: [
      {
        icon: '🤝',
        name: 'Mindfulness Circles',
        description: 'Join small groups for shared mindfulness challenges and anonymous peer support.',
        type: 'social'
      },
      {
        icon: '✍️',
        name: 'Custom Affirmation Creator',
        description: 'AI helps you create personalized affirmations, or share your creations with the community.',
        type: 'social'
      },
      {
        icon: '🎨',
        name: 'Community Themes',
        description: 'Beautiful themes created by users and artists, with portion of proceeds supporting mental health.',
        type: 'social'
      },
      {
        icon: '🌍',
        name: 'Global Mindfulness Impact',
        description: 'See how your mindfulness practice contributes to a global community of conscious digital citizens.',
        type: 'social'
      }
    ]
  }
]

const RoadmapPage = () => {
  const [selectedType, setSelectedType] = useState('all')

  return (
    <Layout 
      title="Future Roadmap - Cosmic Tab Coach"
      description="Discover the exciting AI-powered and mindfulness features coming to Cosmic Tab Coach"
      showNav={true}
    >
      <Container>
        <BackButton to="/">← Back to Home</BackButton>
        
        <Content>
          <Header>
            <Title>🚀 The Future is Mindful</Title>
            <Subtitle>
              We're building the most advanced mindfulness browser experience ever created. 
              Here's our roadmap for transforming how you interact with technology through 
              AI-powered personalization and deep mindfulness integration.
            </Subtitle>
          </Header>

          <Timeline>
            {phases.map((phase, index) => (
              <TimelinePhase key={phase.id}>
                <PhaseMarker />
                <PhaseContent side={phase.side}>
                  <PhaseTimeline>{phase.timeline}</PhaseTimeline>
                  <PhaseTitle>{phase.title}</PhaseTitle>
                  
                  <FeatureGrid>
                    {phase.features.map((feature, featureIndex) => (
                      <FeatureCard key={featureIndex} type={feature.type}>
                        <FeatureIcon>{feature.icon}</FeatureIcon>
                        <FeatureName>{feature.name}</FeatureName>
                        <FeatureDescription>{feature.description}</FeatureDescription>
                        <FeatureType type={feature.type}>
                          {feature.type === 'ai' ? 'AI Powered' : 
                           feature.type === 'mindfulness' ? 'Mindfulness' :
                           feature.type === 'social' ? 'Community' : 'Wellness'}
                        </FeatureType>
                      </FeatureCard>
                    ))}
                  </FeatureGrid>
                </PhaseContent>
              </TimelinePhase>
            ))}
          </Timeline>

          <VotingSection>
            <VotingTitle>🗳️ Help Shape the Future</VotingTitle>
            <VotingText>
              Which features excite you most? Your feedback directly influences our development roadmap. 
              Join our community to vote on priorities and suggest new ideas.
            </VotingText>
            <div>
              <VoteButton onClick={() => alert('Feature voting will be available after Chrome Store launch! 🚀')}>
                Vote on Features
              </VoteButton>
              <VoteButton onClick={() => alert('Beta program opens Q1 2025! Get ready for early access. ✨')}>
                Join Beta Program
              </VoteButton>
              <VoteButton onClick={() => alert('Ideas portal coming soon! For now, reach out via social media. 💡')}>
                Suggest Ideas
              </VoteButton>
            </div>
          </VotingSection>
        </Content>
      </Container>
    </Layout>
  )
}

export default RoadmapPage