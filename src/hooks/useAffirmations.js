import { useState, useEffect } from 'react'

const themeMapping = {
  'cosmic': ['cosmic_connection', 'present_moment', 'inner_strength'],
  'nature': ['self_care', 'present_moment', 'inner_strength'],
  'minimal': ['present_moment', 'inner_strength', 'self_care'],
  'sunset': ['present_moment', 'self_care', 'cosmic_connection'],
  'ocean': ['self_care', 'present_moment', 'cosmic_connection'],
  'forest': ['inner_strength', 'self_care', 'present_moment']
}

// Static affirmations data for Gatsby build
const staticAffirmations = {
  version: "1.0.0",
  total_affirmations: 160,
  last_updated: "2024-01-15",
  categories: {
    present_moment: {
      name: "Present Moment Awareness",
      description: "Grounding affirmations for staying centered in the now",
      affirmations: [
        "You are exactly where you need to be in this cosmic moment",
        "Take a deep breath and feel the universe supporting you",
        "This moment is a gift - that's why it's called the present",
        "You are grounded, centered, and perfectly placed in time",
        "The universe unfolds in perfect timing through you",
        "Each breath connects you deeper to the now",
        "You are a conscious witness to this beautiful moment",
        "The present moment holds infinite possibilities",
        "You exist in perfect harmony with what is",
        "This moment is your doorway to peace",
        "You are fully here, fully alive, fully aware",
        "The cosmos breathes through your presence",
        "You are anchored in the eternal now",
        "This moment is sacred and you are part of its sacredness",
        "You flow gracefully with the rhythm of existence",
        "Your awareness illuminates this perfect moment",
        "You are a beautiful expression of universal consciousness",
        "The present moment welcomes you with open arms",
        "You dance with time in perfect synchronicity",
        "Your presence is a blessing to this moment",
        "You are woven into the fabric of this eternal now",
        "Each moment with you is divinely orchestrated",
        "You exist in the sweet spot of cosmic timing",
        "The universe pauses to appreciate your presence",
        "You are a masterpiece painted in this moment",
        "Your being radiates perfect presence",
        "You are the universe experiencing itself consciously",
        "This moment recognizes your beautiful essence",
        "You breathe life into the eternal now",
        "Your existence makes this moment complete",
        "You are a living meditation in motion",
        "The present moment celebrates your awareness",
        "You are perfectly synchronized with universal flow",
        "This moment holds you in gentle embrace",
        "You are the calm center of the cosmic storm",
        "Your presence transforms ordinary moments into magic",
        "You exist in the space between heartbeats",
        "The now expands to accommodate your full being",
        "You are the conscious pause in time's dance",
        "This moment is your spiritual home"
      ]
    },
    self_care: {
      name: "Self-Care & Nurturing",
      description: "Gentle reminders to care for yourself with compassion",
      affirmations: [
        "Your caring heart makes the universe a little brighter",
        "You deserve the same kindness you give to others",
        "Taking care of yourself is a sacred act",
        "You are worthy of rest, peace, and gentle moments",
        "Your well-being matters to the cosmic whole",
        "You nurture yourself as tenderly as you nurture others",
        "Self-care is not selfish - it's essential",
        "You honor your needs with loving awareness",
        "Your energy is precious and worth protecting",
        "You give yourself permission to pause and breathe",
        "You are gentle with yourself during difficult moments",
        "Your self-compassion ripples out to heal the world",
        "You treat yourself as your own best friend",
        "You listen to your body's wisdom with respect",
        "Your boundaries are healthy expressions of self-love",
        "You nourish your soul with what it truly needs",
        "You rest without guilt, knowing it serves your highest good",
        "Your inner child feels safe and cherished by you",
        "You speak to yourself with the voice of unconditional love",
        "You honor your emotional needs with gentle attention",
        "Your self-care routine is a form of daily prayer",
        "You protect your peace like the treasure it is",
        "You fill your own cup so you can overflow to others",
        "Your gentleness with yourself heals ancestral wounds",
        "You create sacred space for your own healing",
        "Your self-love is a revolutionary act of courage",
        "You tend to your spirit like a master gardener",
        "Your needs are valid and deserving of attention",
        "You embrace rest as productive and necessary",
        "Your self-nurturing sets an example for others",
        "You are patient with your own growth and healing",
        "Your inner sanctuary is always available to you",
        "You honor your limits as wisdom, not weakness",
        "Your self-care practices connect you to your essence",
        "You give yourself the gift of unconditional acceptance",
        "Your emotional needs are as important as anyone else's",
        "You create rituals that honor your beautiful spirit",
        "Your self-love expands your capacity to love others",
        "You are devoted to your own flourishing and growth",
        "Your gentle care of yourself ripples through generations"
      ]
    },
    cosmic_connection: {
      name: "Cosmic Connection",
      description: "Affirmations connecting you to the vastness of the universe",
      affirmations: [
        "You are stardust experiencing the universe",
        "The cosmos recognizes itself in your eyes",
        "You carry galaxies within your DNA",
        "The universe conspires in your favor",
        "You are a unique expression of cosmic consciousness",
        "The stars align to support your highest path",
        "You dance with celestial rhythms in your daily life",
        "The cosmos celebrates your existence",
        "You are connected to every atom in the universe",
        "Your dreams are seeded by stardust",
        "The universe speaks through your intuition",
        "You are a bridge between earth and cosmos",
        "Your heartbeat synchronizes with cosmic pulses",
        "The galaxies witness your beautiful unfolding",
        "You channel cosmic wisdom through your actions",
        "The universe delights in your unique perspective",
        "You are made of the same matter as supernovas",
        "Your consciousness is a gift to the cosmos",
        "The celestial bodies sing your soul's song",
        "You are a cosmic artist painting your reality",
        "The universe flows through your very being",
        "You are intimately connected to all that exists",
        "Your energy signature is known throughout the cosmos",
        "The stars remember the moment you were born",
        "You are a cosmic citizen of infinite dimensions",
        "The universe trusts you with its creative power",
        "You embody the cosmos in human form",
        "Your soul carries the memory of distant stars",
        "The cosmic web includes you in its grand design",
        "You are a note in the universe's eternal symphony",
        "The cosmos evolves through your personal growth",
        "You are a sacred vessel for universal love",
        "Your existence adds to the universe's beauty",
        "The celestial realm celebrates your journey",
        "You are cosmic dust with consciousness and choice",
        "The universe expresses itself uniquely through you",
        "You are woven into the fabric of space and time",
        "Your thoughts send ripples across the cosmos",
        "The universal intelligence guides your path",
        "You are an infinite being having a cosmic experience"
      ]
    },
    inner_strength: {
      name: "Inner Strength & Resilience",
      description: "Affirmations to connect with your unshakeable core",
      affirmations: [
        "You have survived 100% of your difficult days so far",
        "Your inner strength is deeper than any challenge",
        "You are more resilient than you realize",
        "Every challenge has made you stronger and wiser",
        "You carry an unbreakable spirit within you",
        "Your courage shows up exactly when you need it",
        "You are powerful beyond measure",
        "Storms pass, but your strength remains",
        "You have everything within you to overcome anything",
        "Your resilience is your superpower",
        "You bend but do not break",
        "Your inner fire cannot be extinguished",
        "You are stronger than your strongest excuse",
        "Your spirit is undefeatable",
        "You rise after every fall",
        "Your strength inspires others to find their own",
        "You are a warrior of love and light",
        "Your endurance amazes even yourself",
        "You transform pressure into diamonds",
        "Your inner fortress is impenetrable",
        "You are the hero of your own story",
        "Your strength flows from an infinite source",
        "You face uncertainty with unwavering courage",
        "Your resilience creates pathways where none existed",
        "You are tougher than your toughest moment",
        "Your inner strength is your birthright",
        "You weather storms with grace and dignity",
        "Your courage is contagious and uplifting",
        "You are built to overcome and transcend",
        "Your strength multiplies when shared with others",
        "You are unshakeable at your core",
        "Your resilience has deep roots",
        "You stand tall in the face of adversity",
        "Your inner strength is your compass through difficulty",
        "You are forged strong by life's fires",
        "Your courage echoes through generations",
        "You are a testament to human resilience",
        "Your strength creates stability for others",
        "You transform wounds into wisdom",
        "Your unbreakable spirit lights the way for others"
      ]
    }
  }
}

