"use strict";
exports.id = 293;
exports.ids = [293];
exports.modules = {

/***/ 4679:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8980);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8154);
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(123);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7131);
const GlobalStyle=(0,styled_components__WEBPACK_IMPORTED_MODULE_3__.createGlobalStyle)(["@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Poppins:wght@300;400;500;600&display=swap');*{margin:0;padding:0;box-sizing:border-box;}body{font-family:'Inter',sans-serif;line-height:1.6;color:#333;overflow-x:hidden;}a{text-decoration:none;color:inherit;}button{border:none;background:none;cursor:pointer;font-family:inherit;}.cosmic-gradient{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);}.nature-gradient{background:linear-gradient(135deg,#56ab2f 0%,#a8e6cf 100%);}.minimal-gradient{background:linear-gradient(135deg,#f5f7fa 0%,#c3cfe2 100%);}"]);const LayoutContainer=styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div.withConfig({displayName:"Layout__LayoutContainer",componentId:"sc-b7tupj-0"})(["min-height:100vh;display:flex;flex-direction:column;"]);const Navigation=styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].nav.withConfig({displayName:"Layout__Navigation",componentId:"sc-b7tupj-1"})(["position:fixed;top:0;left:0;right:0;background:rgba(255,255,255,0.95);backdrop-filter:blur(20px);z-index:1000;padding:1rem 2rem;box-shadow:0 2px 20px rgba(0,0,0,0.1);"]);const NavContainer=styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div.withConfig({displayName:"Layout__NavContainer",componentId:"sc-b7tupj-2"})(["max-width:1200px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;"]);const Logo=(0,styled_components__WEBPACK_IMPORTED_MODULE_3__["default"])(gatsby__WEBPACK_IMPORTED_MODULE_2__.Link).withConfig({displayName:"Layout__Logo",componentId:"sc-b7tupj-3"})(["font-family:'Poppins',sans-serif;font-weight:700;font-size:1.3rem;color:#667eea;text-decoration:none;display:flex;align-items:center;gap:0.5rem;"]);const NavLinks=styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div.withConfig({displayName:"Layout__NavLinks",componentId:"sc-b7tupj-4"})(["display:flex;gap:2rem;align-items:center;@media (max-width:768px){gap:1rem;}"]);const NavLink=(0,styled_components__WEBPACK_IMPORTED_MODULE_3__["default"])(gatsby__WEBPACK_IMPORTED_MODULE_2__.Link).withConfig({displayName:"Layout__NavLink",componentId:"sc-b7tupj-5"})(["color:#333;text-decoration:none;font-weight:500;transition:color 0.3s ease;&:hover{color:#667eea;}"]);const NavCTAButton=styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].a.withConfig({displayName:"Layout__NavCTAButton",componentId:"sc-b7tupj-6"})(["background:linear-gradient(45deg,#667eea,#764ba2);color:white;padding:0.7rem 1.5rem;border-radius:25px;text-decoration:none;font-weight:600;font-size:0.9rem;transition:all 0.3s ease;&:hover{transform:translateY(-2px);box-shadow:0 5px 15px rgba(102,126,234,0.4);}@media (max-width:768px){padding:0.6rem 1.2rem;font-size:0.8rem;}"]);const BackButton=styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].a.withConfig({displayName:"Layout__BackButton",componentId:"sc-b7tupj-7"})(["position:fixed;top:2rem;left:2rem;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);color:white;padding:0.5rem 1rem;border-radius:20px;backdrop-filter:blur(10px);transition:all 0.3s ease;z-index:1000;font-size:0.9rem;&:hover{background:rgba(255,255,255,0.2);transform:translateY(-2px);}"]);const MainContent=styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].main.withConfig({displayName:"Layout__MainContent",componentId:"sc-b7tupj-8"})(["padding-top:",";"],props=>props.hasNav?'80px':'0');const Layout=({children,title="Cosmic Tab Coach",description="Transform every browser moment into a cosmic opportunity for growth, peace, and self-care",showBackButton=false,showNav=false,backLink="/"})=>{return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(LayoutContainer,null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(GlobalStyle,null),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_helmet__WEBPACK_IMPORTED_MODULE_1__.Helmet,null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("title",null,title),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("meta",{name:"description",content:description}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("meta",{property:"og:title",content:title}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("meta",{property:"og:description",content:description}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("meta",{property:"og:type",content:"website"}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("meta",{name:"twitter:card",content:"summary_large_image"}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("meta",{name:"twitter:title",content:title}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("meta",{name:"twitter:description",content:description})),showNav&&/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Navigation,null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(NavContainer,null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Logo,{to:"/"},"\uD83C\uDF1F Cosmic Tab Coach"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(NavLinks,null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(NavLink,{to:"/demos"},"Demos"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(NavLink,{to:"/roadmap"},"Roadmap"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(NavLink,{to:"/cosmic-tab"},"Try It"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(NavCTAButton,{href:"https://chrome.google.com/webstore/detail/cosmic-tab-coach/placeholder",target:"_blank",rel:"noopener noreferrer"},"Add to Chrome")))),showBackButton&&!showNav&&/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(BackButton,{href:backLink},"\u2190 Back"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(MainContent,{hasNav:showNav},children));};/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Layout);

/***/ }),

/***/ 5631:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ pages)
});

// EXTERNAL MODULE: external "/Users/jessehenson/Desktop/Projects/alyssa-extension/node_modules/react/index.js"
var index_js_ = __webpack_require__(8980);
var index_js_default = /*#__PURE__*/__webpack_require__.n(index_js_);
// EXTERNAL MODULE: ./.cache/gatsby-browser-entry.js + 11 modules
var gatsby_browser_entry = __webpack_require__(123);
// EXTERNAL MODULE: ./node_modules/styled-components/dist/styled-components.esm.js + 9 modules
var styled_components_esm = __webpack_require__(7131);
// EXTERNAL MODULE: ./src/components/Layout.js
var Layout = __webpack_require__(4679);
;// ./src/cosmic-theme.js
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
 */const cosmicTheme={// =====================================================
// COLORS
// =====================================================
colors:{// Primary Brand Colors
primary:{50:'#f8faff',100:'#e6ecff',200:'#c4d3ff',300:'#9bb3ff',400:'#7d96ff',500:'#667eea',// Primary brand color
600:'#5a67d8',700:'#4c51bf',800:'#434190',900:'#3c366b'},// Secondary Brand Colors  
secondary:{50:'#faf5ff',100:'#e9d8fd',200:'#d6bcfa',300:'#b794f6',400:'#9f7aea',500:'#764ba2',// Secondary brand color
600:'#6b46c1',700:'#553c9a',800:'#44337a',900:'#322659'},// Accent Colors (CTAs, highlights)
accent:{coral:{50:'#fff5f5',100:'#fed7d7',200:'#feb2b2',300:'#fc8181',400:'#f56565',500:'#ff6b6b',// Primary CTA color
600:'#e53e3e',700:'#c53030',800:'#9b2c2c',900:'#742a2a'},orange:{50:'#fffaf0',100:'#feebc8',200:'#fbd38d',300:'#f6ad55',400:'#ed8936',500:'#ee5a24',// Secondary CTA color
600:'#dd6b20',700:'#c05621',800:'#9c4221',900:'#7b341e'}},// Semantic Colors
success:{50:'#f0fff4',100:'#c6f6d5',200:'#9ae6b4',300:'#68d391',400:'#48bb78',500:'#38a169',600:'#2f855a',700:'#276749',800:'#22543d',900:'#1a202c'},warning:{50:'#fffbeb',100:'#fef3c7',200:'#fde68a',300:'#fcd34d',400:'#fbbf24',500:'#f59e0b',600:'#d97706',700:'#b45309',800:'#92400e',900:'#78350f'},error:{50:'#fef2f2',100:'#fee2e2',200:'#fecaca',300:'#fca5a5',400:'#f87171',500:'#ef4444',600:'#dc2626',700:'#b91c1c',800:'#991b1b',900:'#7f1d1d'},// Neutral Colors
gray:{50:'#f9fafb',100:'#f3f4f6',200:'#e5e7eb',300:'#d1d5db',400:'#9ca3af',500:'#6b7280',600:'#4b5563',700:'#374151',800:'#1f2937',900:'#111827'},// Text Colors (semantic)
text:{primary:'#333333',secondary:'#666666',tertiary:'#888888',muted:'#999999',inverse:'#ffffff',onPrimary:'#ffffff',onSecondary:'#ffffff',onAccent:'#ffffff'},// Background Colors
background:{primary:'#ffffff',secondary:'#f8f9fa',tertiary:'#f1f3f4',overlay:'rgba(0, 0, 0, 0.5)',glass:'rgba(255, 255, 255, 0.95)',glassDark:'rgba(255, 255, 255, 0.1)'}},// =====================================================
// GRADIENTS
// =====================================================
gradients:{// Primary brand gradient (main cosmic theme)
primary:'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',// CTA gradients
cta:'linear-gradient(45deg, #ff6b6b, #ee5a24)',ctaHover:'linear-gradient(45deg, #f56565, #dd6b20)',// Theme variations
themes:{cosmic:'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',nature:'linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%)',minimal:'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',sunset:'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',ocean:'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'},// Glass/overlay effects
glass:{light:'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',primary:'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',overlay:'linear-gradient(135deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.05))'},// Announcement/feature highlight
announcement:'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',feature:'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'},// =====================================================
// TYPOGRAPHY
// =====================================================
typography:{// Font families
fonts:{body:"'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",heading:"'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",mono:"'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace"},// Font sizes (rem-based scale)
fontSizes:{xs:'0.7rem',// 11.2px
sm:'0.8rem',// 12.8px  
base:'0.85rem',// 13.6px
md:'0.9rem',// 14.4px
lg:'1rem',// 16px
xl:'1.1rem',// 17.6px
'2xl':'1.3rem',// 20.8px
'3xl':'1.5rem',// 24px
'4xl':'1.8rem',// 28.8px
'5xl':'2.2rem',// 35.2px
'6xl':'2.5rem',// 40px
'7xl':'3rem',// 48px
'8xl':'3.5rem',// 56px
'9xl':'4rem'// 64px
},// Font weights
fontWeights:{light:300,normal:400,medium:500,semibold:600,bold:700,extrabold:800},// Line heights
lineHeights:{tight:1.2,base:1.4,relaxed:1.6,loose:1.8},// Letter spacing
letterSpacing:{tight:'-0.025em',normal:'0',wide:'0.025em',wider:'0.05em',widest:'0.1em'}},// =====================================================
// SPACING SYSTEM
// =====================================================
space:{px:'1px',0:'0',0.5:'0.125rem',// 2px
1:'0.25rem',// 4px
1.5:'0.375rem',// 6px
2:'0.5rem',// 8px
2.5:'0.625rem',// 10px
3:'0.75rem',// 12px
3.5:'0.875rem',// 14px
4:'1rem',// 16px
5:'1.25rem',// 20px
6:'1.5rem',// 24px
7:'1.75rem',// 28px
8:'2rem',// 32px
9:'2.25rem',// 36px
10:'2.5rem',// 40px
12:'3rem',// 48px
16:'4rem',// 64px
20:'5rem',// 80px
24:'6rem',// 96px
32:'8rem',// 128px
40:'10rem',// 160px
48:'12rem',// 192px
56:'14rem',// 224px
64:'16rem'// 256px
},// =====================================================
// BORDER RADIUS
// =====================================================
radii:{none:'0',sm:'0.125rem',// 2px
base:'0.25rem',// 4px
md:'0.375rem',// 6px
lg:'0.5rem',// 8px
xl:'0.75rem',// 12px
'2xl':'1rem',// 16px
'3xl':'1.5rem',// 24px
'4xl':'2rem',// 32px
full:'9999px',// Fully rounded
// Semantic values
button:'0.5rem',card:'1rem',modal:'1.25rem',pill:'9999px'},// =====================================================
// SHADOWS & ELEVATION
// =====================================================
shadows:{none:'none',sm:'0 1px 2px 0 rgba(0, 0, 0, 0.05)',base:'0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',md:'0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',lg:'0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',xl:'0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)','2xl':'0 25px 50px -12px rgba(0, 0, 0, 0.25)',inner:'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',// Colored shadows for CTAs and interactions
primary:'0 10px 30px rgba(102, 126, 234, 0.3)',primaryHover:'0 15px 40px rgba(102, 126, 234, 0.4)',cta:'0 10px 30px rgba(255, 107, 107, 0.4)',ctaHover:'0 15px 40px rgba(255, 107, 107, 0.6)',// Glass effect shadows
glass:'0 8px 32px rgba(0, 0, 0, 0.1)',glassHover:'0 12px 40px rgba(0, 0, 0, 0.15)'},// =====================================================
// TRANSITIONS & ANIMATIONS
// =====================================================
transitions:{// Duration
duration:{fast:'150ms',base:'300ms',slow:'500ms',slower:'1000ms'},// Easing functions
easing:{default:'ease',linear:'linear',in:'ease-in',out:'ease-out',inOut:'ease-in-out',bounce:'cubic-bezier(0.68, -0.55, 0.265, 1.55)',smooth:'cubic-bezier(0.4, 0, 0.2, 1)'},// Common transition combinations
all:'all 300ms ease',colors:'background-color 300ms ease, border-color 300ms ease, color 300ms ease',transform:'transform 300ms ease',opacity:'opacity 300ms ease',shadow:'box-shadow 300ms ease'},// =====================================================
// COMPONENT TOKENS
// =====================================================
components:{// Buttons
button:{// Primary button
primary:{background:'linear-gradient(45deg, #667eea, #764ba2)',color:'#ffffff',padding:'1rem 2rem',borderRadius:'9999px',fontWeight:600,fontSize:'1rem',border:'none',cursor:'pointer',transition:'all 300ms ease',textTransform:'none',letterSpacing:'0.025em'},// CTA button
cta:{background:'linear-gradient(45deg, #ff6b6b, #ee5a24)',color:'#ffffff',padding:'1.2rem 2.5rem',borderRadius:'9999px',fontWeight:600,fontSize:'1.1rem',border:'none',cursor:'pointer',transition:'all 300ms ease',textTransform:'uppercase',letterSpacing:'0.05em',boxShadow:'0 10px 30px rgba(255, 107, 107, 0.4)'},// Secondary button
secondary:{background:'rgba(255, 255, 255, 0.2)',color:'#ffffff',padding:'1rem 2rem',borderRadius:'9999px',fontWeight:600,fontSize:'1rem',border:'2px solid rgba(255, 255, 255, 0.3)',cursor:'pointer',transition:'all 300ms ease',textTransform:'none',letterSpacing:'0.025em'},// Ghost button  
ghost:{background:'transparent',color:'#667eea',padding:'0.8rem 1.5rem',borderRadius:'0.5rem',fontWeight:500,fontSize:'0.9rem',border:'1px solid rgba(102, 126, 234, 0.3)',cursor:'pointer',transition:'all 300ms ease'}},// Cards
card:{background:'#ffffff',borderRadius:'1rem',padding:'1.5rem',boxShadow:'0 10px 40px rgba(0, 0, 0, 0.1)',border:'1px solid #f0f0f0',transition:'all 300ms ease'},// Glass card
glassCard:{background:'rgba(255, 255, 255, 0.95)',backdropFilter:'blur(20px)',borderRadius:'1rem',padding:'1.5rem',border:'1px solid rgba(255, 255, 255, 0.2)',transition:'all 300ms ease'},// Modal
modal:{background:'rgba(0, 0, 0, 0.8)',backdropFilter:'blur(5px)',borderRadius:'1.25rem',padding:'2rem',boxShadow:'0 20px 40px rgba(0, 0, 0, 0.3)'},// Input fields
input:{background:'#ffffff',border:'1px solid #d1d5db',borderRadius:'0.5rem',padding:'0.75rem 1rem',fontSize:'0.9rem',color:'#333333',transition:'all 300ms ease',outline:'none'},// Coach interface
coach:{container:{background:'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',borderRadius:'1.25rem',padding:'1.25rem',border:'1px solid rgba(102, 126, 234, 0.2)',backdropFilter:'blur(10px)'},userMessage:{background:'linear-gradient(135deg, #667eea, #764ba2)',color:'#ffffff',borderRadius:'1rem',padding:'0.75rem 1rem',marginLeft:'20%',fontSize:'0.9rem'},coachMessage:{background:'rgba(102, 126, 234, 0.1)',color:'#333333',borderRadius:'1rem',padding:'0.75rem 1rem',marginRight:'20%',fontSize:'0.9rem'}}},// =====================================================
// BREAKPOINTS
// =====================================================
breakpoints:{sm:'640px',md:'768px',lg:'1024px',xl:'1280px','2xl':'1536px'},// =====================================================
// Z-INDEX SCALE
// =====================================================
zIndices:{hide:-1,auto:'auto',base:0,docked:10,dropdown:1000,sticky:1100,banner:1200,overlay:1300,modal:1400,popover:1500,skipLink:1600,toast:1700,tooltip:1800}};// =====================================================
// CSS CUSTOM PROPERTIES VERSION
// =====================================================
const cosmicThemeCSS=(/* unused pure expression or super */ null && (`
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
`));// Export default theme
/* harmony default export */ const cosmic_theme = ((/* unused pure expression or super */ null && (cosmicTheme)));
;// ./src/pages/index.js
// Hero Section Styles
const HeroSection=styled_components_esm["default"].section.withConfig({displayName:"pages__HeroSection",componentId:"sc-1vyus3z-0"})(["background:",";min-height:100vh;display:flex;align-items:center;justify-content:center;padding:",";position:relative;overflow:hidden;"],cosmicTheme.gradients.primary,cosmicTheme.space[8]);const HeroContent=styled_components_esm["default"].div.withConfig({displayName:"pages__HeroContent",componentId:"sc-1vyus3z-1"})(["max-width:800px;text-align:center;color:",";z-index:2;"],cosmicTheme.colors.text.inverse);const HeroTitle=styled_components_esm["default"].h1.withConfig({displayName:"pages__HeroTitle",componentId:"sc-1vyus3z-2"})(["font-family:",";font-size:",";font-weight:",";margin-bottom:",";text-shadow:0 4px 20px rgba(0,0,0,0.3);@media (max-width:","){font-size:",";}"],cosmicTheme.typography.fonts.heading,cosmicTheme.typography.fontSizes['8xl'],cosmicTheme.typography.fontWeights.bold,cosmicTheme.space[6],cosmicTheme.breakpoints.md,cosmicTheme.typography.fontSizes['6xl']);const HeroSubtitle=styled_components_esm["default"].p.withConfig({displayName:"pages__HeroSubtitle",componentId:"sc-1vyus3z-3"})(["font-size:",";margin-bottom:",";opacity:0.95;line-height:",";font-weight:",";@media (max-width:","){font-size:",";}"],cosmicTheme.typography.fontSizes['2xl'],cosmicTheme.space[8],cosmicTheme.typography.lineHeights.relaxed,cosmicTheme.typography.fontWeights.light,cosmicTheme.breakpoints.md,cosmicTheme.typography.fontSizes.xl);const CTAButton=styled_components_esm["default"].a.withConfig({displayName:"pages__CTAButton",componentId:"sc-1vyus3z-4"})(["display:inline-block;background:",";color:",";padding:"," ",";border-radius:",";font-weight:",";font-size:",";text-decoration:none;text-transform:uppercase;letter-spacing:",";box-shadow:",";transition:",";margin:0 "," "," 0;&:hover{transform:translateY(-3px);box-shadow:",";}@media (max-width:","){padding:"," ",";font-size:",";margin:",";display:block;margin-bottom:",";}"],cosmicTheme.gradients.cta,cosmicTheme.colors.text.onAccent,cosmicTheme.space[5],cosmicTheme.space[10],cosmicTheme.radii.pill,cosmicTheme.typography.fontWeights.semibold,cosmicTheme.typography.fontSizes.xl,cosmicTheme.typography.letterSpacing.wider,cosmicTheme.shadows.cta,cosmicTheme.transitions.all,cosmicTheme.space[4],cosmicTheme.space[4],cosmicTheme.shadows.ctaHover,cosmicTheme.breakpoints.md,cosmicTheme.space[4],cosmicTheme.space[8],cosmicTheme.typography.fontSizes.lg,cosmicTheme.space[2],cosmicTheme.space[4]);const SecondaryButton=(0,styled_components_esm["default"])(gatsby_browser_entry.Link).withConfig({displayName:"pages__SecondaryButton",componentId:"sc-1vyus3z-5"})(["display:inline-block;background:rgba(255,255,255,0.2);color:",";padding:"," ",";border-radius:",";font-weight:",";font-size:",";text-decoration:none;border:2px solid rgba(255,255,255,0.3);transition:",";margin:0 ",";&:hover{background:rgba(255,255,255,0.3);transform:translateY(-2px);}@media (max-width:","){padding:"," ",";font-size:",";margin:",";display:block;}"],cosmicTheme.colors.text.inverse,cosmicTheme.space[5],cosmicTheme.space[10],cosmicTheme.radii.pill,cosmicTheme.typography.fontWeights.semibold,cosmicTheme.typography.fontSizes.xl,cosmicTheme.transitions.all,cosmicTheme.space[4],cosmicTheme.breakpoints.md,cosmicTheme.space[4],cosmicTheme.space[8],cosmicTheme.typography.fontSizes.lg,cosmicTheme.space[2]);// Features Section Styles
const FeaturesSection=styled_components_esm["default"].section.withConfig({displayName:"pages__FeaturesSection",componentId:"sc-1vyus3z-6"})(["background:",";padding:"," ",";"],cosmicTheme.colors.background.primary,cosmicTheme.space[20],cosmicTheme.space[8]);const Container=styled_components_esm["default"].div.withConfig({displayName:"pages__Container",componentId:"sc-1vyus3z-7"})(["max-width:1200px;margin:0 auto;"]);const SectionTitle=styled_components_esm["default"].h2.withConfig({displayName:"pages__SectionTitle",componentId:"sc-1vyus3z-8"})(["font-family:",";font-size:",";text-align:center;margin-bottom:",";color:",";font-weight:",";"],cosmicTheme.typography.fonts.heading,cosmicTheme.typography.fontSizes['6xl'],cosmicTheme.space[4],cosmicTheme.colors.text.primary,cosmicTheme.typography.fontWeights.bold);const SectionSubtitle=styled_components_esm["default"].p.withConfig({displayName:"pages__SectionSubtitle",componentId:"sc-1vyus3z-9"})(["text-align:center;font-size:",";color:",";margin-bottom:",";max-width:600px;margin-left:auto;margin-right:auto;"],cosmicTheme.typography.fontSizes.xl,cosmicTheme.colors.text.secondary,cosmicTheme.space[12]);const FeaturesGrid=styled_components_esm["default"].div.withConfig({displayName:"pages__FeaturesGrid",componentId:"sc-1vyus3z-10"})(["display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:",";margin-bottom:",";"],cosmicTheme.space[8],cosmicTheme.space[12]);const FeatureCard=styled_components_esm["default"].div.withConfig({displayName:"pages__FeatureCard",componentId:"sc-1vyus3z-11"})(["background:",";border-radius:",";padding:",";box-shadow:",";transition:",";text-align:center;border:1px solid ",";&:hover{transform:translateY(-10px);box-shadow:",";}"],cosmicTheme.colors.background.primary,cosmicTheme.radii['3xl'],cosmicTheme.space[8],cosmicTheme.shadows.lg,cosmicTheme.transitions.all,cosmicTheme.colors.gray[100],cosmicTheme.shadows.xl);const FeatureIcon=styled_components_esm["default"].div.withConfig({displayName:"pages__FeatureIcon",componentId:"sc-1vyus3z-12"})(["font-size:",";margin-bottom:",";"],cosmicTheme.typography.fontSizes['7xl'],cosmicTheme.space[4]);const FeatureTitle=styled_components_esm["default"].h3.withConfig({displayName:"pages__FeatureTitle",componentId:"sc-1vyus3z-13"})(["font-family:",";font-size:",";margin-bottom:",";color:",";font-weight:",";"],cosmicTheme.typography.fonts.heading,cosmicTheme.typography.fontSizes['2xl'],cosmicTheme.space[4],cosmicTheme.colors.text.primary,cosmicTheme.typography.fontWeights.semibold);const FeatureDescription=styled_components_esm["default"].p.withConfig({displayName:"pages__FeatureDescription",componentId:"sc-1vyus3z-14"})(["color:",";line-height:",";"],cosmicTheme.colors.text.secondary,cosmicTheme.typography.lineHeights.relaxed);// Screenshot Section Styles
const ScreenshotSection=styled_components_esm["default"].section.withConfig({displayName:"pages__ScreenshotSection",componentId:"sc-1vyus3z-15"})(["background:",";padding:"," ",";"],cosmicTheme.gradients.themes.minimal,cosmicTheme.space[20],cosmicTheme.space[8]);const ScreenshotGrid=styled_components_esm["default"].div.withConfig({displayName:"pages__ScreenshotGrid",componentId:"sc-1vyus3z-16"})(["display:grid;grid-template-columns:repeat(auto-fit,minmax(400px,1fr));gap:3rem;margin-top:3rem;@media (max-width:768px){grid-template-columns:1fr;}"]);const ScreenshotCard=styled_components_esm["default"].div.withConfig({displayName:"pages__ScreenshotCard",componentId:"sc-1vyus3z-17"})(["background:white;border-radius:20px;padding:1.5rem;box-shadow:0 20px 60px rgba(0,0,0,0.1);transition:all 0.3s ease;&:hover{transform:translateY(-5px);box-shadow:0 30px 80px rgba(0,0,0,0.15);}"]);const ScreenshotImage=styled_components_esm["default"].div.withConfig({displayName:"pages__ScreenshotImage",componentId:"sc-1vyus3z-18"})(["width:100%;height:250px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);border-radius:12px;margin-bottom:1rem;display:flex;align-items:center;justify-content:center;color:white;font-size:1.2rem;font-weight:500;"]);const ScreenshotTitle=styled_components_esm["default"].h4.withConfig({displayName:"pages__ScreenshotTitle",componentId:"sc-1vyus3z-19"})(["font-family:'Poppins',sans-serif;margin-bottom:0.5rem;color:#333;font-weight:600;"]);const ScreenshotDescription=styled_components_esm["default"].p.withConfig({displayName:"pages__ScreenshotDescription",componentId:"sc-1vyus3z-20"})(["color:#666;font-size:0.9rem;line-height:1.5;"]);// Pricing Section Styles
const PricingSection=styled_components_esm["default"].section.withConfig({displayName:"pages__PricingSection",componentId:"sc-1vyus3z-21"})(["background:white;padding:5rem 2rem;"]);const PricingGrid=styled_components_esm["default"].div.withConfig({displayName:"pages__PricingGrid",componentId:"sc-1vyus3z-22"})(["display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:2rem;max-width:800px;margin:3rem auto 0;"]);const PricingCard=styled_components_esm["default"].div.withConfig({displayName:"pages__PricingCard",componentId:"sc-1vyus3z-23"})(["background:white;border-radius:20px;padding:2rem;box-shadow:0 20px 60px rgba(0,0,0,0.1);border:2px solid ",";position:relative;text-align:center;transition:all 0.3s ease;&:hover{transform:translateY(-5px);box-shadow:0 30px 80px rgba(0,0,0,0.15);}"],props=>props.featured?'#667eea':'#f0f0f0');const PricingBadge=styled_components_esm["default"].div.withConfig({displayName:"pages__PricingBadge",componentId:"sc-1vyus3z-24"})(["background:linear-gradient(45deg,#667eea,#764ba2);color:white;padding:0.5rem 1rem;border-radius:20px;font-size:0.8rem;font-weight:600;position:absolute;top:-10px;left:50%;transform:translateX(-50%);text-transform:uppercase;letter-spacing:1px;"]);const PricingTitle=styled_components_esm["default"].h3.withConfig({displayName:"pages__PricingTitle",componentId:"sc-1vyus3z-25"})(["font-family:'Poppins',sans-serif;font-size:1.5rem;margin-bottom:1rem;color:#333;font-weight:600;"]);const PricingPrice=styled_components_esm["default"].div.withConfig({displayName:"pages__PricingPrice",componentId:"sc-1vyus3z-26"})(["font-size:2.5rem;font-weight:700;color:#667eea;margin-bottom:0.5rem;"]);const PricingPeriod=styled_components_esm["default"].div.withConfig({displayName:"pages__PricingPeriod",componentId:"sc-1vyus3z-27"})(["color:#666;margin-bottom:2rem;"]);const PricingFeatures=styled_components_esm["default"].ul.withConfig({displayName:"pages__PricingFeatures",componentId:"sc-1vyus3z-28"})(["list-style:none;margin-bottom:2rem;text-align:left;"]);const PricingFeature=styled_components_esm["default"].li.withConfig({displayName:"pages__PricingFeature",componentId:"sc-1vyus3z-29"})(["display:flex;align-items:center;margin-bottom:0.8rem;color:#555;&::before{content:\"\u2713\";color:#4caf50;font-weight:bold;margin-right:0.8rem;}"]);const PricingButton=styled_components_esm["default"].a.withConfig({displayName:"pages__PricingButton",componentId:"sc-1vyus3z-30"})(["display:block;background:",";color:white;padding:1rem 2rem;border-radius:12px;text-decoration:none;font-weight:600;transition:all 0.3s ease;&:hover{transform:translateY(-2px);box-shadow:0 10px 30px rgba(102,126,234,0.3);}"],props=>props.featured?'linear-gradient(45deg, #667eea, #764ba2)':'linear-gradient(45deg, #ff6b6b, #ee5a24)');// New Mindful Coach Announcement Styles
const AnnouncementSection=styled_components_esm["default"].section.withConfig({displayName:"pages__AnnouncementSection",componentId:"sc-1vyus3z-31"})(["background:",";padding:"," ",";position:relative;overflow:hidden;&::before{content:'';position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:radial-gradient(circle,rgba(255,255,255,0.1) 0%,transparent 70%);animation:cosmic-pulse 8s ease-in-out infinite;pointer-events:none;}@keyframes cosmic-pulse{0%,100%{transform:scale(0.8) rotate(0deg);opacity:0.3;}50%{transform:scale(1.2) rotate(180deg);opacity:0.6;}}"],cosmicTheme.gradients.announcement,cosmicTheme.space[16],cosmicTheme.space[8]);const AnnouncementContent=styled_components_esm["default"].div.withConfig({displayName:"pages__AnnouncementContent",componentId:"sc-1vyus3z-32"})(["max-width:900px;margin:0 auto;text-align:center;color:",";position:relative;z-index:2;"],cosmicTheme.colors.text.inverse);const AnnouncementBadge=styled_components_esm["default"].div.withConfig({displayName:"pages__AnnouncementBadge",componentId:"sc-1vyus3z-33"})(["display:inline-block;background:rgba(255,255,255,0.2);color:",";padding:"," ",";border-radius:",";font-weight:",";font-size:",";margin-bottom:",";text-transform:uppercase;letter-spacing:",";border:2px solid rgba(255,255,255,0.3);backdrop-filter:blur(10px);"],cosmicTheme.colors.text.inverse,cosmicTheme.space[3],cosmicTheme.space[8],cosmicTheme.radii['4xl'],cosmicTheme.typography.fontWeights.semibold,cosmicTheme.typography.fontSizes.md,cosmicTheme.space[6],cosmicTheme.typography.letterSpacing.widest);const AnnouncementTitle=styled_components_esm["default"].h2.withConfig({displayName:"pages__AnnouncementTitle",componentId:"sc-1vyus3z-34"})(["font-family:",";font-size:",";font-weight:",";margin-bottom:",";text-shadow:0 4px 20px rgba(0,0,0,0.3);line-height:",";@media (max-width:","){font-size:",";}"],cosmicTheme.typography.fonts.heading,cosmicTheme.typography.fontSizes['7xl'],cosmicTheme.typography.fontWeights.bold,cosmicTheme.space[6],cosmicTheme.typography.lineHeights.tight,cosmicTheme.breakpoints.md,cosmicTheme.typography.fontSizes['5xl']);const AnnouncementSubtitle=styled_components_esm["default"].p.withConfig({displayName:"pages__AnnouncementSubtitle",componentId:"sc-1vyus3z-35"})(["font-size:1.3rem;margin-bottom:2rem;opacity:0.95;line-height:1.6;font-weight:300;max-width:700px;margin-left:auto;margin-right:auto;@media (max-width:768px){font-size:1.1rem;}"]);const AnnouncementFeatures=styled_components_esm["default"].div.withConfig({displayName:"pages__AnnouncementFeatures",componentId:"sc-1vyus3z-36"})(["display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:2rem;margin:3rem 0;max-width:800px;margin-left:auto;margin-right:auto;"]);const AnnouncementFeature=styled_components_esm["default"].div.withConfig({displayName:"pages__AnnouncementFeature",componentId:"sc-1vyus3z-37"})(["background:rgba(255,255,255,0.15);border-radius:20px;padding:1.5rem;backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.2);transition:all 0.3s ease;&:hover{background:rgba(255,255,255,0.2);transform:translateY(-5px);}"]);const AnnouncementFeatureIcon=styled_components_esm["default"].div.withConfig({displayName:"pages__AnnouncementFeatureIcon",componentId:"sc-1vyus3z-38"})(["font-size:2.5rem;margin-bottom:1rem;"]);const AnnouncementFeatureTitle=styled_components_esm["default"].h4.withConfig({displayName:"pages__AnnouncementFeatureTitle",componentId:"sc-1vyus3z-39"})(["font-family:'Poppins',sans-serif;font-size:1.1rem;font-weight:600;margin-bottom:0.8rem;color:white;"]);const AnnouncementFeatureDesc=styled_components_esm["default"].p.withConfig({displayName:"pages__AnnouncementFeatureDesc",componentId:"sc-1vyus3z-40"})(["font-size:0.9rem;opacity:0.9;line-height:1.5;color:white;"]);const AnnouncementCTA=styled_components_esm["default"].div.withConfig({displayName:"pages__AnnouncementCTA",componentId:"sc-1vyus3z-41"})(["margin-top:2.5rem;"]);const AnnouncementButton=(0,styled_components_esm["default"])(gatsby_browser_entry.Link).withConfig({displayName:"pages__AnnouncementButton",componentId:"sc-1vyus3z-42"})(["display:inline-block;background:white;color:#ff6b6b;padding:1.2rem 2.5rem;border-radius:50px;font-weight:700;font-size:1.1rem;text-decoration:none;text-transform:uppercase;letter-spacing:1px;box-shadow:0 10px 30px rgba(0,0,0,0.2);transition:all 0.3s ease;margin:0 1rem;&:hover{transform:translateY(-3px);box-shadow:0 15px 40px rgba(0,0,0,0.3);background:#f8f9fa;}@media (max-width:768px){padding:1rem 2rem;font-size:1rem;margin:0.5rem;display:block;margin-bottom:1rem;}"]);// Data for the landing page
const features=[{icon:'🧘‍♀️',title:'AI Mindful Coach',description:'Your personal cosmic wellness guide that detects stress patterns and offers gentle wisdom with guided interventions when you need them most.'},{icon:'🌟',title:'AI-Powered Affirmations',description:'Personalized positive affirmations delivered every time you open a new tab, carefully crafted to boost your mindset and energy.'},{icon:'🎨',title:'Beautiful Themes',description:'Choose from stunning cosmic-inspired themes that transform your browser into a peaceful, mindful space.'},{icon:'🔒',title:'Privacy First',description:'All data stays local on your device. No tracking, no data collection, just pure mindful moments.'},{icon:'📱',title:'Cross-Device Sync',description:'Sync your preferences and favorites across all your Chrome browsers and devices.'},{icon:'💎',title:'Premium Content',description:'Unlock exclusive themes, personalized AI content, and advanced customization options.'}];const screenshots=[{title:'AI Mindful Coach in Action',description:'Your personal wellness guide detects stress patterns and offers gentle, cosmic wisdom with guided breathing and grounding exercises.',image:'🧘‍♀️ Mindful Coach Interface'},{title:'Beautiful New Tab Experience',description:'Transform every new tab into a moment of peace and positivity with cosmic backgrounds and inspiring affirmations.',image:'New Tab Interface'},{title:'Personalized Settings',description:'Customize themes, affirmation frequency, and content preferences to match your unique mindfulness journey.',image:'Settings Panel'},{title:'Smart Affirmation System',description:'Our AI delivers contextually relevant affirmations based on time of day, your mood, and personal preferences.',image:'Affirmation Engine'}];const IndexPage=()=>{const{0:isMonthly,1:setIsMonthly}=(0,index_js_.useState)(true);// Chrome Web Store URL (placeholder for now)
const chromeStoreUrl="https://chrome.google.com/webstore/detail/cosmic-tab-coach/placeholder";return/*#__PURE__*/index_js_default().createElement(Layout/* default */.A,{title:"Cosmic Tab Coach - Transform Every Tab Into a Mindful Moment",description:"AI-powered Chrome extension that transforms new tabs into moments of positivity, peace, and personal growth. Get personalized affirmations and beautiful themes.",showNav:true},/*#__PURE__*/index_js_default().createElement(HeroSection,null,/*#__PURE__*/index_js_default().createElement(HeroContent,null,/*#__PURE__*/index_js_default().createElement(HeroTitle,null,"\uD83C\uDF1F Cosmic Tab Coach"),/*#__PURE__*/index_js_default().createElement(HeroSubtitle,null,"The first browser extension with an AI Mindful Coach that detects your stress and guides you to cosmic peace. Transform every tab into a mindful moment with gentle wisdom and wellness interventions."),/*#__PURE__*/index_js_default().createElement("div",null,/*#__PURE__*/index_js_default().createElement(CTAButton,{href:chromeStoreUrl,target:"_blank",rel:"noopener noreferrer"},"Add to Chrome - Free"),/*#__PURE__*/index_js_default().createElement(SecondaryButton,{to:"/cosmic-tab"},"Try Demo")))),/*#__PURE__*/index_js_default().createElement(AnnouncementSection,null,/*#__PURE__*/index_js_default().createElement(AnnouncementContent,null,/*#__PURE__*/index_js_default().createElement(AnnouncementBadge,null,"\u2728 Just Launched"),/*#__PURE__*/index_js_default().createElement(AnnouncementTitle,null,"\uD83E\uDDD8\u200D\u2640\uFE0F Meet Your AI Mindful Coach"),/*#__PURE__*/index_js_default().createElement(AnnouncementSubtitle,null,"The first browser extension with an AI wellness coach that detects when you're overwhelmed and offers gentle, cosmic wisdom to guide you back to your center."),/*#__PURE__*/index_js_default().createElement(AnnouncementFeatures,null,/*#__PURE__*/index_js_default().createElement(AnnouncementFeature,null,/*#__PURE__*/index_js_default().createElement(AnnouncementFeatureIcon,null,"\uD83E\uDEC2"),/*#__PURE__*/index_js_default().createElement(AnnouncementFeatureTitle,null,"Stress Detection"),/*#__PURE__*/index_js_default().createElement(AnnouncementFeatureDesc,null,"AI analyzes your messages to detect overwhelm, anxiety, and urgency patterns with gentle awareness.")),/*#__PURE__*/index_js_default().createElement(AnnouncementFeature,null,/*#__PURE__*/index_js_default().createElement(AnnouncementFeatureIcon,null,"\uD83C\uDF0C"),/*#__PURE__*/index_js_default().createElement(AnnouncementFeatureTitle,null,"Cosmic Wisdom"),/*#__PURE__*/index_js_default().createElement(AnnouncementFeatureDesc,null,"Receive guidance in our signature gentle, non-judgmental voice using cosmic metaphors and loving support.")),/*#__PURE__*/index_js_default().createElement(AnnouncementFeature,null,/*#__PURE__*/index_js_default().createElement(AnnouncementFeatureIcon,null,"\uD83D\uDCA8"),/*#__PURE__*/index_js_default().createElement(AnnouncementFeatureTitle,null,"Guided Interventions"),/*#__PURE__*/index_js_default().createElement(AnnouncementFeatureDesc,null,"Interactive breathing exercises, grounding techniques, and perspective shifts when you need them most."))),/*#__PURE__*/index_js_default().createElement(AnnouncementCTA,null,/*#__PURE__*/index_js_default().createElement(AnnouncementButton,{to:"/cosmic-tab"},"Try the Coach Now")))),/*#__PURE__*/index_js_default().createElement(FeaturesSection,null,/*#__PURE__*/index_js_default().createElement(Container,null,/*#__PURE__*/index_js_default().createElement(SectionTitle,null,"Why Choose Cosmic Tab Coach?"),/*#__PURE__*/index_js_default().createElement(SectionSubtitle,null,"More than just a new tab page - it's your AI-powered wellness companion with a personal mindful coach that understands your stress and guides you to cosmic peace."),/*#__PURE__*/index_js_default().createElement(FeaturesGrid,null,features.map((feature,index)=>/*#__PURE__*/index_js_default().createElement(FeatureCard,{key:index},/*#__PURE__*/index_js_default().createElement(FeatureIcon,null,feature.icon),/*#__PURE__*/index_js_default().createElement(FeatureTitle,null,feature.title),/*#__PURE__*/index_js_default().createElement(FeatureDescription,null,feature.description)))))),/*#__PURE__*/index_js_default().createElement(ScreenshotSection,null,/*#__PURE__*/index_js_default().createElement(Container,null,/*#__PURE__*/index_js_default().createElement(SectionTitle,null,"See It In Action"),/*#__PURE__*/index_js_default().createElement(SectionSubtitle,null,"Experience the beautiful, mindful interface that transforms your browsing experience."),/*#__PURE__*/index_js_default().createElement(ScreenshotGrid,null,screenshots.map((screenshot,index)=>/*#__PURE__*/index_js_default().createElement(ScreenshotCard,{key:index},/*#__PURE__*/index_js_default().createElement(ScreenshotImage,null,screenshot.image),/*#__PURE__*/index_js_default().createElement(ScreenshotTitle,null,screenshot.title),/*#__PURE__*/index_js_default().createElement(ScreenshotDescription,null,screenshot.description)))))),/*#__PURE__*/index_js_default().createElement(PricingSection,null,/*#__PURE__*/index_js_default().createElement(Container,null,/*#__PURE__*/index_js_default().createElement(SectionTitle,null,"Simple, Honest Pricing"),/*#__PURE__*/index_js_default().createElement(SectionSubtitle,null,"Start free forever. Upgrade when you're ready for premium mindfulness features."),/*#__PURE__*/index_js_default().createElement(PricingGrid,null,/*#__PURE__*/index_js_default().createElement(PricingCard,null,/*#__PURE__*/index_js_default().createElement(PricingTitle,null,"Free Forever"),/*#__PURE__*/index_js_default().createElement(PricingPrice,null,"$0"),/*#__PURE__*/index_js_default().createElement(PricingPeriod,null,"Always free"),/*#__PURE__*/index_js_default().createElement(PricingFeatures,null,/*#__PURE__*/index_js_default().createElement(PricingFeature,null,"Daily affirmations"),/*#__PURE__*/index_js_default().createElement(PricingFeature,null,"\uD83E\uDDD8\u200D\u2640\uFE0F Basic Mindful Coach (3 sessions/day)"),/*#__PURE__*/index_js_default().createElement(PricingFeature,null,"3 beautiful themes"),/*#__PURE__*/index_js_default().createElement(PricingFeature,null,"Basic customization"),/*#__PURE__*/index_js_default().createElement(PricingFeature,null,"Privacy-first approach"),/*#__PURE__*/index_js_default().createElement(PricingFeature,null,"No ads, ever")),/*#__PURE__*/index_js_default().createElement(PricingButton,{href:chromeStoreUrl,target:"_blank",rel:"noopener noreferrer"},"Get Started Free")),/*#__PURE__*/index_js_default().createElement(PricingCard,{featured:true},/*#__PURE__*/index_js_default().createElement(PricingBadge,null,"Most Popular"),/*#__PURE__*/index_js_default().createElement(PricingTitle,null,"Premium"),/*#__PURE__*/index_js_default().createElement(PricingPrice,null,"$",isMonthly?'0.99':'2.99'),/*#__PURE__*/index_js_default().createElement(PricingPeriod,null,isMonthly?'per month':'one-time'),/*#__PURE__*/index_js_default().createElement(PricingFeatures,null,/*#__PURE__*/index_js_default().createElement(PricingFeature,null,"Everything in Free"),/*#__PURE__*/index_js_default().createElement(PricingFeature,null,"\uD83E\uDDD8\u200D\u2640\uFE0F AI Mindful Coach with unlimited sessions"),/*#__PURE__*/index_js_default().createElement(PricingFeature,null,"\uD83E\uDEC2 Advanced stress detection & wellness interventions"),/*#__PURE__*/index_js_default().createElement(PricingFeature,null,"AI-personalized content"),/*#__PURE__*/index_js_default().createElement(PricingFeature,null,"10+ premium themes"),/*#__PURE__*/index_js_default().createElement(PricingFeature,null,"Advanced customization"),/*#__PURE__*/index_js_default().createElement(PricingFeature,null,"Cross-device sync"),/*#__PURE__*/index_js_default().createElement(PricingFeature,null,"Priority support")),/*#__PURE__*/index_js_default().createElement(PricingButton,{featured:true,href:"#upgrade"},"Upgrade to Premium"))),/*#__PURE__*/index_js_default().createElement("div",{style:{textAlign:'center',marginTop:'2rem'}},/*#__PURE__*/index_js_default().createElement("button",{onClick:()=>setIsMonthly(!isMonthly),style:{background:'none',border:'2px solid #667eea',borderRadius:'25px',padding:'0.8rem 1.5rem',color:'#667eea',fontWeight:'600',cursor:'pointer',transition:'all 0.3s ease'}},"Switch to ",isMonthly?'One-time':'Monthly'," Pricing")))),/*#__PURE__*/index_js_default().createElement(FeaturesSection,{style:{background:'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'}},/*#__PURE__*/index_js_default().createElement(Container,null,/*#__PURE__*/index_js_default().createElement(SectionTitle,null,"\uD83D\uDE80 Exciting Features Coming Soon"),/*#__PURE__*/index_js_default().createElement(SectionSubtitle,null,"We're building the future of mindful browsing with AI-powered personalization and deeper wellness integration."),/*#__PURE__*/index_js_default().createElement(FeaturesGrid,{style:{marginBottom:'2rem'}},/*#__PURE__*/index_js_default().createElement(FeatureCard,null,/*#__PURE__*/index_js_default().createElement(FeatureIcon,null,"\uD83E\uDDE0"),/*#__PURE__*/index_js_default().createElement(FeatureTitle,null,"Mood-Aware AI"),/*#__PURE__*/index_js_default().createElement(FeatureDescription,null,"AI that detects your emotional state and delivers perfectly timed affirmations for your current needs.")),/*#__PURE__*/index_js_default().createElement(FeatureCard,null,/*#__PURE__*/index_js_default().createElement(FeatureIcon,null,"\uD83D\uDDE3\uFE0F"),/*#__PURE__*/index_js_default().createElement(FeatureTitle,null,"Voice Affirmations"),/*#__PURE__*/index_js_default().createElement(FeatureDescription,null,"Custom AI-generated voice affirmations with soothing nature soundscapes for deeper mindfulness.")),/*#__PURE__*/index_js_default().createElement(FeatureCard,null,/*#__PURE__*/index_js_default().createElement(FeatureIcon,null,"\uD83E\uDD1D"),/*#__PURE__*/index_js_default().createElement(FeatureTitle,null,"Mindfulness Circles"),/*#__PURE__*/index_js_default().createElement(FeatureDescription,null,"Join small groups for shared mindfulness challenges and anonymous peer support."))),/*#__PURE__*/index_js_default().createElement("div",{style:{textAlign:'center'}},/*#__PURE__*/index_js_default().createElement(SecondaryButton,{to:"/roadmap",style:{background:'linear-gradient(45deg, #667eea, #764ba2)',color:'white',border:'none'}},"\uD83D\uDDFA\uFE0F View Full Roadmap")))),/*#__PURE__*/index_js_default().createElement(HeroSection,{style:{minHeight:'60vh'}},/*#__PURE__*/index_js_default().createElement(HeroContent,null,/*#__PURE__*/index_js_default().createElement(HeroTitle,{style:{fontSize:'2.5rem'}},"Ready to Transform Your Browsing?"),/*#__PURE__*/index_js_default().createElement(HeroSubtitle,null,"Join thousands of users who've made mindfulness a daily habit with Cosmic Tab Coach."),/*#__PURE__*/index_js_default().createElement("div",null,/*#__PURE__*/index_js_default().createElement(CTAButton,{href:chromeStoreUrl,target:"_blank",rel:"noopener noreferrer"},"Add to Chrome - Free"),/*#__PURE__*/index_js_default().createElement(SecondaryButton,{to:"/cosmic-tab"},"View Live Demo")),/*#__PURE__*/index_js_default().createElement("p",{style:{marginTop:'1rem',opacity:0.8,fontSize:'0.9rem'}},"\u2B50 Free forever \u2022 No signup required \u2022 Privacy-first \u2022 30-second setup"))));};/* harmony default export */ const pages = (IndexPage);

/***/ })

};
;
//# sourceMappingURL=component---src-pages-index-js.js.map