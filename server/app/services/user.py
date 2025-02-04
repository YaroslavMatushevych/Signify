from sqlalchemy.orm import Session
from app.models.user import User

def create_user(db: Session, username: str, email: str, password: str) -> User:
    """Create a new user in the database."""
    user = User(username=username, email=email, password=password)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def get_user_by_email(email: str, db: Session) -> User | None:
    """Retrieve a user by their email address."""
    return db.query(User).filter(User.email == email).first()

def update_user_password(db: Session, user: User, new_password: str) -> User:
    """Update a user's password."""
    user.password = new_password
    db.commit()
    db.refresh(user)
    return user
