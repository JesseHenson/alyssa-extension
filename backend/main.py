"""
Cosmic Tab Coach Backend API
Database integration for Chrome extension
"""

from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer
from pydantic import BaseModel
from supabase import create_client, Client
import os
from datetime import datetime
from typing import List, Optional, Dict, Any
import uuid
import asyncio
import anthropic

# Initialize FastAPI
app = FastAPI(title="Cosmic Tab Coach API", version="1.0.0")

# CORS for Chrome extension
app.add_middleware(
    CORSMiddleware,
    allow_origins=["chrome-extension://*"],  # Chrome extension origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Supabase client
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_ANON_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Anthropic Claude Client
claude_client: Optional[anthropic.Anthropic] = None

# Security
security = HTTPBearer()

# Data Models
class UserPreferences(BaseModel):
    user_id: str
    theme: str = "cosmic"
    frequency: int = 30
    personalized_content: bool = False
    favorite_categories: List[str] = []

class Affirmation(BaseModel):
    id: Optional[str] = None
    text: str
    category: str
    created_by: str
    is_ai_generated: bool = False
    created_at: Optional[datetime] = None

class UsageEvent(BaseModel):
    user_id: str
    event_type: str  # "viewed", "liked", "shared", "custom_created"
    affirmation_id: Optional[str] = None
    metadata: Optional[dict] = {}

# A2A Protocol Models
class A2AAgentCard(BaseModel):
    name: str
    description: str
    version: str
    url: str
    capabilities: Dict[str, bool]
    authentication: Optional[Dict[str, Any]] = None
    skills: List[Dict[str, Any]]
    contact_email: Optional[str] = None

class A2ATask(BaseModel):
    id: str
    status: str
    created_time: datetime
    updated_time: datetime
    messages: List[Dict[str, Any]]
    artifacts: Optional[List[Dict[str, Any]]] = None

class A2AMessage(BaseModel):
    role: str  # "user" or "agent"
    parts: List[Dict[str, Any]]
    metadata: Optional[Dict[str, Any]] = None

class A2ATaskRequest(BaseModel):
    task_id: str
    messages: List[A2AMessage]
    session_id: Optional[str] = None
    metadata: Optional[Dict[str, Any]] = None

# Startup and Lifecycle Events

@app.on_event("startup")
async def startup_event():
    """Initialize Anthropic Claude client on startup"""
    global claude_client
    
    anthropic_api_key = os.getenv("ANTHROPIC_API_KEY")
    if anthropic_api_key:
        try:
            claude_client = anthropic.Anthropic(api_key=anthropic_api_key)
            print("✅ Anthropic Claude client initialized successfully")
            print("🤖 A2A Mindful Coach agent ready for communication")
        except Exception as e:
            print(f"⚠️ Failed to initialize Claude client: {e}")
            print("🔄 Falling back to static affirmations")
    else:
        print("⚠️ ANTHROPIC_API_KEY not found. AI features will be disabled.")

# API Routes

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    vector_status = "enabled" if vector_manager else "disabled"
    return {
        "status": "healthy", 
        "service": "cosmic-tab-coach-api",
        "vector_search": vector_status
    }

@app.post("/auth/anonymous")
async def create_anonymous_user():
    """Create anonymous user for privacy-first approach"""
    user_id = str(uuid.uuid4())
    
    # Insert default preferences
    default_prefs = {
        "user_id": user_id,
        "theme": "cosmic",
        "frequency": 30,
        "personalized_content": False,
        "favorite_categories": ["present_moment", "self_care"],
        "created_at": datetime.utcnow().isoformat()
    }
    
    result = supabase.table("user_preferences").insert(default_prefs).execute()
    
    return {"user_id": user_id, "preferences": default_prefs}

@app.get("/preferences/{user_id}")
async def get_user_preferences(user_id: str):
    """Get user preferences"""
    result = supabase.table("user_preferences").select("*").eq("user_id", user_id).execute()
    
    if not result.data:
        raise HTTPException(status_code=404, detail="User not found")
    
    return result.data[0]

@app.put("/preferences/{user_id}")
async def update_preferences(user_id: str, preferences: UserPreferences):
    """Update user preferences"""
    update_data = preferences.dict()
    update_data["updated_at"] = datetime.utcnow().isoformat()
    
    result = supabase.table("user_preferences").update(update_data).eq("user_id", user_id).execute()
    
    return {"status": "updated", "data": result.data[0]}

@app.get("/affirmations/personalized/{user_id}")
async def get_personalized_affirmations(user_id: str, limit: int = 10):
    """Get personalized affirmations based on user preferences and history"""
    
    # Get user preferences
    prefs_result = supabase.table("user_preferences").select("*").eq("user_id", user_id).execute()
    if not prefs_result.data:
        raise HTTPException(status_code=404, detail="User preferences not found")
    
    prefs = prefs_result.data[0]
    
    # Get affirmations based on favorite categories
    categories = prefs.get("favorite_categories", ["present_moment"])
    
    result = supabase.table("affirmations").select("*").in_("category", categories).limit(limit).execute()
    
    return {"affirmations": result.data, "personalized_for": user_id}

@app.post("/affirmations/custom")
async def create_custom_affirmation(affirmation: Affirmation):
    """Create user-generated affirmation"""
    affirmation_data = affirmation.dict()
    affirmation_data["id"] = str(uuid.uuid4())
    affirmation_data["created_at"] = datetime.utcnow().isoformat()
    
    result = supabase.table("affirmations").insert(affirmation_data).execute()
    
    return {"status": "created", "affirmation": result.data[0]}

@app.post("/usage/track")
async def track_usage(event: UsageEvent):
    """Track usage events for analytics and personalization"""
    event_data = event.dict()
    event_data["created_at"] = datetime.utcnow().isoformat()
    
    result = supabase.table("usage_events").insert(event_data).execute()
    
    return {"status": "tracked"}

@app.get("/analytics/{user_id}")
async def get_user_analytics(user_id: str):
    """Get user analytics and insights"""
    
    # Get usage stats
    usage_result = supabase.table("usage_events").select("*").eq("user_id", user_id).execute()
    
    events = usage_result.data
    
    # Calculate insights
    total_views = len([e for e in events if e["event_type"] == "viewed"])
    total_likes = len([e for e in events if e["event_type"] == "liked"])
    total_shares = len([e for e in events if e["event_type"] == "shared"])
    
    return {
        "user_id": user_id,
        "total_affirmations_viewed": total_views,
        "total_favorites": total_likes,
        "total_shares": total_shares,
        "most_active_categories": [],  # TODO: Implement category analysis
        "mindfulness_streak": 0  # TODO: Implement streak calculation
    }

# Vector Search & Semantic Affirmation Endpoints

@app.post("/affirmations/semantic-search", response_model=SemanticSearchResponse)
async def semantic_search_affirmations(request: SemanticSearchRequest):
    """
    🔍 Semantic search for affirmations using natural language
    
    Example queries:
    - "feeling overwhelmed with work deadlines"
    - "need confidence for big presentation"
    - "struggling with self-doubt"
    - "anxious about making important decision"
    """
    if not vector_manager:
        raise HTTPException(
            status_code=503,
            detail="Vector search not available. Please ensure OPENAI_API_KEY is configured."
        )
    
    start_time = asyncio.get_event_loop().time()
    
    try:
        results = await vector_manager.semantic_search(
            query=request.query,
            limit=request.limit,
            category_filter=request.category_filter,
            theme_filter=request.theme_filter,
            emotional_context=request.emotional_context
        )
        
        # Convert to API response format
        formatted_results = []
        for affirmation, score in results:
            formatted_results.append(AffirmationResult(
                text=affirmation.text,
                category=affirmation.category_name,
                themes=affirmation.themes,
                emotional_tags=affirmation.emotional_tags,
                relevance_score=round(score, 3),
                id=affirmation.id
            ))
        
        processing_time = (asyncio.get_event_loop().time() - start_time) * 1000
        
        return SemanticSearchResponse(
            results=formatted_results,
            query=request.query,
            total_found=len(formatted_results),
            processing_time_ms=round(processing_time, 2)
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Search failed: {str(e)}")

@app.post("/affirmations/contextual")
async def get_contextual_affirmations(request: ContextualRequest):
    """
    🧘‍♀️ Get contextually relevant affirmations for the Mindful Coach
    
    This endpoint is perfect for the Mindful Coach integration!
    It analyzes user input, mood, and stress level to provide perfectly matched affirmations.
    """
    if not vector_manager:
        # Fallback to category-based selection
        return {
            "results": [
                {
                    "text": "You are exactly where you need to be in this cosmic moment",
                    "category": "Present Moment Awareness",
                    "themes": ["mindfulness", "grounding"],
                    "emotional_tags": ["calm", "centered"],
                    "relevance_score": 0.75,
                    "id": "fallback_1"
                }
            ],
            "source": "fallback",
            "note": "Vector search not available, using fallback affirmation"
        }
    
    try:
        results = await vector_manager.get_contextual_affirmations(
            user_input=request.user_input,
            current_mood=request.current_mood,
            stress_level=request.stress_level,
            preferred_themes=request.preferred_themes
        )
        
        # Track usage if user_id provided
        if request.user_id:
            event_data = {
                "user_id": request.user_id,
                "event_type": "contextual_search",
                "metadata": {
                    "query": request.user_input[:100],  # First 100 chars for privacy
                    "stress_level": request.stress_level,
                    "mood": request.current_mood,
                    "results_count": len(results)
                }
            }
            try:
                supabase.table("usage_events").insert(event_data).execute()
            except Exception as e:
                print(f"Failed to track usage: {e}")
        
        return {
            "results": results,
            "source": "vector_search",
            "user_context": {
                "mood": request.current_mood,
                "stress_level": request.stress_level,
                "themes": request.preferred_themes
            }
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Contextual search failed: {str(e)}")

@app.get("/affirmations/vector-stats")
async def get_vector_stats():
    """Get statistics about the vector affirmation database"""
    if not vector_manager:
        return {"status": "disabled", "message": "Vector search not available"}
    
    try:
        stats = vector_manager.get_stats()
        return {
            "status": "enabled",
            "stats": stats,
            "capabilities": [
                "semantic_search",
                "contextual_matching", 
                "stress_detection",
                "mood_analysis",
                "theme_filtering"
            ]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Stats retrieval failed: {str(e)}")

# Future AI Integration Endpoints

@app.post("/ai/generate-affirmation")
async def generate_ai_affirmation(user_id: str, mood: str, context: str):
    """Generate AI affirmation based on user mood and context"""
    # TODO: Integrate with OpenAI API for real-time generation
    # This would use user's history and preferences to generate personalized content
    
    return {
        "status": "placeholder",
        "message": "AI generation will be implemented in Phase 2",
        "suggested_affirmation": "This is where AI-generated content will appear"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)