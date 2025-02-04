from fastapi import FastAPI
from app.config.database import Base, engine
from app.middlewares.error_middleware import error_handler
from app.routes.auth import auth_router
from app.routes.user import user_router

# Initialize the database
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Middleware
app.middleware("http")(error_handler)

# Routes
app.include_router(auth_router, prefix="/auth", tags=["Authentication"])
app.include_router(user_router, prefix="/user", tags=["User"])

@app.get("/")
async def root():
    return {"message": "Welcome to the Signify API"}
