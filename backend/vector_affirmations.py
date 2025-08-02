# Vector Affirmations System
# Semantic search for affirmations using vector embeddings

import json
import asyncio
from typing import List, Dict, Optional, Tuple
import openai
import numpy as np
from dataclasses import dataclass
from datetime import datetime
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@dataclass
class AffirmationEmbedding:
    """Represents an affirmation with its vector embedding and metadata"""
    id: str
    text: str
    category: str
    category_name: str
    embedding: List[float]
    themes: List[str]
    emotional_tags: List[str]
    created_at: datetime

class VectorAffirmationManager:
    """
    Manages semantic search for affirmations using vector embeddings.
    
    Features:
    - Semantic similarity search: "feeling overwhelmed" → work-life balance affirmations
    - Multi-modal queries: emotion + context + theme
    - Personalized results based on user preferences
    - Real-time embedding generation for custom user input
    """
    
    def __init__(self, openai_api_key: str):
        """Initialize the vector affirmation manager"""
        self.openai_client = openai.OpenAI(api_key=openai_api_key)
        self.affirmations: List[AffirmationEmbedding] = []
        self.category_mapping = self._get_category_mapping()
        
    def _get_category_mapping(self) -> Dict[str, Dict[str, any]]:
        """Enhanced category mapping with emotional and contextual tags"""
        return {
            "present_moment": {
                "name": "Present Moment Awareness",
                "themes": ["mindfulness", "grounding", "awareness"],
                "emotional_tags": ["calm", "centered", "peaceful", "aware", "present"],
                "contexts": ["meditation", "anxiety", "overthinking", "stress"]
            },
            "self_care": {
                "name": "Self-Care & Nurturing", 
                "themes": ["compassion", "nurturing", "self-love"],
                "emotional_tags": ["gentle", "caring", "nurturing", "loving", "supportive"],
                "contexts": ["burnout", "exhaustion", "caregiver stress", "guilt", "boundaries"]
            },
            "cosmic_connection": {
                "name": "Cosmic Connection",
                "themes": ["universe", "connection", "spirituality"],
                "emotional_tags": ["expansive", "connected", "spiritual", "universal", "divine"],
                "contexts": ["loneliness", "purpose", "meaning", "isolation", "belonging"]
            },
            "personal_growth": {
                "name": "Personal Growth & Evolution",
                "themes": ["development", "change", "evolution"],
                "emotional_tags": ["growing", "evolving", "transforming", "developing", "learning"],
                "contexts": ["stagnation", "change", "challenge", "learning", "improvement"]
            },
            "caregiver_support": {
                "name": "Caregiver Appreciation",
                "themes": ["support", "appreciation", "service"],
                "emotional_tags": ["appreciated", "valued", "supported", "honored", "recognized"],
                "contexts": ["caregiving", "service", "helping others", "burnout", "appreciation"]
            },
            "inner_strength": {
                "name": "Inner Strength & Resilience",
                "themes": ["power", "resilience", "courage"],
                "emotional_tags": ["strong", "resilient", "powerful", "courageous", "brave"],
                "contexts": ["difficulty", "challenge", "adversity", "fear", "uncertainty"]
            },
            "gratitude": {
                "name": "Gratitude & Appreciation",
                "themes": ["thankfulness", "appreciation", "blessing"],
                "emotional_tags": ["grateful", "thankful", "blessed", "appreciative", "abundant"],
                "contexts": ["negativity", "complaining", "lack", "depression", "perspective"]
            },
            "work_balance": {
                "name": "Work-Life Harmony",
                "themes": ["balance", "harmony", "professional"],
                "emotional_tags": ["balanced", "harmonious", "productive", "calm", "focused"],
                "contexts": ["work stress", "deadlines", "overwhelm", "burnout", "productivity"]
            },
            "mindful_focus": {
                "name": "Mindful Focus & Clarity",
                "themes": ["clarity", "focus", "concentration"],
                "emotional_tags": ["clear", "focused", "concentrated", "sharp", "aware"],
                "contexts": ["distraction", "confusion", "scattered", "decision making", "clarity"]
            },
            "relationships": {
                "name": "Connection & Relationships",
                "themes": ["connection", "love", "relationships"],
                "emotional_tags": ["connected", "loving", "supported", "understood", "belonging"],
                "contexts": ["loneliness", "conflict", "relationship issues", "communication", "love"]
            },
            "creativity": {
                "name": "Creative Expression",
                "themes": ["creativity", "inspiration", "expression"],
                "emotional_tags": ["creative", "inspired", "expressive", "artistic", "innovative"],
                "contexts": ["creative block", "inspiration", "artistic expression", "innovation", "flow"]
            },
            "abundance": {
                "name": "Abundance & Prosperity",
                "themes": ["abundance", "prosperity", "wealth"],
                "emotional_tags": ["abundant", "prosperous", "wealthy", "rich", "successful"],
                "contexts": ["lack", "financial stress", "scarcity", "success", "prosperity"]
            }
        }

    async def load_affirmations_from_json(self, json_path: str) -> None:
        """Load and vectorize affirmations from JSON file"""
        logger.info(f"Loading affirmations from {json_path}")
        
        with open(json_path, 'r') as f:
            data = json.load(f)
        
        all_affirmations = []
        
        # Extract all affirmations with metadata
        for category_key, category_data in data['categories'].items():
            category_info = self.category_mapping.get(category_key, {})
            
            for i, affirmation_text in enumerate(category_data['affirmations']):
                if affirmation_text.strip():  # Skip empty affirmations
                    all_affirmations.append({
                        'id': f"{category_key}_{i}",
                        'text': affirmation_text.strip(),
                        'category': category_key,
                        'category_name': category_data['name'],
                        'themes': category_info.get('themes', []),
                        'emotional_tags': category_info.get('emotional_tags', []),
                        'contexts': category_info.get('contexts', [])
                    })
        
        logger.info(f"Processing {len(all_affirmations)} affirmations for vectorization")
        
        # Generate embeddings in batches to avoid rate limits
        batch_size = 20
        for i in range(0, len(all_affirmations), batch_size):
            batch = all_affirmations[i:i + batch_size]
            await self._process_affirmation_batch(batch)
            
            # Add small delay between batches
            if i + batch_size < len(all_affirmations):
                await asyncio.sleep(1)
        
        logger.info(f"Successfully vectorized {len(self.affirmations)} affirmations")

    async def _process_affirmation_batch(self, batch: List[Dict]) -> None:
        """Process a batch of affirmations and generate embeddings"""
        texts = [item['text'] for item in batch]
        
        try:
            # Generate embeddings for the batch
            response = await self.openai_client.embeddings.acreate(
                model="text-embedding-ada-002",
                input=texts
            )
            
            # Create AffirmationEmbedding objects
            for item, embedding_data in zip(batch, response.data):
                affirmation = AffirmationEmbedding(
                    id=item['id'],
                    text=item['text'],
                    category=item['category'],
                    category_name=item['category_name'],
                    embedding=embedding_data.embedding,
                    themes=item['themes'],
                    emotional_tags=item['emotional_tags'],
                    created_at=datetime.now()
                )
                self.affirmations.append(affirmation)
                
        except Exception as e:
            logger.error(f"Error processing batch: {e}")
            raise

    async def get_embedding(self, text: str) -> List[float]:
        """Generate embedding for a single text"""
        try:
            response = await self.openai_client.embeddings.acreate(
                model="text-embedding-ada-002",
                input=text
            )
            return response.data[0].embedding
        except Exception as e:
            logger.error(f"Error generating embedding: {e}")
            raise

    def cosine_similarity(self, a: List[float], b: List[float]) -> float:
        """Calculate cosine similarity between two vectors"""
        a_np = np.array(a)
        b_np = np.array(b)
        return np.dot(a_np, b_np) / (np.linalg.norm(a_np) * np.linalg.norm(b_np))

    async def semantic_search(
        self, 
        query: str, 
        limit: int = 5,
        category_filter: Optional[str] = None,
        theme_filter: Optional[List[str]] = None,
        emotional_context: Optional[str] = None
    ) -> List[Tuple[AffirmationEmbedding, float]]:
        """
        Perform semantic search for affirmations
        
        Args:
            query: Natural language query (e.g., "feeling overwhelmed with work deadlines")
            limit: Number of results to return
            category_filter: Optional category to filter by
            theme_filter: Optional themes to prioritize
            emotional_context: Additional emotional context
            
        Returns:
            List of (affirmation, similarity_score) tuples
        """
        logger.info(f"Performing semantic search for: '{query}'")
        
        # Enhance query with emotional context if provided
        enhanced_query = query
        if emotional_context:
            enhanced_query = f"{query} {emotional_context}"
        
        # Generate embedding for the query
        query_embedding = await self.get_embedding(enhanced_query)
        
        # Calculate similarities
        similarities = []
        for affirmation in self.affirmations:
            # Apply category filter if specified
            if category_filter and affirmation.category != category_filter:
                continue
                
            # Calculate base similarity
            similarity = self.cosine_similarity(query_embedding, affirmation.embedding)
            
            # Boost score based on theme matching
            if theme_filter:
                theme_match = any(theme in affirmation.themes for theme in theme_filter)
                if theme_match:
                    similarity += 0.1  # Small boost for theme matching
            
            similarities.append((affirmation, similarity))
        
        # Sort by similarity and return top results
        similarities.sort(key=lambda x: x[1], reverse=True)
        return similarities[:limit]

    async def get_contextual_affirmations(
        self,
        user_input: str,
        current_mood: Optional[str] = None,
        stress_level: Optional[float] = None,
        preferred_themes: Optional[List[str]] = None
    ) -> List[Dict]:
        """
        Get contextually relevant affirmations based on user state
        
        This is perfect for the Mindful Coach integration!
        """
        # Build enhanced query based on context
        query_parts = [user_input]
        
        if current_mood:
            query_parts.append(f"feeling {current_mood}")
            
        if stress_level and stress_level > 0.7:
            query_parts.append("overwhelmed stressed anxious")
        elif stress_level and stress_level > 0.4:
            query_parts.append("tense worried")
            
        enhanced_query = " ".join(query_parts)
        
        # Determine appropriate number of results based on stress level
        result_count = 3 if stress_level and stress_level > 0.6 else 5
        
        # Perform semantic search
        results = await self.semantic_search(
            query=enhanced_query,
            limit=result_count,
            theme_filter=preferred_themes
        )
        
        # Format results for API response
        formatted_results = []
        for affirmation, score in results:
            formatted_results.append({
                "text": affirmation.text,
                "category": affirmation.category_name,
                "themes": affirmation.themes,
                "emotional_tags": affirmation.emotional_tags,
                "relevance_score": round(score, 3),
                "id": affirmation.id
            })
            
        logger.info(f"Found {len(formatted_results)} contextual affirmations")
        return formatted_results

    def get_stats(self) -> Dict:
        """Get statistics about the vector database"""
        category_counts = {}
        for affirmation in self.affirmations:
            category_counts[affirmation.category] = category_counts.get(affirmation.category, 0) + 1
            
        return {
            "total_affirmations": len(self.affirmations),
            "categories": len(set(a.category for a in self.affirmations)),
            "category_breakdown": category_counts,
            "average_embedding_dimension": len(self.affirmations[0].embedding) if self.affirmations else 0,
            "last_updated": max(a.created_at for a in self.affirmations) if self.affirmations else None
        }

