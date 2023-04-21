# Goal 

This project aims to create a world knowledge skill for a chatbot using Natural Language Processing (NLP) algorithms. The focus of this skill is to provide concise responses to user prompts related to various topics in German language like current affairs, established facts and food recipes.

The project involves using state-of-the-art NLP models to understand user utterances and retrieve relevant data from a knowledge base. The retrieved data is then summarized into a concise response using NLP techniques such as text summarization.

The skill can be integrated into any chatbot platform and can be used to enhance the chatbot's ability to provide informative and accurate responses to user queries.

### Tools and technologies

Frontend:
    React.js

Middleware:
    Dialogflow
    
Backend:
    Python
    Huggingface 
    Transformers
    Pytorch
    
API's:
    Wikipedia
    Event registry
    Mealdb

# to run on your local machine please follow;

```sh
npm install --force
npm start
```

# to run with docker (suggested);
first please install docker to your computer and start docker daemon.

```sh
docker build -t sebalab_frontend_temp .
docker run -dp 3000:3000 sebalab_frontend_temp
```

please wait few seconds and navigate to localhost:3000
