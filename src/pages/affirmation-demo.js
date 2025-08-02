import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Layout from '../components/Layout'
import { useAffirmations } from '../hooks/useAffirmations'

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
  font-size: 2.2rem;
  margin-bottom: 1rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`

const Subtitle = styled.p`
  font-size: 1rem;
  opacity: 0.9;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
`

const DemoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const DemoPanel = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(20px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
`

const PanelTitle = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #333;
`

const AffirmationDisplay = styled.div`
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  border-radius: 15px;
  padding: 1.5rem;
  margin: 1rem 0;
  border: 1px solid rgba(102, 126, 234, 0.2);
  min-height: 120px;
  transition: opacity 0.5s ease;
`

const AffirmationText = styled.div`
  font-family: 'Poppins', sans-serif;
  font-size: 1.1rem;
  font-weight: 400;
  color: #333;
  line-height: 1.5;
  margin-bottom: 0.8rem;
`

const AffirmationMeta = styled.div`
  font-size: 0.8rem;
  color: #666;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding-top: 0.8rem;
`

const CategoryTag = styled.span`
  background: rgba(102, 126, 234, 0.2);
  color: #333;
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 500;
  display: inline-block;
  margin-right: 0.5rem;
`

const Button = styled.button`
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0.5rem 0.5rem 0.5rem 0;
  font-size: 0.9rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
  }

  &.secondary {
    background: rgba(102, 126, 234, 0.2);
    color: #333;
  }
`

const CategorySelector = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0;
`

const CategoryOption = styled.button`
  background: rgba(102, 126, 234, 0.2);
  border: 2px solid transparent;
  color: #333;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.8rem;

  &:hover {
    background: rgba(102, 126, 234, 0.3);
  }

  &.selected {
    background: linear-gradient(45deg, #667eea, #764ba2);
    color: white;
    border-color: rgba(255, 255, 255, 0.3);
  }
`

const SearchBox = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid rgba(102, 126, 234, 0.3);
  border-radius: 10px;
  font-size: 0.9rem;
  margin: 1rem 0;
`

const SearchResults = styled.div`
  max-height: 200px;
  overflow-y: auto;
  margin-top: 1rem;
`

const SearchResult = styled.div`
  background: rgba(102, 126, 234, 0.1);
  padding: 0.8rem;
  margin: 0.5rem 0;
  border-radius: 8px;
  border-left: 3px solid #667eea;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(102, 126, 234, 0.2);
  }
`

const SearchResultText = styled.div`
  font-size: 0.9rem;
  margin-bottom: 0.3rem;
`

const LoadingText = styled.div`
  text-align: center;
  color: #666;
  font-style: italic;
  padding: 2rem;
`

const StatsPanel = styled.div`
  grid-column: 1 / -1;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  backdrop-filter: blur(10px);
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const StatItem = styled.div`
  text-align: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
`

const StatNumber = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`

const StatLabel = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
`

