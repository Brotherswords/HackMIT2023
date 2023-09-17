
import torch
import torch.nn as nn
import torch.nn.functional as F

from torch.utils.data import DataLoader, TensorDataset
from torch.optim.lr_scheduler import ReduceLROnPlateau

import numpy as np

from tqdm import tqdm

import sys
sys.path.append(".")
from models.linreg import MLP

def train(model, X, y, val_split=0.3, criterion=None, lr=0.01, epochs=100, weight_decay=0):
    # Define loss function
    if criterion is None:
        criterion = nn.MSELoss()
    # Define optimizer
    optimizer = torch.optim.Adam(model.parameters(), lr=lr, weight_decay=weight_decay)
    scheduler = ReduceLROnPlateau(optimizer, 'min')
    # make dataset
    train_loader, val_loader = numpy_to_dataloader(X, y, val_split=val_split)

    best_loss = 1e9

    # Train the model
    for epoch in range(epochs):
        epoch_loss = 0
        epoch_size = 0
        for data in tqdm(train_loader):
            # get the inputs; data is a list of [inputs, labels]
            inputs, labels = data
            # zero the parameter gradients
            optimizer.zero_grad()
            # forward + backward + optimize
            outputs = model(inputs)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()
            epoch_loss += loss.item() * len(inputs)
            epoch_size += len(inputs)
        mean_loss = epoch_loss / epoch_size
        print(f"Epoch: {epoch:3d} | train loss: {mean_loss:.4f}", end="")

        epoch_val_loss = 0
        epoch_val_size = 0
        for data in val_loader:
            # get the inputs; data is a list of [inputs, labels]
            inputs, labels = data
            outputs = model(inputs)
            loss = criterion(outputs, labels)
            epoch_val_loss += loss.item() * len(inputs)
            epoch_val_size += len(inputs)
        mean_val_loss = epoch_val_loss / epoch_val_size
        scheduler.step(mean_val_loss)
        print(f" | val loss: {mean_val_loss:.4f}")
        if mean_val_loss < best_loss:
            best_loss = mean_val_loss
            torch.save(model.state_dict(), "models/linreg.pt")

    print('Finished Training')


def numpy_to_dataloader(X, y, val_split=0.3):
    # Assuming you have separate NumPy arrays for features 'X' and labels 'y'
    # Split the dataset into train and test sets (80% train, 20% test)
    train_size = int((1-val_split) * len(X))

    # Create random indices for the train and test sets
    indices = np.random.permutation(len(X))

    train_indices, val_indices = indices[:train_size], indices[train_size:]

    # Split the data and labels
    X_train, y_train = X[train_indices], y[train_indices]
    X_test, y_test = X[val_indices], y[val_indices]

    # Convert NumPy arrays into PyTorch tensors
    train_data_tensor = torch.tensor(X_train, dtype=torch.float32)
    train_labels_tensor = torch.tensor(y_train, dtype=torch.float32)
    val_data_tensor = torch.tensor(X_test, dtype=torch.float32)
    val_labels_tensor = torch.tensor(y_test, dtype=torch.float32)

    # Create DataLoader objects for train and test sets with a batch size of 32
    batch_size = 32

    train_loader = DataLoader(
        TensorDataset(train_data_tensor, train_labels_tensor),
        batch_size=batch_size,
        shuffle=True  # You can set this to True to shuffle the training data
    )

    val_loader = DataLoader(
        TensorDataset(val_data_tensor, val_labels_tensor),
        batch_size=batch_size,
        shuffle=False  # No need to shuffle the test data
    )

    return train_loader, val_loader


if __name__ == "__main__":
    # generate some data
    X = np.random.random((100000, 10))
    y = np.stack([np.mean(np.sin(X / 2), axis=1), np.mean(np.sin(X / 4), axis=1), np.mean(np.sin(X / 7), axis=1)], axis=1) + np.random.random((100000, 3)) * 0.1

    model = MLP(10, 3, [20, 20, 20])
    train(model, torch.Tensor(X), torch.Tensor(y), val_split=0.3, epochs=100)