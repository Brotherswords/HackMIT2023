import json
import numpy as np

import sys
sys.path.append(".")
from models.roberta import query

with open("datasets/roberta_to_vals.json", "r") as f:
    emotion_features = json.load(f)
attrs = ["energy", "danceability", "loudness", "mode", "acousticness", "liveness", "valence", "tempo"]
emotion_features = {k: np.array([v[attr] for attr in attrs]) for k, v in emotion_features.items()}

def tts(text):
    weights = query(text)
    features = np.zeros(len(attrs))
    for k, v in weights.items():
        features += emotion_features[k] * v
    return features