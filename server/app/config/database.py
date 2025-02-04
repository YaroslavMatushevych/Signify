from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.config.settings import DATABASE_URL

# PostgreSQL engine
engine = create_engine(DATABASE_URL)

# Session and Base
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Function to create the database tables
def create_database():
    from app.models.user import User  # Import models here
    Base.metadata.create_all(bind=engine)
