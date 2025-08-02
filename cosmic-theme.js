/**
 * Cosmic Tab Coach - Unified Design System
 * 
 * This theme file provides a comprehensive design system that can be used
 * across both the landing page (Gatsby/styled-components) and the Chrome
 * extension (CSS custom properties) to ensure visual consistency.
 * 
 * Usage:
 * - Landing Page: Import and use with styled-components
 * - Extension: Convert to CSS custom properties
 * - Documentation: Reference for designers and developers
 */

export const cosmicTheme = {
  // =====================================================
  // COLORS
  // =====================================================
  colors: {
    // Primary Brand Colors
    primary: {
      50: '#f8faff',
      100: '#e6ecff', 
      200: '#c4d3ff',
      300: '#9bb3ff',
      400: '#7d96ff',
      500: '#667eea', // Primary brand color
      600: '#5a67d8',
      700: '#4c51bf',
      800: '#434190',
      900: '#3c366b'
    },

    // Secondary Brand Colors  
    secondary: {
      50: '#faf5ff',
      100: '#e9d8fd',
      200: '#d6bcfa', 
      300: '#b794f6',
      400: '#9f7aea',
      500: '#764ba2', // Secondary brand color
      600: '#6b46c1',
      700: '#553c9a',
      800: '#44337a',
      900: '#322659'
    },

    // Accent Colors (CTAs, highlights)
    accent: {
      coral: {
        50: '#fff5f5',
        100: '#fed7d7',
        200: '#feb2b2',
        300: '#fc8181',
        400: '#f56565',
        500: '#ff6b6b', // Primary CTA color
        600: '#e53e3e',
        700: '#c53030',
        800: '#9b2c2c',
        900: '#742a2a'
      },
      orange: {
        50: '#fffaf0',
        100: '#feebc8',
        200: '#fbd38d',
        300: '#f6ad55',
        400: '#ed8936',
        500: '#ee5a24', // Secondary CTA color
        600: '#dd6b20',
        700: '#c05621',
        800: '#9c4221',
        900: '#7b341e'
      }
    },

    // Semantic Colors
    success: {
      50: '#f0fff4',
      100: '#c6f6d5',
      200: '#9ae6b4',
      300: '#68d391',
      400: '#48bb78',
      500: '#38a169',
      600: '#2f855a',
      700: '#276749',
      800: '#22543d',
      900: '#1a202c'
    },

    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f'
    },

    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d'
    },

    // Neutral Colors
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827'
    },

    // Text Colors (semantic)
    text: {
      primary: '#333333',
      secondary: '#666666',
      tertiary: '#888888',
      muted: '#999999',
      inverse: '#ffffff',
      onPrimary: '#ffffff',
      onSecondary: '#ffffff',
      onAccent: '#ffffff'
    },

    // Background Colors
    background: {
      primary: '#ffffff',
      secondary: '#f8f9fa',
      tertiary: '#f1f3f4',
      overlay: 'rgba(0, 0, 0, 0.5)',
      glass: 'rgba(255, 255, 255, 0.95)',
      glassDark: 'rgba(255, 255, 255, 0.1)'
    }
  },

  // =====================================================
  // GRADIENTS
  // =====================================================
  gradients: {
    // Primary brand gradient (main cosmic theme)
    primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    
    // CTA gradients
    cta: 'linear-gradient(45deg, #ff6b6b, #ee5a24)',
    ctaHover: 'linear-gradient(45deg, #f56565, #dd6b20)',
    
    // Theme variations
    themes: {
      cosmic: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      nature: 'linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%)',
      minimal: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      sunset: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
      ocean: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    },

    // Glass/overlay effects
    glass: {
      light: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
      primary: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
      overlay: 'linear-gradient(135deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.05))'
    },

    // Announcement/feature highlight
    announcement: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
    feature: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  },

  // =====================================================
  // TYPOGRAPHY
  // =====================================================
  typography: {
    // Font families
    fonts: {
      body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      heading: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      mono: "'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace"
    },

    // Font sizes (rem-based scale)
    fontSizes: {
      xs: '0.7rem',     // 11.2px
      sm: '0.8rem',     // 12.8px  
      base: '0.85rem',  // 13.6px
      md: '0.9rem',     // 14.4px
      lg: '1rem',       // 16px
      xl: '1.1rem',     // 17.6px
      '2xl': '1.3rem',  // 20.8px
      '3xl': '1.5rem',  // 24px
      '4xl': '1.8rem',  // 28.8px
      '5xl': '2.2rem',  // 35.2px
      '6xl': '2.5rem',  // 40px
      '7xl': '3rem',    // 48px
      '8xl': '3.5rem',  // 56px
      '9xl': '4rem'     // 64px
    },

    // Font weights
    fontWeights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800
    },

    // Line heights
    lineHeights: {
      tight: 1.2,
      base: 1.4,
      relaxed: 1.6,
      loose: 1.8
    },

    // Letter spacing
    letterSpacing: {
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em'
    }
  },

  // =====================================================
  // SPACING SYSTEM
  // =====================================================
  space: {
    px: '1px',
    0: '0',
    0.5: '0.125rem',  // 2px
    1: '0.25rem',     // 4px
    1.5: '0.375rem',  // 6px
    2: '0.5rem',      // 8px
    2.5: '0.625rem',  // 10px
    3: '0.75rem',     // 12px
    3.5: '0.875rem',  // 14px
    4: '1rem',        // 16px
    5: '1.25rem',     // 20px
    6: '1.5rem',      // 24px
    7: '1.75rem',     // 28px
    8: '2rem',        // 32px
    9: '2.25rem',     // 36px
    10: '2.5rem',     // 40px
    12: '3rem',       // 48px
    16: '4rem',       // 64px
    20: '5rem',       // 80px
    24: '6rem',       // 96px
    32: '8rem',       // 128px
    40: '10rem',      // 160px
    48: '12rem',      // 192px
    56: '14rem',      // 224px
    64: '16rem'       // 256px
  },

  // =====================================================
  // BORDER RADIUS
  // =====================================================
  radii: {
    none: '0',
    sm: '0.125rem',   // 2px
    base: '0.25rem',  // 4px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    '3xl': '1.5rem',  // 24px
    '4xl': '2rem',    // 32px
    full: '9999px',   // Fully rounded
    // Semantic values
    button: '0.5rem',
    card: '1rem',
    modal: '1.25rem',
    pill: '9999px'
  },

  // =====================================================
  // SHADOWS & ELEVATION
  // =====================================================
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',

    // Colored shadows for CTAs and interactions
    primary: '0 10px 30px rgba(102, 126, 234, 0.3)',
    primaryHover: '0 15px 40px rgba(102, 126, 234, 0.4)',
    cta: '0 10px 30px rgba(255, 107, 107, 0.4)',
    ctaHover: '0 15px 40px rgba(255, 107, 107, 0.6)',
    
    // Glass effect shadows
    glass: '0 8px 32px rgba(0, 0, 0, 0.1)',
    glassHover: '0 12px 40px rgba(0, 0, 0, 0.15)'
  },

  // =====================================================
  // TRANSITIONS & ANIMATIONS
  // =====================================================
  transitions: {
    // Duration
    duration: {
      fast: '150ms',
      base: '300ms',
      slow: '500ms',
      slower: '1000ms'
    },

    // Easing functions
    easing: {
      default: 'ease',
      linear: 'linear',
      in: 'ease-in',
      out: 'ease-out',
      inOut: 'ease-in-out',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      smooth: 'cubic-bezier(0.4, 0, 0.2, 1)'
    },

    // Common transition combinations
    all: 'all 300ms ease',
    colors: 'background-color 300ms ease, border-color 300ms ease, color 300ms ease',
    transform: 'transform 300ms ease',
    opacity: 'opacity 300ms ease',
    shadow: 'box-shadow 300ms ease'
  },

  // =====================================================
  // COMPONENT TOKENS
  // =====================================================
  components: {
    // Buttons
    button: {
      // Primary button
      primary: {
        background: 'linear-gradient(45deg, #667eea, #764ba2)',
        color: '#ffffff',
        padding: '1rem 2rem',
        borderRadius: '9999px',
        fontWeight: 600,
        fontSize: '1rem',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 300ms ease',
        textTransform: 'none',
        letterSpacing: '0.025em'
      },

      // CTA button
      cta: {
        background: 'linear-gradient(45deg, #ff6b6b, #ee5a24)',
        color: '#ffffff',
        padding: '1.2rem 2.5rem',
        borderRadius: '9999px',
        fontWeight: 600,
        fontSize: '1.1rem',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 300ms ease',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        boxShadow: '0 10px 30px rgba(255, 107, 107, 0.4)'
      },

      // Secondary button
      secondary: {
        background: 'rgba(255, 255, 255, 0.2)',
        color: '#ffffff',
        padding: '1rem 2rem',
        borderRadius: '9999px',
        fontWeight: 600,
        fontSize: '1rem',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        cursor: 'pointer',
        transition: 'all 300ms ease',
        textTransform: 'none',
        letterSpacing: '0.025em'
      },

      // Ghost button  
      ghost: {
        background: 'transparent',
        color: '#667eea',
        padding: '0.8rem 1.5rem',
        borderRadius: '0.5rem',
        fontWeight: 500,
        fontSize: '0.9rem',
        border: '1px solid rgba(102, 126, 234, 0.3)',
        cursor: 'pointer',
        transition: 'all 300ms ease'
      }
    },

    // Cards
    card: {
      background: '#ffffff',
      borderRadius: '1rem',
      padding: '1.5rem',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
      border: '1px solid #f0f0f0',
      transition: 'all 300ms ease'
    },

    // Glass card
    glassCard: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      borderRadius: '1rem',
      padding: '1.5rem',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      transition: 'all 300ms ease'
    },

    // Modal
    modal: {
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(5px)',
      borderRadius: '1.25rem',
      padding: '2rem',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
    },

    // Input fields
    input: {
      background: '#ffffff',
      border: '1px solid #d1d5db',
      borderRadius: '0.5rem',
      padding: '0.75rem 1rem',
      fontSize: '0.9rem',
      color: '#333333',
      transition: 'all 300ms ease',
      outline: 'none'
    },

    // Coach interface
    coach: {
      container: {
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
        borderRadius: '1.25rem',
        padding: '1.25rem',
        border: '1px solid rgba(102, 126, 234, 0.2)',
        backdropFilter: 'blur(10px)'
      },
      
      userMessage: {
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        color: '#ffffff',
        borderRadius: '1rem',
        padding: '0.75rem 1rem',
        marginLeft: '20%',
        fontSize: '0.9rem'
      },

      coachMessage: {
        background: 'rgba(102, 126, 234, 0.1)',
        color: '#333333',
        borderRadius: '1rem',
        padding: '0.75rem 1rem',
        marginRight: '20%',
        fontSize: '0.9rem'
      }
    }
  },

  // =====================================================
  // BREAKPOINTS
  // =====================================================
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },

  // =====================================================
  // Z-INDEX SCALE
  // =====================================================
  zIndices: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800
  }
};

