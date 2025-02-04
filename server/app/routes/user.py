from fastapi import APIRouter, Depends, HTTPException, Cookie
from sqlalchemy.orm import Session
from app.schemas.user import UserResponse
from app.utils.db import get_db
from app.services.auth import decode_token
from app.repositories.user import get_user_by_email

user_router = APIRouter()

@user_router.get("/me", response_model=UserResponse)
async def get_current_user(access_token: str = Cookie(None), db: Session = Depends(get_db)):
    if not access_token:
        raise HTTPException(status_code=401, detail="Access token is missing")

    payload = decode_token(access_token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid or expired access token")

    user = get_user_by_email(db, payload.get("sub"))
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user
