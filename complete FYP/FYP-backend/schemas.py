from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional

class UserCreate(BaseModel):
    name: str
    email: str
    password: str

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    class Config:
        from_attributes = True

class UserLogin(BaseModel):
    email: str
    password: str

class AIScanResponse(BaseModel):
    id: int
    prediction_result: str
    confidence: float
    created_at: datetime
    image_url: Optional[str] = None
    class Config:
        from_attributes = True