from sqlalchemy.orm import Session
from app.models.user import User

def create_user(db: Session, username: str, email: str, password: str) -> User:
    """Create a new user and persist it to the database."""
    user = User(username=username, email=email, password=password)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def get_user_by_email(db: Session, email: str) -> User | None:
    """Fetch a user from the database by email."""
    return db.query(User).filter(User.email == email).first()

def delete_user(db: Session, user: User):
    """Delete a user from the database."""
    db.delete(user)
    db.commit()
