import torch
import torch.nn as nn
import torch.nn.functional as F

class MLP(torch.nn.Module):
    def __init__(self, input_dim, output_dim, hidden_dims):
        super(MLP, self).__init__()
        layers = []
        prev_dim = input_dim
        for dim in hidden_dims:
            layers.append(nn.Linear(prev_dim, dim))
            layers.append(nn.GELU())
            prev_dim = dim
        layers.append(nn.Linear(prev_dim, output_dim))
        self.linear = nn.Sequential(*layers)

    def forward(self, x):
        y_pred = self.linear(x)
        return y_pred
    
