# Cosmic Tab Coach - Unified Design System

A comprehensive design system that ensures visual consistency across the landing page (Gatsby) and Chrome extension.

## 📁 Files Overview

- **`cosmic-theme.js`** - JavaScript/React theme object for Gatsby/styled-components
- **`cosmic-theme.css`** - CSS custom properties version for Chrome extension
- **`DESIGN_SYSTEM.md`** - This documentation file

## 🎨 Design Principles

### 1. **Cosmic Serenity**
- Gentle gradients that evoke space and tranquility
- Soft, rounded corners and glassmorphism effects
- Subtle animations that feel peaceful, not jarring

### 2. **Mindful Accessibility**
- High contrast ratios for all text
- Comfortable font sizes and spacing
- Clear visual hierarchy

### 3. **Unified Experience**
- Consistent colors, typography, and spacing across all platforms
- Seamless transition between landing page and extension
- Recognizable brand identity

## 🌈 Color Palette

### Primary Brand Colors
```css
--color-primary-500: #667eea  /* Primary brand color */
--color-secondary-500: #764ba2 /* Secondary brand color */
```

### Theme Variations
```css
--gradient-cosmic: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
--gradient-nature: linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%)
--gradient-minimal: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)
--gradient-sunset: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)
--gradient-ocean: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)
```

### Accent Colors (CTAs)
```css
--gradient-cta: linear-gradient(45deg, #ff6b6b, #ee5a24)
--color-coral-500: #ff6b6b
--color-orange-500: #ee5a24
```

### Text Colors
```css
--color-text-primary: #333333
--color-text-secondary: #666666
--color-text-tertiary: #888888
--color-text-muted: #999999
--color-text-inverse: #ffffff
```

## 📝 Typography

### Font Families
- **Headings**: 'Poppins' - Modern, friendly, approachable
- **Body**: 'Inter' - Highly readable, optimized for UI
- **Monospace**: 'SF Mono' - For code snippets

### Font Scale
```css
--font-size-xs: 0.7rem     /* Small labels */
--font-size-sm: 0.8rem     /* Captions */
--font-size-base: 0.85rem  /* Body text */
--font-size-lg: 1rem       /* Buttons */
--font-size-xl: 1.1rem     /* Subheadings */
--font-size-2xl: 1.3rem    /* Section titles */
--font-size-3xl: 1.5rem    /* Page titles */
--font-size-8xl: 3.5rem    /* Hero titles */
```

### Font Weights
- **Light (300)**: Large display text
- **Normal (400)**: Body text
- **Medium (500)**: UI elements
- **Semibold (600)**: Buttons, emphasis
- **Bold (700)**: Headings

## 📏 Spacing System

Based on 0.25rem (4px) increments for perfect alignment:

```css
--space-1: 0.25rem   /* 4px */
--space-2: 0.5rem    /* 8px */
--space-3: 0.75rem   /* 12px */
--space-4: 1rem      /* 16px */
--space-5: 1.25rem   /* 20px */
--space-6: 1.5rem    /* 24px */
--space-8: 2rem      /* 32px */
--space-10: 2.5rem   /* 40px */
--space-12: 3rem     /* 48px */
```

## 🔘 Border Radius

Progressive scale for different component types:

```css
--radius-sm: 0.125rem    /* 2px - Small elements */
--radius-base: 0.25rem   /* 4px - Default */
--radius-md: 0.375rem    /* 6px - Inputs */
--radius-lg: 0.5rem      /* 8px - Buttons */
--radius-xl: 0.75rem     /* 12px - Cards */
--radius-2xl: 1rem       /* 16px - Large cards */
--radius-3xl: 1.5rem     /* 24px - Coach interface */
--radius-full: 9999px    /* Pills/circular */
```

## 🌟 Shadows & Elevation

### Standard Shadows
```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1)
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1)
```

### Colored Shadows (Interactive Elements)
```css
--shadow-primary: 0 10px 30px rgba(102, 126, 234, 0.3)
--shadow-cta: 0 10px 30px rgba(255, 107, 107, 0.4)
--shadow-glass: 0 8px 32px rgba(0, 0, 0, 0.1)
```

