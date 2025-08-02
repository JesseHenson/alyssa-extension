# Theme Migration Examples

This document shows practical examples of how to migrate existing components to use the unified theme system.

## 🔄 Landing Page Migration (Gatsby)

### Before: Hardcoded Values
```javascript
const HeroSection = styled.section`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
`

const HeroTitle = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  color: white;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`

const CTAButton = styled.a`
  display: inline-block;
  background: linear-gradient(45deg, #ff6b6b, #ee5a24);
  color: white;
  padding: 1.2rem 2.5rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 10px 30px rgba(255, 107, 107, 0.4);
  transition: all 0.3s ease;
`
```

### After: Using Theme System
```javascript
import { cosmicTheme } from './cosmic-theme.js'

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

const HeroTitle = styled.h1`
  font-family: ${cosmicTheme.typography.fonts.heading};
  font-size: ${cosmicTheme.typography.fontSizes['8xl']};
  font-weight: ${cosmicTheme.typography.fontWeights.bold};
  margin-bottom: ${cosmicTheme.space[6]};
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  color: ${cosmicTheme.colors.text.inverse};

  @media (max-width: ${cosmicTheme.breakpoints.md}) {
    font-size: ${cosmicTheme.typography.fontSizes['6xl']};
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

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${cosmicTheme.shadows.ctaHover};
  }
`
```

## 🔧 Extension Migration (CSS)

### Before: Hardcoded CSS
```css
.mindful-coach-container {
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
    border-radius: 20px;
    padding: 20px;
    margin: 20px 0;
    border: 1px solid rgba(102, 126, 234, 0.2);
    backdrop-filter: blur(10px);
}

.mindful-coach-message.user {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    margin-left: 20%;
    border-bottom-right-radius: 4px;
    padding: 12px 16px;
    border-radius: 18px;
    margin-bottom: 12px;
    font-size: 14px;
}

.action-btn {
    flex: 1;
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(102, 126, 234, 0.3);
    color: #333;
    padding: 0.8rem 0.5rem;
    border-radius: 8px;
    font-weight: 500;
}
```

### After: Using Theme Variables
```css
@import url('cosmic-theme.css');

.mindful-coach-container {
    background: var(--gradient-glass-primary);
    border-radius: var(--radius-3xl);
    padding: var(--space-5);
    margin: var(--space-5) 0;
    border: 1px solid rgba(102, 126, 234, 0.2);
    backdrop-filter: blur(10px);
}

.mindful-coach-message.user {
    background: var(--gradient-primary);
    color: var(--color-text-inverse);
    margin-left: 20%;
    border-bottom-right-radius: var(--radius-sm);
    padding: var(--space-3) var(--space-4);
    border-radius: var(--radius-2xl);
    margin-bottom: var(--space-3);
    font-size: var(--font-size-md);
}

.action-btn {
    flex: 1;
    background: var(--color-bg-glass);
    border: 1px solid rgba(102, 126, 234, 0.3);
    color: var(--color-text-primary);
    padding: var(--space-3) var(--space-2);
    border-radius: var(--radius-lg);
    font-weight: var(--font-weight-medium);
}

/* Or use utility classes */
.action-btn-alt {
    @apply btn-ghost;
    flex: 1;
}
```

## 🎨 Theme Switching Implementation

### Landing Page Theme Switcher
```javascript
import { cosmicTheme } from './cosmic-theme.js'

const ThemeProvider = styled.div`
  ${props => {
    const theme = props.selectedTheme || 'cosmic'
    return `
      background: ${cosmicTheme.gradients.themes[theme]};
      transition: ${cosmicTheme.transitions.all};
    `
  }}
`

// Usage
<ThemeProvider selectedTheme="nature">
  <YourComponents />
</ThemeProvider>
```

### Extension Theme Switcher
```css
/* Base styling */
body {
    background: var(--gradient-cosmic);
    transition: var(--transition-all);
}

/* Theme classes */
body.theme-nature { background: var(--gradient-nature); }
body.theme-minimal { background: var(--gradient-minimal); }
body.theme-sunset { background: var(--gradient-sunset); }
body.theme-ocean { background: var(--gradient-ocean); }
```

```javascript
// JavaScript for theme switching
function setTheme(themeName) {
    document.body.className = document.body.className.replace(/\btheme-\w+\b/g, '');
    document.body.classList.add(`theme-${themeName}`);
    
    // Save preference
    chrome.storage.sync.set({ selectedTheme: themeName });
}
```

## 🧩 Component Refactoring Examples

### Feature Card Component

#### Before
```javascript
const FeatureCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  text-align: center;
  border: 1px solid #f0f0f0;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  }