const AffirmationDemo = () => {
  const {
    getRandomAffirmation,
    getPersonalizedAffirmation,
    getAffirmationByCategory,
    getThemedAffirmation,
    getCategories,
    searchAffirmations,
    getStats,
    setUserPreferences
  } = useAffirmations()

  const [randomAffirmation, setRandomAffirmation] = useState(null)
  const [categoryAffirmation, setCategoryAffirmation] = useState(null)
  const [themeAffirmation, setThemeAffirmation] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [categories, setCategories] = useState([])
  const [stats, setStats] = useState(null)

  useEffect(() => {
    // Initialize data
    try {
      const categoriesData = getCategories()
      setCategories(categoriesData)
      
      const statsData = getStats()
      setStats(statsData)
      
      // Load initial random affirmation
      handleRandomAffirmation()
    } catch (error) {
      console.error('Error initializing demo:', error)
    }
  }, [])

  const handleRandomAffirmation = () => {
    try {
      const affirmation = getRandomAffirmation()
      setRandomAffirmation(affirmation)
    } catch (error) {
      console.error('Error getting random affirmation:', error)
      setRandomAffirmation({
        text: "You are exactly where you need to be in this cosmic moment",
        category: "Present Moment Awareness",
        categoryKey: "present_moment"
      })
    }
  }

  const handlePersonalizedAffirmation = () => {
    try {
      // Set sample preferences
      setUserPreferences({
        categories: ['self_care', 'cosmic_connection', 'inner_strength'],
        personalizedContent: true
      })
      
      const affirmation = getPersonalizedAffirmation()
      setRandomAffirmation(affirmation)
    } catch (error) {
      console.error('Error getting personalized affirmation:', error)
    }
  }

  const handleCategorySelect = (categoryKey) => {
    setSelectedCategory(categoryKey)
    try {
      const affirmation = getAffirmationByCategory(categoryKey)
      setCategoryAffirmation(affirmation)
    } catch (error) {
      console.error('Error getting category affirmation:', error)
    }
  }

  const handleThemedAffirmation = (theme) => {
    try {
      const affirmation = getThemedAffirmation(theme)
      setThemeAffirmation(affirmation)
    } catch (error) {
      console.error('Error getting themed affirmation:', error)
    }
  }

  const handleSearch = (term) => {
    setSearchTerm(term)
    if (term.length < 2) {
      setSearchResults([])
      return
    }
    
    try {
      const results = searchAffirmations(term)
      setSearchResults(results.slice(0, 5))
    } catch (error) {
      console.error('Error searching affirmations:', error)
    }
  }

  const displayAffirmation = (affirmation) => {
    if (!affirmation || !affirmation.text) {
      return (
        <LoadingText>Select an option above</LoadingText>
      )
    }

    return (
      <>
        <AffirmationText>{affirmation.text}</AffirmationText>
        <AffirmationMeta>
          <CategoryTag>{affirmation.category}</CategoryTag>
          <div style={{ marginTop: '0.5rem', fontSize: '0.75rem' }}>
            Category: {affirmation.categoryKey} | 
            {affirmation.description || 'Wisdom for your journey'}
          </div>
        </AffirmationMeta>
      </>
    )
  }

  return (
    <Layout 
      title="Affirmation Manager Demo - Cosmic Tab Coach"
      description="Interactive demonstration of the JSON-based affirmation system with 500+ curated affirmations"
      showBackButton={true}
    >
      <Container>
        <Content>
          <Header>
            <Title>🤖 Affirmation Manager Demo</Title>
            <Subtitle>
              Demonstration of the JSON-based affirmation system with 500+ curated affirmations across 12 categories. 
              This shows the foundation before AI-powered personalization is added.
            </Subtitle>
          </Header>

          <DemoGrid>
            {/* Random Affirmation Panel */}
            <DemoPanel>
              <PanelTitle>🎲 Random Selection</PanelTitle>
              <AffirmationDisplay>
                {displayAffirmation(randomAffirmation)}
              </AffirmationDisplay>
              <Button onClick={handleRandomAffirmation}>
                ✨ New Random Affirmation
              </Button>
              <Button className="secondary" onClick={handlePersonalizedAffirmation}>
                🎯 Personalized
              </Button>
            </DemoPanel>

            {/* Category Selection Panel */}
            <DemoPanel>
              <PanelTitle>🎨 Category Selection</PanelTitle>
              <CategorySelector>
                {categories.map(cat => (
                  <CategoryOption
                    key={cat.key}
                    className={selectedCategory === cat.key ? 'selected' : ''}
                    onClick={() => handleCategorySelect(cat.key)}
                    title={cat.description}
                  >
                    {cat.name} ({cat.count})
                  </CategoryOption>
                ))}
              </CategorySelector>
              <AffirmationDisplay>
                {displayAffirmation(categoryAffirmation)}
              </AffirmationDisplay>
            </DemoPanel>

            {/* Theme-Based Panel */}
            <DemoPanel>
              <PanelTitle>🖼️ Theme-Based Affirmations</PanelTitle>
              <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
                Affirmations matched to visual themes for cohesive experience
              </p>
              <Button className="secondary" onClick={() => handleThemedAffirmation('cosmic')}>
                🌌 Cosmic
              </Button>
              <Button className="secondary" onClick={() => handleThemedAffirmation('nature')}>
                🌿 Nature
              </Button>
              <Button className="secondary" onClick={() => handleThemedAffirmation('minimal')}>
                ⚪ Minimal
              </Button>
              <Button className="secondary" onClick={() => handleThemedAffirmation('ocean')}>
                🌊 Ocean
              </Button>
              <AffirmationDisplay>
                {displayAffirmation(themeAffirmation)}
              </AffirmationDisplay>
            </DemoPanel>

            {/* Search Panel */}
            <DemoPanel>
              <PanelTitle>🔍 Search Affirmations</PanelTitle>
              <SearchBox
                type="text"
                placeholder="Search for keywords like 'strength', 'peace', 'cosmic'..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <SearchResults>
                {searchResults.length === 0 && searchTerm.length >= 2 && (
                  <div style={{ textAlign: 'center', color: '#666', padding: '1rem' }}>
                    No affirmations found
                  </div>
                )}
                {searchResults.map((affirmation, index) => (
                  <SearchResult
                    key={index}
                    onClick={() => setRandomAffirmation(affirmation)}
                  >
                    <SearchResultText>{affirmation.text}</SearchResultText>
                    <CategoryTag>{affirmation.category}</CategoryTag>
                  </SearchResult>
                ))}
              </SearchResults>
            </DemoPanel>
          </DemoGrid>

          {/* Statistics Panel */}
          <StatsPanel>
            <DemoPanel style={{ background: 'transparent', color: 'white' }}>
              <PanelTitle style={{ color: 'white' }}>📊 Content Statistics</PanelTitle>
              <StatsGrid>
                {stats && (
                  <>
                    <StatItem>
                      <StatNumber>{stats.totalAffirmations}</StatNumber>
                      <StatLabel>Total Affirmations</StatLabel>
                    </StatItem>
                    <StatItem>
                      <StatNumber>{stats.categories}</StatNumber>
                      <StatLabel>Categories</StatLabel>
                    </StatItem>
                    <StatItem>
                      <StatNumber>{stats.version}</StatNumber>
                      <StatLabel>Version</StatLabel>
                    </StatItem>
                    <StatItem>
                      <StatNumber>{stats.userPreferences?.categories?.length || 3}</StatNumber>
                      <StatLabel>Preferred Categories</StatLabel>
                    </StatItem>
                  </>
                )}
              </StatsGrid>
            </DemoPanel>
          </StatsPanel>
        </Content>
      </Container>
    </Layout>
  )
}

export default AffirmationDemo