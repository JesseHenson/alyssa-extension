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

const SettingsPanel = styled.div`
  max-width: 800px;
  margin: 4rem auto 2rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(20px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
`

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`

const Title = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-size: 2rem;
  color: #333;
  margin-bottom: 0.5rem;
`

const Subtitle = styled.p`
  color: #666;
  font-size: 1rem;
`

const Section = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
`

const SectionTitle = styled.h3`
  font-family: 'Poppins', sans-serif;
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.2rem;
`

const SettingRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 12px;
`

const SettingLabel = styled.div`
  flex: 1;
`

const SettingName = styled.div`
  font-weight: 500;
  color: #333;
  margin-bottom: 0.2rem;
`

const SettingDesc = styled.div`
  font-size: 0.9rem;
  color: #666;
`

const SettingControl = styled.div`
  margin-left: 1rem;
`

const Select = styled.select`
  padding: 0.5rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  font-size: 0.9rem;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`

const Toggle = styled.div`
  position: relative;
  width: 50px;
  height: 24px;
  background: ${props => props.checked ? '#667eea' : '#ddd'};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${props => props.checked ? '26px' : '2px'};
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 50%;
    transition: all 0.3s ease;
  }
`

const Slider = styled.input`
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: #ddd;
  outline: none;
  -webkit-appearance: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #667eea;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #667eea;
    cursor: pointer;
    border: none;
  }
`

const ThemeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`

const ThemeOption = styled.div`
  aspect-ratio: 16/9;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  border: 3px solid ${props => props.selected ? '#667eea' : 'transparent'};
  transition: all 0.3s ease;

  &.cosmic {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }

  &.nature {
    background: linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%);
  }

  &.minimal {
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  }

  &.premium1 {
    background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
    opacity: 0.6;
  }

  &.premium2 {
    background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
    opacity: 0.6;
  }

  &::after {
    content: '${props => props.premium ? '⭐ Premium' : ''}';
    position: absolute;
    bottom: 0.2rem;
    left: 0.2rem;
    right: 0.2rem;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    font-size: 0.7rem;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    text-align: center;
    opacity: ${props => props.premium ? 1 : 0};
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`

const ThemeName = styled.div`
  text-align: center;
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: #666;
`

const PremiumBanner = styled.div`
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  padding: 1rem;
  border-radius: 12px;
  text-align: center;
  margin-top: 1rem;
`

const UpgradeButton = styled(Link)`
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  text-decoration: none;
  margin-top: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
`

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    theme: 'cosmic',
    frequency: '30',
    textSize: '16',
    personalizedContent: true,
    animations: true,
    notifications: false,
    autoRefresh: true
  })

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  return (
    <Layout 
      title="Settings - Cosmic Tab Coach"
      description="Customize your cosmic affirmation experience with themes, frequency, and personalization options"
    >
      <Container>
        <BackButton to="/cosmic-tab">← Back to New Tab</BackButton>
        
        <SettingsPanel>
          <Header>
            <Title>⚙️ Settings</Title>
            <Subtitle>Customize your cosmic affirmation experience</Subtitle>
          </Header>

          <Section>
            <SectionTitle>🎨 Appearance</SectionTitle>
            
            <SettingRow>
              <SettingLabel>
                <SettingName>Theme</SettingName>
                <SettingDesc>Choose your preferred cosmic theme</SettingDesc>
              </SettingLabel>
              <SettingControl>
                <Select 
                  value={settings.theme} 
                  onChange={(e) => updateSetting('theme', e.target.value)}
                >
                  <option value="cosmic">Cosmic Calm</option>
                  <option value="nature">Nature Serenity</option>
                  <option value="minimal">Minimal Focus</option>
                </Select>
              </SettingControl>
            </SettingRow>

            <ThemeGrid>
              <div>
                <ThemeOption 
                  className="cosmic" 
                  selected={settings.theme === 'cosmic'}
                  onClick={() => updateSetting('theme', 'cosmic')}
                />
                <ThemeName>Cosmic Calm</ThemeName>
              </div>
              <div>
                <ThemeOption 
                  className="nature" 
                  selected={settings.theme === 'nature'}
                  onClick={() => updateSetting('theme', 'nature')}
                />
                <ThemeName>Nature Serenity</ThemeName>
              </div>
              <div>
                <ThemeOption 
                  className="minimal" 
                  selected={settings.theme === 'minimal'}
                  onClick={() => updateSetting('theme', 'minimal')}
                />
                <ThemeName>Minimal Focus</ThemeName>
              </div>
              <div>
                <ThemeOption 
                  className="premium1" 
                  premium
                  onClick={() => {}}
                />
                <ThemeName>Sunset Bliss ⭐</ThemeName>
              </div>
              <div>
                <ThemeOption 
                  className="premium2" 
                  premium
                  onClick={() => {}}
                />
                <ThemeName>Cotton Candy ⭐</ThemeName>
              </div>
            </ThemeGrid>

            <SettingRow>
              <SettingLabel>
                <SettingName>Text Size</SettingName>
                <SettingDesc>Adjust affirmation text size: {settings.textSize}px</SettingDesc>
              </SettingLabel>
              <SettingControl>
                <Slider
                  type="range"
                  min="12"
                  max="24"
                  value={settings.textSize}
                  onChange={(e) => updateSetting('textSize', e.target.value)}
                />
              </SettingControl>
            </SettingRow>

            <SettingRow>
              <SettingLabel>
                <SettingName>Animations</SettingName>
                <SettingDesc>Enable cosmic animations and transitions</SettingDesc>
              </SettingLabel>
              <SettingControl>
                <Toggle 
                  checked={settings.animations}
                  onClick={() => updateSetting('animations', !settings.animations)}
                />
              </SettingControl>
            </SettingRow>
          </Section>

          <Section>
            <SectionTitle>✨ Content</SectionTitle>
            
            <SettingRow>
              <SettingLabel>
                <SettingName>Affirmation Frequency</SettingName>
                <SettingDesc>How often to show new affirmations</SettingDesc>
              </SettingLabel>
              <SettingControl>
                <Select 
                  value={settings.frequency} 
                  onChange={(e) => updateSetting('frequency', e.target.value)}
                >
                  <option value="15">Every 15 seconds</option>
                  <option value="30">Every 30 seconds</option>
                  <option value="60">Every minute</option>
                  <option value="300">Every 5 minutes</option>
                  <option value="0">Manual only</option>
                </Select>
              </SettingControl>
            </SettingRow>

            <SettingRow>
              <SettingLabel>
                <SettingName>Personalized Content</SettingName>
                <SettingDesc>AI learns your preferences for better affirmations</SettingDesc>
              </SettingLabel>
              <SettingControl>
                <Toggle 
                  checked={settings.personalizedContent}
                  onClick={() => updateSetting('personalizedContent', !settings.personalizedContent)}
                />
              </SettingControl>
            </SettingRow>

            <SettingRow>
              <SettingLabel>
                <SettingName>Auto-refresh</SettingName>
                <SettingDesc>Automatically show new affirmation on tab focus</SettingDesc>
              </SettingLabel>
              <SettingControl>
                <Toggle 
                  checked={settings.autoRefresh}
                  onClick={() => updateSetting('autoRefresh', !settings.autoRefresh)}
                />
              </SettingControl>
            </SettingRow>
          </Section>

          <Section>
            <SectionTitle>🔔 Notifications</SectionTitle>
            
            <SettingRow>
              <SettingLabel>
                <SettingName>Daily Reminders</SettingName>
                <SettingDesc>Get gentle reminders for mindfulness breaks</SettingDesc>
              </SettingLabel>
              <SettingControl>
                <Toggle 
                  checked={settings.notifications}
                  onClick={() => updateSetting('notifications', !settings.notifications)}
                />
              </SettingControl>
            </SettingRow>
          </Section>

          <PremiumBanner>
            <h3>✨ Unlock Premium Features</h3>
            <p>Get personalized AI content, exclusive themes, and advanced customization</p>
            <UpgradeButton to="/upgrade">Upgrade to Premium</UpgradeButton>
          </PremiumBanner>
        </SettingsPanel>
      </Container>
    </Layout>
  )
}

export default SettingsPage