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
  margin-bottom: 3rem;
`

const Title = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
`

const Subtitle = styled.p`
  font-size: 1.1rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`

const FilterTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
`

const FilterTab = styled.button`
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'};
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`

const ThemesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`

const ThemeCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 1.5rem;
  backdrop-filter: blur(20px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
  }
`

const ThemePreview = styled.div`
  aspect-ratio: 16/9;
  border-radius: 12px;
  margin-bottom: 1rem;
  position: relative;
  overflow: hidden;
  cursor: pointer;

  &.cosmic {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }

  &.nature {
    background: linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%);
  }

  &.minimal {
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  }

  &.sunset {
    background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  }

  &.ocean {
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  }

  &.candy {
    background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
  }

  &.aurora {
    background: linear-gradient(135deg, #00c6ff 0%, #0072ff 100%);
  }

  &.forest {
    background: linear-gradient(135deg, #134e5e 0%, #71b280 100%);
  }

  &.lavender {
    background: linear-gradient(135deg, #8360c3 0%, #2ebf91 100%);
  }

  &.gold {
    background: linear-gradient(135deg, #f7971e 0%, #ffd200 100%);
  }
`

const ThemePreviewContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
`

const PreviewText = styled.div`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`

const PreviewCategory = styled.div`
  font-size: 0.8rem;
  opacity: 0.8;
`

const ThemeInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`

const ThemeDetails = styled.div`
  flex: 1;
`

const ThemeName = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #333;
`

const ThemeDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
`

const ThemeBadge = styled.div`
  background: ${props => props.premium ? 'linear-gradient(45deg, #667eea, #764ba2)' : '#4caf50'};
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
  margin-left: 1rem;
`

const ThemeActions = styled.div`
  display: flex;
  gap: 0.5rem;
`

const ActionButton = styled.button`
  flex: 1;
  padding: 0.8rem 1rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &.primary {
    background: linear-gradient(45deg, #667eea, #764ba2);
    color: white;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
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

const PremiumModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 2rem;
`

const ModalContent = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  max-width: 400px;
  text-align: center;
`

const ModalTitle = styled.h3`
  font-family: 'Poppins', sans-serif;
  margin-bottom: 1rem;
  color: #333;
`

const ModalText = styled.p`
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.6;
`

const ModalActions = styled.div`
  display: flex;
  gap: 1rem;
`

const themes = [
  {
    id: 'cosmic',
    name: 'Cosmic Calm',
    description: 'Deep space vibes with purple and blue gradients. Perfect for evening meditation.',
    className: 'cosmic',
    premium: false,
    category: 'free',
    previewText: 'You are stardust contemplating the universe'
  },
  {
    id: 'nature',
    name: 'Nature Serenity',
    description: 'Fresh green tones inspired by forests and meadows. Great for morning energy.',
    className: 'nature',
    premium: false,
    category: 'free',
    previewText: 'Like a tree, you grow stronger with time'
  },
  {
    id: 'minimal',
    name: 'Minimal Focus',
    description: 'Clean, distraction-free design for maximum concentration and clarity.',
    className: 'minimal',
    premium: false,
    category: 'free',
    previewText: 'Simplicity is the ultimate sophistication'
  },
  {
    id: 'sunset',
    name: 'Sunset Bliss',
    description: 'Warm orange and red hues that evoke peaceful evening sunsets.',
    className: 'sunset',
    premium: true,
    category: 'premium',
    previewText: 'Every sunset is a new beginning'
  },
  {
    id: 'ocean',
    name: 'Ocean Depths',
    description: 'Deep blue gradients that capture the calm of ocean depths.',
    className: 'ocean',
    premium: true,
    category: 'premium',
    previewText: 'Be like water - flowing and adaptable'
  },
  {
    id: 'candy',
    name: 'Cotton Candy',
    description: 'Soft pink and blue pastels for a dreamy, gentle experience.',
    className: 'candy',
    premium: true,
    category: 'premium',
    previewText: 'Life is sweet when you focus on joy'
  },
  {
    id: 'aurora',
    name: 'Aurora Borealis',
    description: 'Vibrant blues and greens inspired by northern lights.',
    className: 'aurora',
    premium: true,
    category: 'premium',
    previewText: 'You are a light in the darkness'
  },
  {
    id: 'forest',
    name: 'Mystic Forest',
    description: 'Deep teal and green tones that evoke ancient wisdom.',
    className: 'forest',
    premium: true,
    category: 'premium',
    previewText: 'In stillness, you find your true nature'
  },
  {
    id: 'lavender',
    name: 'Lavender Dreams',
    description: 'Soft purple and turquoise for relaxation and peace.',
    className: 'lavender',
    premium: true,
    category: 'premium',
    previewText: 'Breathe in peace, breathe out stress'
  },
  {
    id: 'gold',
    name: 'Golden Hour',
    description: 'Warm gold and yellow tones for positivity and energy.',
    className: 'gold',
    premium: true,
    category: 'premium',
    previewText: 'You shine brighter than you know'
  }
]

const ThemesPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState(null)

  const filteredThemes = themes.filter(theme => {
    if (selectedFilter === 'all') return true
    return theme.category === selectedFilter
  })

  const handleThemeSelect = (theme) => {
    if (theme.premium) {
      setSelectedTheme(theme)
      setShowModal(true)
    } else {
      // Apply theme (in real extension, this would update the theme)
      alert(`Theme "${theme.name}" applied! 🎨`)
    }
  }

  return (
    <Layout 
      title="Theme Gallery - Cosmic Tab Coach"
      description="Explore beautiful themes for your cosmic affirmation experience"
    >
      <Container>
        <BackButton to="/cosmic-tab">← Back to New Tab</BackButton>
        
        <Content>
          <Header>
            <Title>🎨 Theme Gallery</Title>
            <Subtitle>
              Transform your new tab experience with beautiful, mindfully designed themes. 
              Each theme is crafted to promote tranquility and focus.
            </Subtitle>
          </Header>

          <FilterTabs>
            <FilterTab 
              active={selectedFilter === 'all'}
              onClick={() => setSelectedFilter('all')}
            >
              All Themes
            </FilterTab>
            <FilterTab 
              active={selectedFilter === 'free'}
              onClick={() => setSelectedFilter('free')}
            >
              Free Themes
            </FilterTab>
            <FilterTab 
              active={selectedFilter === 'premium'}
              onClick={() => setSelectedFilter('premium')}
            >
              Premium Themes ⭐
            </FilterTab>
          </FilterTabs>

          <ThemesGrid>
            {filteredThemes.map(theme => (
              <ThemeCard key={theme.id}>
                <ThemePreview 
                  className={theme.className}
                  onClick={() => handleThemeSelect(theme)}
                >
                  <ThemePreviewContent>
                    <PreviewText>{theme.previewText}</PreviewText>
                    <PreviewCategory>Mindfulness • Growth</PreviewCategory>
                  </ThemePreviewContent>
                </ThemePreview>

                <ThemeInfo>
                  <ThemeDetails>
                    <ThemeName>{theme.name}</ThemeName>
                    <ThemeDescription>{theme.description}</ThemeDescription>
                  </ThemeDetails>
                  <ThemeBadge premium={theme.premium}>
                    {theme.premium ? 'Premium ⭐' : 'Free'}
                  </ThemeBadge>
                </ThemeInfo>

                <ThemeActions>
                  <ActionButton 
                    className="secondary"
                    onClick={() => {/* Preview theme */}}
                  >
                    Preview
                  </ActionButton>
                  <ActionButton 
                    className="primary"
                    disabled={theme.premium}
                    onClick={() => handleThemeSelect(theme)}
                  >
                    {theme.premium ? 'Unlock Premium' : 'Apply Theme'}
                  </ActionButton>
                </ThemeActions>
              </ThemeCard>
            ))}
          </ThemesGrid>
        </Content>
      </Container>

      {showModal && (
        <PremiumModal onClick={() => setShowModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>✨ Premium Theme</ModalTitle>
            <ModalText>
              "{selectedTheme?.name}" is a premium theme. Upgrade to unlock this theme 
              and 6 other exclusive designs, plus AI-personalized content and advanced features.
            </ModalText>
            <ModalActions>
              <ActionButton 
                className="secondary"
                onClick={() => setShowModal(false)}
              >
                Maybe Later
              </ActionButton>
              <ActionButton 
                className="primary"
                onClick={() => {
                  setShowModal(false)
                  window.location.href = '/upgrade'
                }}
              >
                Upgrade Now
              </ActionButton>
            </ModalActions>
          </ModalContent>
        </PremiumModal>
      )}
    </Layout>
  )
}

export default ThemesPage