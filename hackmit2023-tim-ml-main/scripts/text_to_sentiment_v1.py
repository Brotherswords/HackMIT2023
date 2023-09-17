import sys
sys.path.append(".")

from models.linreg import MLP
from models.training import train
from models.embedding import get_embedding

import numpy as np
from tqdm import tqdm
import random

import torch

# load data
import json
with open("datasets/BRM_processed.json", "r") as f:
    brm_data = json.load(f)

def aug(sentences, y, k=4):
    new_sentences = []
    new_y = []
    for _ in range(k):
        for sentence, vecs in zip(sentences, y):
            if len(vecs) == 0:
                continue
            # truncate randomly at commas
            subphrases = sentence.split(",")
            if len(subphrases) > 1:
                # pick start end
                start = np.random.randint(0, len(subphrases) - 1)
                end = np.random.randint(start + 1, len(subphrases))
                sentence = ",".join(subphrases[start:end])

            new_sentences.append(sentence)
            new_y.append(vecs[random.randint(0, len(vecs) - 1)])
    return new_sentences, new_y

try:
    data = np.load("cache/data_mpnets.npz")
    X = data["X"]
    y = data["y"]

except FileNotFoundError:
    with open("model_training.csv", "r") as f:
        lines = f.readlines()
        
    X_text = []
    y = []
    for line in tqdm(lines):
        line = line.strip().split(",")[:-1]
        tags = line[-5:]
        text = ",".join(line[:-5])[1:-1]
        count = 0
        vecs = []
        for tag in tags:
            if tag in brm_data:
                vecs.append(np.array([float(brm_data[tag][o_]) for o_ in ["valence", "arousal", "dominance"]]))
                count += 1
        if count == 0:
            print(tags)
        X_text.append(text)
        y.append(vecs)
    print(len(X_text), len(y))
    X_text, y = aug(X_text, y, k=4)
    X = get_embedding(X_text)
    y = np.array(y)

    np.savez("cache/data_mpnets.npz", X=X, y=y)

y = (y - np.mean(y, axis=0)) / np.std(y, axis=0)
# train model
model = MLP(768, 3, [8])
train(model, X, y, weight_decay=1e-3, lr=0.2, epochs=1000)

# test model
model = MLP(768, 3, [8])
# load weights from file
checkpoint = torch.load("models/linreg.pt")
model.load_state_dict(checkpoint)
model.eval()

# test
def query(phrase):
    X = get_embedding([phrase])
    y_pred = model(torch.tensor(X))
    print(y_pred)

breakpoint()