// =====================================================
// CSS CUSTOM PROPERTIES VERSION
// =====================================================
export const cosmicThemeCSS = `
  :root {
    /* Colors - Primary */
    --color-primary-50: #f8faff;
    --color-primary-100: #e6ecff;
    --color-primary-200: #c4d3ff;
    --color-primary-300: #9bb3ff;
    --color-primary-400: #7d96ff;
    --color-primary-500: #667eea;
    --color-primary-600: #5a67d8;
    --color-primary-700: #4c51bf;
    --color-primary-800: #434190;
    --color-primary-900: #3c366b;

    /* Colors - Secondary */
    --color-secondary-500: #764ba2;

    /* Colors - Text */
    --color-text-primary: #333333;
    --color-text-secondary: #666666;
    --color-text-tertiary: #888888;
    --color-text-muted: #999999;
    --color-text-inverse: #ffffff;

    /* Colors - Background */
    --color-bg-primary: #ffffff;
    --color-bg-secondary: #f8f9fa;
    --color-bg-glass: rgba(255, 255, 255, 0.95);
    --color-bg-overlay: rgba(0, 0, 0, 0.5);

    /* Gradients */
    --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --gradient-cta: linear-gradient(45deg, #ff6b6b, #ee5a24);
    --gradient-nature: linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%);
    --gradient-minimal: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    --gradient-sunset: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
    --gradient-ocean: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);

    /* Typography */
    --font-family-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    --font-family-heading: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

    /* Font sizes */
    --font-size-xs: 0.7rem;
    --font-size-sm: 0.8rem;
    --font-size-base: 0.85rem;
    --font-size-md: 0.9rem;
    --font-size-lg: 1rem;
    --font-size-xl: 1.1rem;
    --font-size-2xl: 1.3rem;
    --font-size-3xl: 1.5rem;
    --font-size-4xl: 1.8rem;
    --font-size-5xl: 2.2rem;
    --font-size-6xl: 2.5rem;
    --font-size-7xl: 3rem;
    --font-size-8xl: 3.5rem;

    /* Font weights */
    --font-weight-light: 300;
    --font-weight-normal: 400;
    --font-weight-medium: 500;
    --font-weight-semibold: 600;
    --font-weight-bold: 700;

    /* Spacing */
    --space-1: 0.25rem;
    --space-2: 0.5rem;
    --space-3: 0.75rem;
    --space-4: 1rem;
    --space-5: 1.25rem;
    --space-6: 1.5rem;
    --space-8: 2rem;
    --space-10: 2.5rem;
    --space-12: 3rem;
    --space-16: 4rem;
    --space-20: 5rem;

    /* Border radius */
    --radius-sm: 0.125rem;
    --radius-base: 0.25rem;
    --radius-md: 0.375rem;
    --radius-lg: 0.5rem;
    --radius-xl: 0.75rem;
    --radius-2xl: 1rem;
    --radius-3xl: 1.5rem;
    --radius-full: 9999px;

    /* Shadows */
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    --shadow-primary: 0 10px 30px rgba(102, 126, 234, 0.3);
    --shadow-cta: 0 10px 30px rgba(255, 107, 107, 0.4);
    --shadow-glass: 0 8px 32px rgba(0, 0, 0, 0.1);

    /* Transitions */
    --transition-fast: 150ms ease;
    --transition-base: 300ms ease;
    --transition-slow: 500ms ease;
    --transition-all: all 300ms ease;
    --transition-colors: background-color 300ms ease, border-color 300ms ease, color 300ms ease;
    --transition-transform: transform 300ms ease;

    /* Z-indices */
    --z-dropdown: 1000;
    --z-overlay: 1300;
    --z-modal: 1400;
    --z-toast: 1700;
  }
`;

// Export default theme
export default cosmicTheme;