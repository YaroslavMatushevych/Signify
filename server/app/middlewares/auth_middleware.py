from fastapi import HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from app.utils.db import get_db
from app.services.auth import decode_token
from app.services.user import get_user_by_email
import logging

logger = logging.getLogger("auth")

# OAuth2 token URL
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

# Dependency to get the current user
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    logger.info("Decoding access token...")
    payload = decode_token(token)
    if not payload:
        logger.warning("Invalid or expired token")
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    logger.info("Fetching user from database...")
    user = get_user_by_email(payload.get("sub"), db)
    if not user:
        logger.warning(f"User with email {payload.get('sub')} not found")
        raise HTTPException(status_code=404, detail="User not found")
    
    logger.info(f"Authenticated user: {user.email}")
    return user
