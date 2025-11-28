# routers/users.py
from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from typing import List, Optional
import json
from supabase_client import supabase

from models.schemas import UserCreate, UserListResponse
from models.user import create_user_in_db, assign_professor_courses, get_all_users_for_admin
from utils.storage import upload_avatar
from fastapi import File, UploadFile, Form
from typing import Union

router = APIRouter()


@router.post("/create")
async def create_user(
    nom: str = Form(...),
    email: str = Form(...),
    cin: Optional[str] = Form(None),
    telephone: Optional[str] = Form(None),
    password: str = Form(...),
    role: str = Form(...),
    classe_id: Optional[str] = Form(None),
    classes: str = Form("[]"),
    subjects: str = Form("[]"),
    photo: Optional[UploadFile] = File(None)
):
    # Vérifier unicité email
    existing = supabase.table("users").select("id").eq("email", email).execute()
    if existing.data:
        raise HTTPException(status_code=400, detail="Email already exists")

    # Parser les listes JSON
    try:
        classes_list = json.loads(classes)
        subjects_list = json.loads(subjects)
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Classes & subjects should be JSON arrays")

    # Upload photo
    photo_url = None
    if photo:
        try:
            photo_url = upload_avatar(photo)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Storage error: {e}")

    # Créer l'utilisateur
    user_data = UserCreate(
        nom=nom, email=email, cin=cin, telephone=telephone,
        password=password, role=role, classe_id=classe_id,
        classes=classes_list, subjects=subjects_list
    )
    created = create_user_in_db(user_data, photo_url)

    # Assignations spécifiques professeur
    if role.lower() == "professor":
        assign_professor_courses(created["id"], classes_list, subjects_list)

    return {
        "status": "created",
        "user": {
            "id": created["id"],
            "nom": created["nom"],
            "email": created["email"],
            "role": created["role"],
            "classe_id": created.get("classe_id"),
            "photo_url": created.get("photo_url")
        }
    }


@router.get("/", response_model=List[UserListResponse])
async def get_all_users():
    return get_all_users_for_admin()
