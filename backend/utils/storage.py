# utils/storage.py
import uuid
import os
from fastapi import UploadFile
from supabase_client import supabase


def upload_avatar(file: UploadFile, filename_prefix="avatar") -> str:
    bucket = os.getenv("SUPABASE_STORAGE_BUCKET", "avatars")
    ext = file.filename.split(".")[-1]
    key = f"{filename_prefix}_{uuid.uuid4().hex}.{ext}"
    file_bytes = file.file.read()

    storage = supabase.storage
    storage.from_(bucket).upload(key, file_bytes)
    return storage.from_(bucket).get_public_url(key)
