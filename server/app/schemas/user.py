from pydantic import BaseModel, EmailStr

class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr

    class Config:
        orm_mode = True  # Enables SQLAlchemy-to-Pydantic conversion
