from sklearn.neighbors import KDTree
import numpy as np
import json

import sys
sys.path.append(".")
from scripts.text_to_sentiment_v2 import tts

attrs = ["energy", "danceability", "loudness", "mode", "acousticness", "liveness", "valence", "tempo"]

with open("datasets/muse_integrated_transformed.json", "r") as f:
    muse_data = json.load(f)

muse_spotify = [line["spotify_id"] for line in muse_data]
muse_specs = [(line["track"], line["artist"]) for line in muse_data]
muse_features = [[line[a_] for a_ in attrs] for line in muse_data]

# Convert to numpy arrays
muse_data = np.array(muse_features)

# Build a KD-tree using the feature vectors (X)
kdtree = KDTree(muse_data)

def query(text):
    vec = tts(text)
    # Query the KD-tree for nearest neighbors
    _, indices = kdtree.query([vec], k=1)
    # Return the nearest neighbors
    song_id = [muse_spotify[index] for index in indices[0]][0]
    return song_id