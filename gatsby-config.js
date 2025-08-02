module.exports = {
  siteMetadata: {
    title: "Cosmic Tab Coach",
    description: "Transform every browser moment into a cosmic opportunity for growth, peace, and self-care with AI-powered affirmations.",
    author: "Cosmic Tab Coach Team",
    siteUrl: "https://cosmic-tab-coach.netlify.app",
    keywords: [
      "chrome extension",
      "affirmations",
      "mindfulness",
      "cosmic",
      "wellness",
      "meditation",
      "self-care",
      "browser",
      "productivity"
    ]
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-styled-components",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "data",
        path: `${__dirname}/src/data/`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images/`,
      },
    },
    "gatsby-transformer-json",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Cosmic Tab Coach",
        short_name: "CosmicTab",
        start_url: "/",
        background_color: "#667eea",
        theme_color: "#764ba2",
        display: "minimal-ui",
        icon: "src/images/cosmic-icon.png", // Disabled for now
      },
    },
  ],
}