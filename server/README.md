# 🚀 Signify Backend Server

Hello there! 👋  
This is the **backend server** for the **Signify Application**, implemented with **FastAPI** and Python. It handles all backend logic and API endpoints, ensuring seamless communication with the client. 💻

---

## 🗂 Project Structure

The server is structured for scalability and maintainability:

```
server/
├── app/
│   ├── __init__.py          # Application initialization
│   ├── main.py              # Entry point of the server
│   ├── routes/              # API route handlers
│   │   ├── auth.py          # Authentication routes
│   │   └── user.py          # User routes
│   ├── schemas/             # Data validation schemas
│   ├── services/            # Business logic
│   ├── repositories/        # Database interaction
│   ├── config/              # Configuration settings
│   └── utils/               # Utility functions
├── requirements.txt         # Dependencies
├── README.md                # Documentation
└── .env                     # Environment variables
```

---

## 📦 Dependencies

### Runtime Dependencies

- **FastAPI**: A modern web framework for building APIs with Python.
- **SQLAlchemy**: ORM for database interactions.
- **Pydantic**: Data validation and settings management.
- **psycopg2**: PostgreSQL adapter for Python.

### Development Dependencies

- **Uvicorn**: ASGI server for running FastAPI applications.
- **pytest**: Testing framework for Python.
- **python-dotenv**: For loading environment variables from `.env` files.

---

## 🚀 Getting Started

Follow these steps to set up and run the server:

### 1. Install Dependencies

Make sure you have Python installed. Then create and activate a virtual environment:

```bash
python3 -m venv venv
source venv/bin/activate
```

Install the required dependencies:

```bash
pip install -r requirements.txt
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory with the following values:

```
DATABASE_URL=postgresql://username:password@localhost/signify
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7
SECRET_KEY=your-secret-key
```

### 3. Run Database Migrations

Ensure your database is set up and run any necessary migrations:

```bash
alembic upgrade head
```

### 4. Start the Server

Run the server locally:

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

---

## 🛠 Features

- **User Authentication**: Secure login, signup, and token-based authentication.
- **RESTful API**: Modular and scalable API design.
- **Database Integration**: PostgreSQL for persistent storage.
- **Data Validation**: Strong schema validation with Pydantic.
- **Modular Structure**: Easy to add new features and maintain code.

---

## 📝 Notes

- Make sure PostgreSQL is running on your system and the database `signify` is created.
- Configure your `.env` file properly before starting the server.

---

## 📬 Contact Me

💼 [LinkedIn](https://www.linkedin.com/in/yaroslav-matushevych)  
📧 yaroslav.matushevych@gmail.com

---

### 🙌 Thank You!

Thank you for exploring the server-side implementation of Signify! 😊
