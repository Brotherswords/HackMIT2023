from sklearn.neighbors import KDTree
import numpy as np
import json

import sys
sys.path.append(".")
from scripts.text_to_sentiment_v2 import tts

attrs = ["energy", "danceability", "loudness", "mode", "acousticness", "liveness", "valence", "tempo"]
weights = [1, 1, 1, 1, 1, 1, 2, 1/60]

with open("datasets/muse_integrated_transformed.json", "r") as f:
    muse_data = json.load(f)

muse_spotify = [line["spotify_id"] for line in muse_data]
muse_specs = [(line["track"], line["artist"]) for line in muse_data]
muse_features = [[line[a_] for a_ in attrs] for line in muse_data]

# Convert to numpy arrays
muse_data = np.array(muse_features)
muse_data = muse_data * weights

# Build a KD-tree using the feature vectors (X)
kdtree = KDTree(muse_data)

previous_matches = {}
previous_suggested_songs = set()

def query(text):
    if text in previous_matches:
        return previous_matches[text]
    vec = tts(text)
    vec = vec * weights
    # pretty print vec
    print("Query vector: ", vec)

    # Query the KD-tree for nearest neighbors
    _, indices = kdtree.query([vec], k=3)
    # filter by not seen
    song_ids = [muse_spotify[index] for index in indices[0]]
    new_song_ids = list(filter(lambda x: x not in previous_suggested_songs, song_ids))
    if len(new_song_ids) == 0:
        ret = song_ids[0]
    else:
        ret = new_song_ids[0]
    previous_matches[text] = ret
    previous_suggested_songs.add(ret)
    return ret