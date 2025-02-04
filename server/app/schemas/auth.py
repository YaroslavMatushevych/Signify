from pydantic import BaseModel, EmailStr

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class SignupRequest(BaseModel):
    username: str
    email: EmailStr
    password: str

class AuthResponse(BaseModel):
    message: str
    access_token: str | None = None
    refresh_token: str | None = None
