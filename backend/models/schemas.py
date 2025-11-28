# models/schemas.py
from pydantic import BaseModel
from typing import Optional, List

# --- Auth ---


class LoginSchema(BaseModel):
    email: str
    password: str


class UserResponse(BaseModel):
    id: int
    nom: str
    email: str
    role: str
    classe_id: Optional[int] = None
    photo_url: Optional[str] = None

# --- Users ---


class UserCreate(BaseModel):
    nom: str
    email: str
    cin: Optional[str] = None
    telephone: Optional[str] = None
    password: str
    role: str
    classe_id: Optional[str] = None  # Peut être nom ou ID
    classes: List[str] = []
    subjects: List[str] = []


class UserListResponse(BaseModel):
    id: int
    name: str
    role: str
    email: str
    avatar: str
    classes: str