## ⚡ Animations & Transitions

### Duration Scale
- **Fast (150ms)**: Micro-interactions, hover states
- **Base (300ms)**: Most UI transitions
- **Slow (500ms)**: Page transitions, complex animations

### Easing Functions
- **ease**: Default for most interactions
- **ease-in-out**: Smooth, natural feeling
- **bounce**: Playful interactions (sparingly)

### Signature Animations
```css
@keyframes cosmic-pulse {
  0%, 100% { transform: scale(0.8) rotate(0deg); opacity: 0.3; }
  50% { transform: scale(1.2) rotate(180deg); opacity: 0.6; }
}

@keyframes gentle-glow {
  0%, 100% { text-shadow: 0 0 5px rgba(102, 126, 234, 0.5); }
  50% { text-shadow: 0 0 15px rgba(102, 126, 234, 0.8); }
}
```

## 🧱 Component Tokens

### Button Variants

#### Primary Button
```css
background: var(--gradient-primary);
color: var(--color-text-on-primary);
padding: var(--space-4) var(--space-8);
border-radius: var(--radius-pill);
font-weight: var(--font-weight-semibold);
```

#### CTA Button  
```css
background: var(--gradient-cta);
color: var(--color-text-on-accent);
padding: var(--space-5) var(--space-10);
border-radius: var(--radius-pill);
font-weight: var(--font-weight-semibold);
letter-spacing: var(--letter-spacing-wider);
text-transform: uppercase;
box-shadow: var(--shadow-cta);
```

#### Ghost Button
```css
background: transparent;
color: var(--color-primary-500);
border: 1px solid rgba(102, 126, 234, 0.3);
padding: var(--space-3) var(--space-6);
border-radius: var(--radius-lg);
```

### Card Components

#### Standard Card
```css
background: var(--color-bg-primary);
border-radius: var(--radius-2xl);
padding: var(--space-6);
box-shadow: var(--shadow-lg);
border: 1px solid var(--color-gray-100);
```

#### Glass Card
```css
background: var(--color-bg-glass);
backdrop-filter: blur(20px);
border-radius: var(--radius-2xl);
padding: var(--space-6);
border: 1px solid rgba(255, 255, 255, 0.2);
```

### Mindful Coach Interface

#### Container
```css
background: var(--gradient-glass-primary);
border-radius: var(--radius-3xl);
padding: var(--space-5);
border: 1px solid rgba(102, 126, 234, 0.2);
backdrop-filter: blur(10px);
```

#### User Message
```css
background: var(--gradient-primary);
color: var(--color-text-inverse);
border-radius: var(--radius-2xl);
padding: var(--space-3) var(--space-4);
margin-left: 20%;
```

#### Coach Message
```css
background: rgba(102, 126, 234, 0.1);
color: var(--color-text-primary);
border-radius: var(--radius-2xl);
padding: var(--space-3) var(--space-4);
margin-right: 20%;
```

## 🚀 Usage Examples

### Landing Page (Gatsby + Styled Components)

```javascript
import { cosmicTheme } from './cosmic-theme.js'

const HeroSection = styled.section`
  background: ${cosmicTheme.gradients.primary};
  padding: ${cosmicTheme.space[16]} ${cosmicTheme.space[8]};
  border-radius: ${cosmicTheme.radii['2xl']};
`

const CTAButton = styled.button`
  background: ${cosmicTheme.gradients.cta};
  color: ${cosmicTheme.colors.text.onAccent};
  padding: ${cosmicTheme.space[5]} ${cosmicTheme.space[10]};
  border-radius: ${cosmicTheme.radii.pill};
  font-family: ${cosmicTheme.typography.fonts.heading};
  font-weight: ${cosmicTheme.typography.fontWeights.semibold};
  font-size: ${cosmicTheme.typography.fontSizes.xl};
  box-shadow: ${cosmicTheme.shadows.cta};
  transition: ${cosmicTheme.transitions.all};
  border: none;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: ${cosmicTheme.shadows.ctaHover};
  }
