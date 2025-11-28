# routers/auth.py
from fastapi import APIRouter
from models.schemas import LoginSchema, UserResponse
from models.auth import authenticate_user

router = APIRouter()


@router.post("/login", response_model=UserResponse)
def login(payload: LoginSchema):
    return authenticate_user(payload.email, payload.password)