# Example usage and testing
async def main():
    """Example usage of the VectorAffirmationManager"""
    import os
    
    # Initialize manager (you'll need to set OPENAI_API_KEY environment variable)
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        print("Please set OPENAI_API_KEY environment variable")
        return
        
    manager = VectorAffirmationManager(api_key)
    
    # Load affirmations
    await manager.load_affirmations_from_json("../data/affirmations.json")
    
    # Example searches
    test_queries = [
        "I'm feeling overwhelmed with work deadlines and need to find balance",
        "struggling with self-doubt and need confidence",
        "feeling disconnected from others and lonely",
        "need motivation for creative project",
        "anxious about big decision tomorrow",
        "exhausted from taking care of everyone else"
    ]
    
    print("\n🔍 **Semantic Affirmation Search Results**\n")
    
    for query in test_queries:
        print(f"**Query:** {query}")
        results = await manager.semantic_search(query, limit=3)
        
        for i, (affirmation, score) in enumerate(results, 1):
            print(f"  {i}. [{score:.3f}] {affirmation.text}")
            print(f"     Category: {affirmation.category_name}")
            print(f"     Themes: {', '.join(affirmation.themes)}")
        print()
    
    # Show stats
    stats = manager.get_stats()
    print("📊 **Database Statistics:**")
    print(f"  Total affirmations: {stats['total_affirmations']}")
    print(f"  Categories: {stats['categories']}")
    print(f"  Embedding dimension: {stats['average_embedding_dimension']}")

if __name__ == "__main__":
    asyncio.run(main())