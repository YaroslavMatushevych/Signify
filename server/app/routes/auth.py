from fastapi import APIRouter, HTTPException, Depends, Response, Cookie
from sqlalchemy.orm import Session
from app.schemas.auth import LoginRequest, SignupRequest, AuthResponse
from app.utils.db import get_db
from app.config.settings import (
    ACCESS_TOKEN_EXPIRE_MINUTES,
    REFRESH_TOKEN_EXPIRE_DAYS,
    COOKIE_SECURE,
    COOKIE_SAMESITE,
)
from app.services.auth import (
    hash_password,
    verify_password,
    create_access_token,
    create_refresh_token,
    decode_token,
)
from app.repositories.user import create_user, get_user_by_email

auth_router = APIRouter()

@auth_router.post("/signup", response_model=dict)
async def signup(request: SignupRequest, db: Session = Depends(get_db)):
    if get_user_by_email(db, request.email):
        raise HTTPException(status_code=400, detail="User already exists")

    hashed_password = hash_password(request.password)
    create_user(db, request.username, request.email, hashed_password)
    return {"message": "User created successfully"}

@auth_router.post("/login", response_model=AuthResponse)
async def login(request: LoginRequest, response: Response, db: Session = Depends(get_db)):
    user = get_user_by_email(db, request.email)
    if not user or not verify_password(request.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    access_token = create_access_token({"sub": user.email})
    refresh_token = create_refresh_token({"sub": user.email})

    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=COOKIE_SECURE,
        samesite=COOKIE_SAMESITE,
        max_age=60 * ACCESS_TOKEN_EXPIRE_MINUTES,
    )
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=COOKIE_SECURE,
        samesite=COOKIE_SAMESITE,
        max_age=60 * 60 * 24 * REFRESH_TOKEN_EXPIRE_DAYS,
    )

    return {"message": "Login successful", "access_token": access_token, "refresh_token": refresh_token}

@auth_router.post("/logout", response_model=dict)
async def logout(response: Response):
    response.delete_cookie("access_token")
    response.delete_cookie("refresh_token")
    return {"message": "Logged out successfully"}

@auth_router.post("/refresh", response_model=dict)
async def refresh_token(response: Response, refresh_token: str = Cookie(None)):
    if not refresh_token:
        raise HTTPException(status_code=401, detail="Refresh token is missing")

    payload = decode_token(refresh_token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid or expired refresh token")

    new_access_token = create_access_token({"sub": payload.get("sub")})

    response.set_cookie(
        key="access_token",
        value=new_access_token,
        httponly=True,
        secure=COOKIE_SECURE,
        samesite=COOKIE_SAMESITE,
        max_age=60 * ACCESS_TOKEN_EXPIRE_MINUTES,
    )

    return {"message": "Token refreshed successfully", "access_token": new_access_token}
