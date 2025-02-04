from fastapi import FastAPI
from app.config.database import create_database
from app.routes.auth import auth_router
from app.routes.user import user_router
from app.middlewares.error_middleware import error_handler

app = FastAPI()

# Initialize database
create_database()

# Middleware
app.middleware("http")(error_handler)

# Routes
app.include_router(auth_router, prefix="/auth", tags=["Authentication"])
app.include_router(user_router, prefix="/user", tags=["User"])

@app.get("/")
async def root():
    return {"message": "Welcome to the Signify API"}
