import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification

import numpy as np

tokenizer = AutoTokenizer.from_pretrained("SamLowe/roberta-base-go_emotions")
model = AutoModelForSequenceClassification.from_pretrained("SamLowe/roberta-base-go_emotions")

inputs = tokenizer("I'm so glad that you are here today!", return_tensors="pt")

with torch.no_grad():
    logits = model(**inputs).logits

predicted_class_id = logits.argmax().item()

def query(text):
    inputs = tokenizer(text, return_tensors="pt")

    with torch.no_grad():
        logits = model(**inputs).logits

    logits = np.exp(logits[0].detach().numpy())
    logits = logits / logits.sum()
    labels = [model.config.id2label[i] for i in range(len(logits))]
    return {k: v for k, v in zip(labels, logits)}