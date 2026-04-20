from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
import datetime

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    role = Column(String) # Admin, Doctor, ya AI User
    
    scans = relationship("AIScan", back_populates="owner")

class AIScan(Base):
    __tablename__ = "ai_scans"
    id = Column(Integer, primary_key=True, index=True)
    image_url = Column(String)
    prediction_result = Column(String)
    confidence = Column(Float)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    user_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="scans")