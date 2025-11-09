from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from supabase_client import supabase
import bcrypt

router = APIRouter()

class LoginSchema(BaseModel):
    email: str
    password: str

@router.post("/login")
def login(payload: LoginSchema):
    res = supabase.table("users").select("*").eq("email", payload.email).execute()
    if not res:
        raise HTTPException(status_code=400, detail="The user does not exist — verify fields")
    
    user = res.data[0]
    
    if not bcrypt.checkpw(payload.password.encode(), user["password"].encode()):
        raise HTTPException(status_code=400, detail="The user does not exist — verify fields")
    
    return {
        "status": "ok",
        "user": {
            "id": user["id"],
            "nom": user["nom"],
            "email": user["email"],
            "role": user["role"],
            "classe_id": user.get("classe_id"),
            "photo_url": user.get("photo_url")
        }
    }