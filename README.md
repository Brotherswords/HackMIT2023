# Getting Started with TiM: Text into Music

Welcome to TiM: Text into Music, a pioneering project showcased at HackMIT 2023! Crafted with innovation and passion by Emma Qin (MIT '24), Lavan Vivekanandasarma (CU Denver '25), Hector Astrom (MIT '27) & Alec Wang (CU Boulder '26), TiM transforms the narrative of your chosen book into a harmonious musical experience, syncing it seamlessly with a track on Spotify. Follow the steps below to set up and immerse yourself in a melody woven from words:

## Setting Up Your Development Environment

### Pre-requesites: 
1. For the Backend API the following packages need to be installed in your Python Environement: 
   - numpy
   - fastapi
   - uvicorn
   - pydantic

    Install these with:

    ```pip install numpy fastapi uvicorn pydantic```

    Running the API should automatically install Pytorch and other required packages should you not have them. 

2. For the ReactJS frontend be sure to install ReactJS and install dependencies before running with:
   
   ```npm i```

### Step 1: Clone the Repository
```git clone https://github.com/Brotherswords/HackMIT2023.git```

### Step 2: Setup Your Workspace
Open two separate terminal windows in the project directory to manage backend and frontend services.

### Step 3: Initialize the Backend Service
In one of the terminal windows, navigate to `hackmit-tim-ml-main` using the command:

```cd hackmit-tim-ml-main``` 

then use the command to start the API:

```uvicorn fastapi_demo:app --reload```

### Step 4: Kickstart the Frontend Service
In the other terminal window, execute the following command to launch the frontend service: 

```npm start```
### Step 5: Dive into the Musical Narrative
Log in to your Spotify account and select a book. The on-screen text will be analyzed and transformed into a musical ID, directing you to a corresponding Spotify track that resonates with the narrative, creating a harmonic amalgamation of story and music.

We hope you enjoy this innovative blend of literature and music, creating a serene auditory landscape that complements the literary world.

Happy listening and happy reading! 📚🎶