export const useAffirmations = () => {
  const [userPreferences, setUserPreferences] = useState({
    categories: ['cosmic_connection', 'present_moment', 'self_care'],
    excludedCategories: [],
    personalizedContent: false
  })

  // Use static data instead of GraphQL for now
  const affirmations = staticAffirmations

  const getAllAffirmationsFlat = () => {
    const allAffirmations = []
    
    Object.keys(affirmations.categories).forEach(categoryKey => {
      const category = affirmations.categories[categoryKey]
      category.affirmations.forEach(text => {
        allAffirmations.push({
          text,
          category: category.name,
          categoryKey,
          description: category.description
        })
      })
    })

    return allAffirmations
  }

  const getRandomAffirmation = () => {
    const allAffirmations = getAllAffirmationsFlat()
    const randomIndex = Math.floor(Math.random() * allAffirmations.length)
    return allAffirmations[randomIndex]
  }

  const getAffirmationByCategory = (categoryKey) => {
    if (!affirmations.categories[categoryKey]) {
      return getRandomAffirmation()
    }

    const category = affirmations.categories[categoryKey]
    const randomIndex = Math.floor(Math.random() * category.affirmations.length)
    
    return {
      text: category.affirmations[randomIndex],
      category: category.name,
      categoryKey,
      description: category.description
    }
  }

  const getThemedAffirmation = (theme) => {
    const categories = themeMapping[theme] || ['present_moment', 'self_care']
    const randomCategory = categories[Math.floor(Math.random() * categories.length)]
    
    return getAffirmationByCategory(randomCategory)
  }

  const getPersonalizedAffirmation = () => {
    const preferredCategories = userPreferences.categories.filter(
      cat => Object.keys(affirmations.categories).includes(cat)
    )

    if (preferredCategories.length === 0) {
      return getRandomAffirmation()
    }

    const categoryAffirmations = []
    preferredCategories.forEach(categoryKey => {
      const category = affirmations.categories[categoryKey]
      category.affirmations.forEach(text => {
        categoryAffirmations.push({
          text,
          category: category.name,
          categoryKey,
          description: category.description
        })
      })
    })

    const randomIndex = Math.floor(Math.random() * categoryAffirmations.length)
    return categoryAffirmations[randomIndex]
  }

  const getCategories = () => {
    return Object.keys(affirmations.categories).map(key => ({
      key,
      name: affirmations.categories[key].name,
      description: affirmations.categories[key].description,
      count: affirmations.categories[key].affirmations.length
    }))
  }

  const searchAffirmations = (keyword) => {
    const searchTerm = keyword.toLowerCase()
    const results = []
    
    getAllAffirmationsFlat().forEach(affirmation => {
      if (affirmation.text.toLowerCase().includes(searchTerm) ||
          affirmation.category.toLowerCase().includes(searchTerm)) {
        results.push(affirmation)
      }
    })
    
    return results
  }

  const getStats = () => {
    return {
      totalAffirmations: affirmations.total_affirmations,
      categories: Object.keys(affirmations.categories).length,
      version: affirmations.version,
      lastUpdated: affirmations.last_updated,
      userPreferences
    }
  }

  return {
    affirmations,
    userPreferences,
    setUserPreferences,
    getRandomAffirmation,
    getAffirmationByCategory,
    getThemedAffirmation,
    getPersonalizedAffirmation,
    getCategories,
    searchAffirmations,
    getStats,
    getAllAffirmationsFlat
  }
}