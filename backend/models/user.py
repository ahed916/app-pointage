# models/user.py
import bcrypt
import json
from typing import List, Optional
from fastapi import HTTPException
from supabase_client import supabase
from models.schemas import UserCreate, UserListResponse
from utils.storage import upload_avatar



def create_user_in_db(user_data: UserCreate, photo_url: Optional[str] = None):
    # Hachage du mot de passe
    hashed = bcrypt.hashpw(user_data.password.encode(), bcrypt.gensalt()).decode()

    # Gestion de la classe pour les étudiants
    final_classe_id = None
    if user_data.role.lower() == "student":
        final_classe_id = _resolve_class_id(user_data.classe_id)

    # Insertion
    new_user = {
        "nom": user_data.nom,
        "email": user_data.email,
        "cin": user_data.cin,
        "telephone": user_data.telephone,
        "password": hashed,
        "role": user_data.role,
        "classe_id": final_classe_id,
        "photo_url": photo_url
    }

    res = supabase.table("users").insert(new_user).execute()
    if not res.data:
        raise HTTPException(status_code=500, detail="Failed to create user in DB")

    return res.data[0]


def _resolve_class_id(classe_ref: Optional[str]) -> int:
    if not classe_ref:
        raise HTTPException(status_code=400, detail="Class is required for students")

    try:
        # Essayer par nom
        q = supabase.table("classe").select("id").eq("name", classe_ref).execute()
        if q.data:
            return q.data[0]["id"]
        # Essayer par ID
        q2 = supabase.table("classe").select("id").eq("id", int(classe_ref)).execute()
        if q2.data:
            return q2.data[0]["id"]
        raise HTTPException(status_code=400, detail="Class not found")
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid class id")


def assign_professor_courses(prof_id: int, classes: List[str], subjects: List[str]):
    for cls_name in classes:
        cls = supabase.table("classe").select("id").eq("name", cls_name).execute()
        if not cls.data:
            raise HTTPException(status_code=400, detail=f"Class {cls_name} not found")
        cls_id = cls.data[0]["id"]

        for subj_name in subjects:
            subj = supabase.table("subject").select("id").eq("name", subj_name).execute()
            if not subj.data:
                raise HTTPException(status_code=400, detail=f"Subject {subj_name} not found")
            subj_id = subj.data[0]["id"]

            # Trouver ou créer le cours
            cour = supabase.table("cour").select("id").eq("classe_id", cls_id).eq("subject_id", subj_id).execute()
            if cour.data:
                cour_id = cour.data[0]["id"]
            else:
                c_res = supabase.table("cour").insert({"classe_id": cls_id, "subject_id": subj_id}).execute()
                cour_id = c_res.data[0]["id"]

            # Associer prof → cours
            supabase.table("prof_class_cour").insert({"prof_id": prof_id, "cour_id": cour_id}).execute()


def get_all_users_for_admin() -> List[UserListResponse]:
    users = supabase.table("users").select("*").execute().data
    enhanced = []
    for user in users:
        # Résoudre le nom de la classe si applicable
        class_name = ""
        if user.get("classe_id"):
            cls = supabase.table("classe").select("name").eq("id", user["classe_id"]).execute()
            if cls.data:
                class_name = cls.data[0]["name"]

        enhanced.append(UserListResponse(
            id=user["id"],
            name=user["nom"],
            role=user["role"],
            email=user["email"],
            avatar=user.get("photo_url") or f"https://i.pravatar.cc/150?u={user['id']}",
            classes=class_name
        ))
    return enhanced
