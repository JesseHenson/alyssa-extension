import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import Layout from '../components/Layout'
import { useAffirmations } from '../hooks/useAffirmations'

const twinkle = keyframes`
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
`

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const Container = styled.div`
  font-family: 'Inter', sans-serif;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  transition: background 0.5s ease;

  &.nature {
    background: linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%);
  }

  &.minimal {
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  }
`

const Stars = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const Star = styled.div`
  position: absolute;
  background: white;
  border-radius: 50%;
  opacity: 0.8;
  animation: ${twinkle} 3s infinite;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  left: ${props => props.left}%;
  top: ${props => props.top}%;
  animation-delay: ${props => props.delay}s;
`

const MainContent = styled.div`
  position: relative;
  z-index: 10;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
`

const Logo = styled.div`
  font-family: 'Poppins', sans-serif;
  font-size: 1.5rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 3rem;
  letter-spacing: 2px;

  .minimal & {
    color: #333;
  }
`

const AffirmationContainer = styled.div`
  max-width: 600px;
  margin-bottom: 4rem;
  animation: ${fadeInUp} 1s ease-out;
`

const AffirmationText = styled.div`
  font-family: 'Poppins', sans-serif;
  font-size: 2.2rem;
  font-weight: 400;
  color: white;
  line-height: 1.4;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  margin-bottom: 1rem;
  transition: opacity 0.3s ease;

  .minimal & {
    color: #333;
    text-shadow: none;
  }

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`

const AffirmationCategory = styled.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 300;
  transition: opacity 0.3s ease;

  .minimal & {
    color: rgba(51, 51, 51, 0.7);
  }
`

const BottomNav = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
  }
`

const NavButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  .minimal & {
    background: rgba(51, 51, 51, 0.1);
    border-color: rgba(51, 51, 51, 0.2);
    color: #333;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);

    .minimal & {
      background: rgba(51, 51, 51, 0.2);
    }
  }
`

const ThemeSwitcher = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
  display: flex;
  gap: 0.5rem;

  @media (max-width: 768px) {
    top: 1rem;
    right: 1rem;
    gap: 0.3rem;
  }
`

const ThemeOption = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    border-color: white;
  }

  &.cosmic {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }

  &.nature {
    background: linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%);
  }

  &.minimal {
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  }
`

const RefreshButton = styled.button`
  position: absolute;
  top: 2rem;
  left: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  font-size: 0.8rem;

  .minimal & {
    background: rgba(51, 51, 51, 0.1);
    border-color: rgba(51, 51, 51, 0.2);
    color: #333;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);

    .minimal & {
      background: rgba(51, 51, 51, 0.2);
    }
  }

  @media (max-width: 768px) {
    top: 1rem;
    left: 1rem;
    padding: 0.4rem 0.8rem;
  }
`

const PremiumBadge = styled.div`
  position: absolute;
  top: 50%;
  right: 2rem;
  transform: translateY(-50%);
  background: linear-gradient(45deg, #f093fb 0%, #f5576c 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0.8;

  @media (max-width: 768px) {
    right: 1rem;
    font-size: 0.6rem;
    padding: 0.4rem 0.8rem;
  }
`

const CosmicTab = () => {
  const { getThemedAffirmation, getRandomAffirmation } = useAffirmations()
  const [currentTheme, setCurrentTheme] = useState('cosmic')
  const [currentAffirmation, setCurrentAffirmation] = useState({
    text: "You are exactly where you need to be in this cosmic moment",
    category: "Present Moment Awareness"
  })
  const [stars, setStars] = useState([])

  // Generate stars on mount
  useEffect(() => {
    const newStars = []
    for (let i = 0; i < 50; i++) {
      newStars.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 3
      })
    }
    setStars(newStars)
  }, [])

  // Load initial affirmation
  useEffect(() => {
    newAffirmation()
  }, [])

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      newAffirmation()
    }, 30000)

    return () => clearInterval(interval)
  }, [currentTheme])

  const newAffirmation = () => {
    try {
      const affirmation = getThemedAffirmation(currentTheme)
      
      // Fade out
      const textElement = document.querySelector('[data-affirmation-text]')
      const categoryElement = document.querySelector('[data-affirmation-category]')
      
      if (textElement && categoryElement) {
        textElement.style.opacity = '0'
        categoryElement.style.opacity = '0'
        
        setTimeout(() => {
          setCurrentAffirmation(affirmation)
          textElement.style.opacity = '1'
          categoryElement.style.opacity = '1'
        }, 300)
      } else {
        setCurrentAffirmation(affirmation)
      }
    } catch (error) {
      console.error('Error getting affirmation:', error)
      setCurrentAffirmation({
        text: "You are exactly where you need to be in this cosmic moment",
        category: "Present Moment Awareness"
      })
    }
  }

  const setTheme = (themeName) => {
    setCurrentTheme(themeName)
    // Get a new themed affirmation
    setTimeout(newAffirmation, 100)
  }

  const showSettings = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/settings'
    }
  }

  const showUpgrade = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/upgrade'
    }
  }

  const showThemes = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/themes'
    }
  }

  const showDemo = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/affirmation-demo'
    }
  }

  return (
    <Layout 
      title="Cosmic Tab Coach - Main Interface"
      description="Experience the main new tab interface with AI-powered affirmations and cosmic themes"
      showBackButton={true}
    >
      <Container className={currentTheme}>
        <Stars>
          {stars.map(star => (
            <Star
              key={star.id}
              left={star.left}
              top={star.top}
              size={star.size}
              delay={star.delay}
              style={{
                opacity: currentTheme === 'minimal' ? 0.1 : 0.8
              }}
            />
          ))}
        </Stars>
        
        <RefreshButton onClick={newAffirmation}>
          ✨ New Affirmation
        </RefreshButton>

        <ThemeSwitcher>
          <ThemeOption 
            className="cosmic" 
            onClick={() => setTheme('cosmic')}
            title="Cosmic Calm"
          />
          <ThemeOption 
            className="nature" 
            onClick={() => setTheme('nature')}
            title="Nature Serenity"
          />
          <ThemeOption 
            className="minimal" 
            onClick={() => setTheme('minimal')}
            title="Minimal Focus"
          />
        </ThemeSwitcher>

        <PremiumBadge>
          Premium ⭐
        </PremiumBadge>

        <MainContent>
          <Logo>COSMIC TAB COACH</Logo>
          
          <AffirmationContainer>
            <AffirmationText data-affirmation-text>
              {currentAffirmation.text}
            </AffirmationText>
            <AffirmationCategory data-affirmation-category>
              {currentAffirmation.category}
            </AffirmationCategory>
          </AffirmationContainer>

          <BottomNav>
            <NavButton onClick={showSettings}>⚙️ Settings</NavButton>
            <NavButton onClick={showThemes}>🎨 Themes</NavButton>
            <NavButton onClick={showDemo}>🤖 Demo</NavButton>
            <NavButton onClick={showUpgrade}>✨ Upgrade</NavButton>
          </BottomNav>
        </MainContent>
      </Container>
    </Layout>
  )
}

export default CosmicTab