`

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`

const FeatureTitle = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #333;
  font-weight: 600;
`
```

#### After
```javascript
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
```

### Popup Header Component

#### Before
```css
.popup-header {
    padding: 1rem;
    background: rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.logo-text {
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    font-size: 0.95rem;
    letter-spacing: 0.5px;
}

.settings-btn {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
}
```

#### After
```css
.popup-header {
    padding: var(--space-4);
    background: var(--color-bg-glass-dark);
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.logo-text {
    font-family: var(--font-family-heading);
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-base);
    letter-spacing: var(--letter-spacing-wide);
}

.settings-btn {
    background: var(--color-bg-glass-dark);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: var(--color-text-inverse);
    width: var(--space-8);
    height: var(--space-8);
    border-radius: var(--radius-full);
    cursor: pointer;
    transition: var(--transition-all);
}

.settings-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
}
```

## 📝 Form Components

### Input Field Migration

#### Before
```css
.mindful-coach-input {
    flex: 1;
    padding: 0.6rem 0.8rem;
    border: 1px solid rgba(102, 126, 234, 0.3);
    border-radius: 16px;
    font-size: 0.8rem;
    outline: none;
    transition: all 0.3s ease;
    background: white;
}

.mindful-coach-input:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
}
```

#### After
```css
.mindful-coach-input {
    flex: 1;
    padding: var(--space-2-5) var(--space-3);
    border: 1px solid rgba(102, 126, 234, 0.3);
    border-radius: var(--radius-2xl);
    font-size: var(--font-size-sm);
    outline: none;
    transition: var(--transition-colors);
    background: var(--color-bg-primary);
}

.mindful-coach-input:focus {
    border-color: var(--color-primary-500);
    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
}

/* Or use the utility class */
.mindful-coach-input-alt {
    @extend .input;
    border-radius: var(--radius-2xl);
    font-size: var(--font-size-sm);
}
```

## 🎯 Best Practices for Migration

### 1. **Gradual Migration**
Start with high-impact components first:
- Buttons (most visible)
- Typography (affects readability)
- Colors (brand consistency)
- Spacing (layout consistency)

### 2. **Use Theme Tokens Consistently**
```javascript
// ✅ Good
padding: ${cosmicTheme.space[4]} ${cosmicTheme.space[8]}

// ❌ Avoid
padding: 1rem 2rem
```

### 3. **Maintain Semantic Structure**
```javascript
// ✅ Good - semantic color usage
color: ${cosmicTheme.colors.text.primary}

// ❌ Avoid - hardcoded references
color: ${cosmicTheme.colors.gray[700]}
```

### 4. **Test Across Themes**
Always test components with different theme variations:
```css
/* Ensure components work with all themes */
.component {
    color: var(--color-text-primary); /* Adapts to theme */
    /* not: color: #333; /* Fixed color, doesn't adapt */
}
```

### 5. **Use Utility Classes Where Appropriate**
```html
<!-- ✅ For simple styling -->
<button class="btn-primary">Click me</button>

<!-- ✅ For complex custom components -->
<StyledButton theme={cosmicTheme}>Custom Button</StyledButton>
```

## 🚀 Quick Migration Checklist

### Landing Page (Gatsby)
- [ ] Import theme object
- [ ] Replace hardcoded colors with theme.colors.*
- [ ] Replace font sizes with theme.typography.fontSizes.*
- [ ] Replace spacing with theme.space.*
- [ ] Replace gradients with theme.gradients.*
- [ ] Replace shadows with theme.shadows.*
- [ ] Update breakpoints to theme.breakpoints.*

### Extension (CSS)
- [ ] Import cosmic-theme.css
- [ ] Replace hardcoded colors with --color-* variables
- [ ] Replace font sizes with --font-size-* variables  
- [ ] Replace spacing with --space-* variables
- [ ] Replace gradients with --gradient-* variables
- [ ] Replace shadows with --shadow-* variables
- [ ] Add utility classes where beneficial

## 🎨 Testing Your Migration

### Visual Consistency Check
1. Compare before/after screenshots
2. Test responsive behavior
3. Verify theme switching works
4. Check accessibility (contrast ratios)
5. Test in different browsers

### Code Quality Check
1. No hardcoded design values remain
2. All theme tokens used correctly
3. Components are reusable across themes
4. No duplicate styling patterns
5. Clean, semantic code structure

---

This migration guide ensures your components will be consistent, maintainable, and aligned with the cosmic brand identity across all platforms! ✨