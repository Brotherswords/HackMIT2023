import numpy as np
from scripts.sentiment_song_match import query
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

import sys
sys.path.append(".")


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/pred/")
async def pred(txt: str):
    ret = np.random.random(3)
    return {"message": txt + str(ret)}

# Define a Pydantic model for the request data


class Item(BaseModel):
    content: str = None

# Create a POST endpoint that expects JSON data in the request body


@app.post("/tim/")
async def create_item(item: Item):
    return {"song_id": query(item.content)}
