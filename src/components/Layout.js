import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'gatsby'
import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Poppins:wght@300;400;500;600&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', sans-serif;
    line-height: 1.6;
    color: #333;
    overflow-x: hidden;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
    font-family: inherit;
  }

  .cosmic-gradient {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }

  .nature-gradient {
    background: linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%);
  }

  .minimal-gradient {
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  }
`

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const Navigation = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  z-index: 1000;
  padding: 1rem 2rem;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
`

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Logo = styled(Link)`
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 1.3rem;
  color: #667eea;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`

const NavLink = styled(Link)`
  color: #333;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: #667eea;
  }
`

const NavCTAButton = styled.a`
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  padding: 0.7rem 1.5rem;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
  }

  @media (max-width: 768px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.8rem;
  }
`

const BackButton = styled.a`
  position: fixed;
  top: 2rem;
  left: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  z-index: 1000;
  font-size: 0.9rem;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`

const MainContent = styled.main`
  padding-top: ${props => props.hasNav ? '80px' : '0'};
`

const Layout = ({ 
  children, 
  title = "Cosmic Tab Coach", 
  description = "Transform every browser moment into a cosmic opportunity for growth, peace, and self-care",
  showBackButton = false,
  showNav = false,
  backLink = "/"
}) => {
  return (
    <LayoutContainer>
      <GlobalStyle />
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Helmet>
      
      {showNav && (
        <Navigation>
          <NavContainer>
            <Logo to="/">🌟 Cosmic Tab Coach</Logo>
            <NavLinks>
              <NavLink to="/demos">Demos</NavLink>
              <NavLink to="/roadmap">Roadmap</NavLink>
              <NavLink to="/cosmic-tab">Try It</NavLink>
              <NavCTAButton 
                href="https://chrome.google.com/webstore/detail/cosmic-tab-coach/placeholder" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Add to Chrome
              </NavCTAButton>
            </NavLinks>
          </NavContainer>
        </Navigation>
      )}
      
      {showBackButton && !showNav && (
        <BackButton href={backLink}>
          ← Back
        </BackButton>
      )}
      
      <MainContent hasNav={showNav}>
        {children}
      </MainContent>
    </LayoutContainer>
  )
}

export default Layout