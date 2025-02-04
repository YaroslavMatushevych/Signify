from app.config.database import SessionLocal

# Reusable database session dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