`
```

### Chrome Extension (CSS Custom Properties)

```css
/* Import the theme */
@import url('cosmic-theme.css');

/* Use in your CSS */
.cosmic-tab-container {
  background: var(--gradient-primary);
  padding: var(--space-8);
  border-radius: var(--radius-2xl);
  font-family: var(--font-family-body);
}

.cta-button {
  background: var(--gradient-cta);
  color: var(--color-text-on-accent);
  padding: var(--space-5) var(--space-10);
  border-radius: var(--radius-pill);
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-xl);
  letter-spacing: var(--letter-spacing-wider);
  box-shadow: var(--shadow-cta);
  transition: var(--transition-all);
  border: none;
  cursor: pointer;
  text-transform: uppercase;
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-cta-hover);
}

/* Or use utility classes */
.my-button {
  @apply btn-cta;
}
```

### Theme Switching

```css
/* CSS */
body.theme-cosmic { background: var(--gradient-cosmic); }
body.theme-nature { background: var(--gradient-nature); }
body.theme-minimal { background: var(--gradient-minimal); }
```

```javascript
// JavaScript
const themes = cosmicTheme.gradients.themes

const ThemeSelector = styled.div`
  background: ${themes.cosmic};
  
  &.nature { background: ${themes.nature}; }
  &.minimal { background: ${themes.minimal}; }
  &.sunset { background: ${themes.sunset}; }
  &.ocean { background: ${themes.ocean}; }
`
```

## 📱 Responsive Design

### Breakpoints
```css
--breakpoint-sm: 640px
--breakpoint-md: 768px
--breakpoint-lg: 1024px
--breakpoint-xl: 1280px
```

### Usage
```css
/* Mobile first approach */
.container {
  padding: var(--space-4);
}

@media (min-width: 768px) {
  .container {
    padding: var(--space-8);
  }
}
```

## ♿ Accessibility Guidelines

### Color Contrast
- All text meets WCAG AA standards (4.5:1 ratio minimum)
- Interactive elements have clear focus states
- Color is never the only way to convey information

### Focus States
```css
.focusable:focus {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}
```

### Semantic HTML
- Use proper heading hierarchy (h1 → h2 → h3)
- Include alt text for images
- Use semantic button and form elements

## 🔧 Implementation Checklist

### For Landing Page (Gatsby)
- [ ] Import `cosmic-theme.js`
- [ ] Replace hardcoded values with theme tokens
- [ ] Use consistent spacing scale
- [ ] Apply proper typography hierarchy
- [ ] Test responsive behavior
- [ ] Verify accessibility

### For Chrome Extension
- [ ] Include `cosmic-theme.css` in all HTML files
- [ ] Replace hardcoded CSS with custom properties
- [ ] Use utility classes where appropriate
- [ ] Test across different browser versions
- [ ] Verify extension popup constraints
- [ ] Test theme switching functionality

## 🎯 Best Practices

### Do's ✅
- Use theme tokens instead of hardcoded values
- Maintain consistent spacing with the scale
- Use semantic color names (primary, secondary, accent)
- Follow the component token patterns
- Test on multiple devices and browsers

### Don'ts ❌
- Don't use arbitrary color values
- Don't break the spacing scale
- Don't mix font families randomly
- Don't ignore accessibility guidelines
- Don't create inconsistent shadow/radius patterns

## 🚧 Future Enhancements

### Planned Features
- [ ] Dark mode variants
- [ ] High contrast mode
- [ ] Additional theme variations
- [ ] Component library documentation
- [ ] Figma design tokens integration
- [ ] Automated contrast checking

### Theme Evolution
As the project grows, consider:
- User-customizable themes
- Seasonal theme variations
- Community-contributed themes
- Advanced accessibility modes

## 📞 Support

For questions about the design system:
- Check existing component implementations
- Reference this documentation
- Create consistent patterns before adding new variants
- Consider accessibility impact of changes

---

*This design system ensures Cosmic Tab Coach maintains its peaceful, cosmic brand identity across all touchpoints while providing a delightful, accessible user experience.* ✨