from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from typing import Optional
from supabase_client import supabase
import bcrypt
import uuid
import json
import os

router = APIRouter()

def upload_avatar(file: UploadFile, filename_prefix="avatar"):
    bucket = os.getenv("SUPABASE_STORAGE_BUCKET", "avatars")
    ext = file.filename.split(".")[-1]
    key = f"{filename_prefix}_{uuid.uuid4().hex}.{ext}"
    file_bytes = file.file.read()
    supabase.storage().from_(bucket).upload(key, file_bytes)
    public_url = supabase.storage().from_(bucket).get_public_url(key)
    return public_url

@router.post("/create")
async def create_user(
    nom: str = Form(...),
    email: str = Form(...),
    CIN: Optional[str] = Form(None),
    telephone: Optional[str] = Form(None),
    password: str = Form(...),
    role: str = Form(...),
    classe_id: Optional[str] = Form(None),
    classes: Optional[str] = Form("[]"),
    subjects: Optional[str] = Form("[]"),
    photo: Optional[UploadFile] = File(None)
):
    # Check email uniqueness
    check = supabase.table("users").select("id").eq("email", email).execute()
    if check:
        raise HTTPException(status_code=400, detail="Email already exists")

    # Hash password
    hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

    # Upload photo if provided
    photo_url = None
    if photo:
        try:
            photo_url = upload_avatar(photo)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Storage error: {e}")

    # Handle student class assignment
    final_classe_id = None
    if role.lower() == "student":
        if not classe_id:
            raise HTTPException(status_code=400, detail="Class is required for students")
        try:
            q = supabase.table("classe").select("id").eq("name", classe_id).execute()
            if q:
                final_classe_id = q.data[0]["id"]
            else:
                q2 = supabase.table("classe").select("id").eq("id", int(classe_id)).execute()
                if q2:
                    final_classe_id = q2.data[0]["id"]
                else:
                    raise HTTPException(status_code=400, detail="Class not found")
        except ValueError:
            raise HTTPException(status_code=400, detail="Invalid class id")

    # Insert user into the users table
    new_user = {
        "nom": nom,
        "email": email,
        "cin": CIN,
        "telephone": telephone,
        "password": hashed,
        "role": role,
        "classe_id": final_classe_id,
        "photo_url": photo_url
    }
    
    res = supabase.table("users").insert(new_user).execute()
    if res.status_code and res.status_code >= 400:
        raise HTTPException(status_code=500, detail="Failed to create user in DB")

    created = res.data[0]
    user_id = created["id"]

    # Handle professor class/subject assignments
    if role.lower() == "professor":
        try:
            classes_list = json.loads(classes)
            subjects_list = json.loads(subjects)
        except Exception:
            raise HTTPException(status_code=400, detail="Classes & subjects should be JSON arrays")

        for cls_name in classes_list:
            cls_q = supabase.table("classe").select("id").eq("name", cls_name).execute()
            if not cls_q:
                raise HTTPException(status_code=400, detail=f"Class {cls_name} not found")
            cls_id = cls_q.data[0]["id"]
            
            for subj_name in subjects_list:
                subj_q = supabase.table("subject").select("id").eq("name", subj_name).execute()
                if not subj_q:
                    raise HTTPException(status_code=400, detail=f"Subject {subj_name} not found")
                subj_id = subj_q.data[0]["id"]

                # Find or create course
                cour_q = supabase.table("cour").select("id").eq("classe_id", cls_id).eq("subject_id", subj_id).execute()
                if cour_q:
                    cour_id = cour_q.data[0]["id"]
                else:
                    c_res = supabase.table("cour").insert({"classe_id": cls_id, "subject_id": subj_id}).execute()
                    cour_id = c_res.data[0]["id"]

                # Create professor-course mapping
                try:
                    supabase.table("prof_class_cour").insert({"prof_id": user_id, "cour_id": cour_id}).execute()
                except Exception:
                    pass

    return {"status": "created", "user": {
        "id": user_id,
        "nom": created.get("nom"),
        "email": created.get("email"),
        "role": created.get("role"),
        "classe_id": created.get("classe_id"),
        "photo_url": created.get("photo_url")
    }}

# Add this endpoint to get all users for AdminUserTable.jsx
@router.get("/")
async def get_all_users():
    res = supabase.table("users").select("*").execute()
    users = res.data
    
    # Add class name to student users
    enhanced_users = []
    for user in users:
        enhanced_user = {
            "id": user["id"],
            "name": user["nom"],
            "role": user["role"],
            "email": user["email"],
            "avatar": user["photo_url"] or "https://i.pravatar.cc/150?u=" + str(user["id"]),
        }
        
        # Add class name if student
        if user["classe_id"]:
            class_res = supabase.table("classe").select("name").eq("id", user["classe_id"]).execute()
            if class_res:
                enhanced_user["classes"] = class_res.data[0]["name"]
            else:
                enhanced_user["classes"] = ""
        else:
            enhanced_user["classes"] = ""
        
        enhanced_users.append(enhanced_user)
    
    return enhanced_users