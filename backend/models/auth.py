# models/auth.py
import bcrypt
from fastapi import HTTPException
from supabase_client import supabase
from models.schemas import UserResponse


def authenticate_user(email: str, password: str) -> UserResponse:
    # 1. Récupérer l'utilisateur
    res = supabase.table("users").select("*").eq("email", email).execute()
    if not res.data:
        raise HTTPException(status_code=400, detail="The user does not exist — verify fields")

    user = res.data[0]

    # 2. Vérifier le mot de passe
    if not bcrypt.checkpw(password.encode(), user["password"].encode()):
        raise HTTPException(status_code=400, detail="The user does not exist — verify fields")

    # 3. Retourner un modèle propre
    return UserResponse(
        id=user["id"],
        nom=user["nom"],
        email=user["email"],
        role=user["role"],
        classe_id=user.get("classe_id"),
        photo_url=user.get("photo_url")
    )
