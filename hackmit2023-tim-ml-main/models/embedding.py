from transformers import AutoTokenizer, AutoModel
import torch
import torch.nn.functional as F

import numpy as np
import matplotlib.pyplot as plt

from time import time

# # Load model from HuggingFace Hub
# tokenizer = AutoTokenizer.from_pretrained('sentence-transformers/all-MiniLM-L6-v2')
# model = AutoModel.from_pretrained('sentence-transformers/all-MiniLM-L6-v2')
tokenizer = AutoTokenizer.from_pretrained('sentence-transformers/all-mpnet-base-v2')
model = AutoModel.from_pretrained('sentence-transformers/all-mpnet-base-v2')

#Mean Pooling - Take attention mask into account for correct averaging
def mean_pooling(model_output, attention_mask):
    token_embeddings = model_output[0] #First element of model_output contains all token embeddings
    input_mask_expanded = attention_mask.unsqueeze(-1).expand(token_embeddings.size()).float()
    return torch.sum(token_embeddings * input_mask_expanded, 1) / torch.clamp(input_mask_expanded.sum(1), min=1e-9)

def get_embedding(sentences):
    # Tokenize sentences
    encoded_input = tokenizer(sentences, padding=True, truncation=True, return_tensors='pt') #truncation=True
    # Compute token embeddings
    with torch.no_grad():
        model_output = model(**encoded_input)
    # Perform pooling
    sentence_embeddings = mean_pooling(model_output, encoded_input['attention_mask'])
    # Normalize embeddings
    sentence_embeddings = F.normalize(sentence_embeddings, p=2, dim=1)

    return sentence_embeddings.detach().numpy()


def pairwise_similarity(embeddings, verbose=True):
    sim = embeddings @ embeddings.T
    if verbose:
        print("      ", end="")
        for i in range(len(embeddings)):
            print(f"{i:6d}", end="")
        print()
        for i in range(len(embeddings)):
            print(f"{i:6d}", end="")
            for j in range(len(embeddings)):
                print(f"{sim[i, j]:6.2f}", end="")
            print()
    return sim

def paragraph_to_emb(paragraph):
    sentences = paragraph.split(".")
    sentences = [s for s in sentences if len(s) > 0]
    return np.mean(get_embedding(sentences), axis=0), np.mean(np.std(get_embedding(sentences), axis=0))


if __name__ == "__main__":
    start_time = time()
    txt = '''
The first of these is the comparative lifelessness of the book. True, here again are action and incident galore, but generally unaccompanied by that rough Georgian hurly-burly, common in Smollett, which is so interesting to contemplate from a comfortable distance, and which goes so far towards making his fiction seem real. Nor are the characters, for the most part, life-like enough to be interesting. There is an apparent exception, to be sure, in the hero’s mother, already mentioned, the hardened camp-follower, whom we confidently expect to become vitalised after the savage fashion of Smollett’s characters. But, alas! we have no chance to learn the lady’s style of conversation, for the few words that come from her lips are but partially characteristic; we have only too little chance to learn her manners and customs. In the fourth chapter, while she is making sure with her dagger that all those on the field of battle whom she wishes to rifle are really dead, an officer of the hussars, who has been watching her lucrative progress, unfeelingly puts a brace of bullets into the lady’s brain, just as she raises her hand to smite him to the heart. Perhaps it is as well that she is thus removed before our disappointment at the non-fulfilment of her promise becomes poignant. So far as we may judge from the other personages of Count Fathom, even this interesting Amazon would sooner or later have turned into a wooden figure, with a label giving the necessary information as to her character.
    '''
    chunked = txt.split(".")
    emb1 = get_embedding(["".join(chunked[:i]) for i in range(len(chunked))])
    emb2 = get_embedding(chunked)
    emb3 = np.cumsum(emb2, axis=0)
    emb3 = emb3 / np.arange(1, len(emb3) + 1).reshape(-1, 1)

    sim1 = pairwise_similarity(emb1)
    sim2 = pairwise_similarity(emb2)
    sim3 = pairwise_similarity(emb3)

    plt.imshow(sim1[1:, 1:])
    plt.savefig("sim1.jpg")

    plt.imshow(sim2[1:, 1:])
    plt.savefig("sim2.jpg")

    plt.imshow(sim3[1:, 1:])
    plt.savefig("sim3.jpg")

    print("Time: ", time() - start_time)
