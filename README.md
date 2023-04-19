## The goal of the project is to create a world knowledge skill for a chatbot. It involves using Natural Language Processing algorithms to summarize a topic-related world knowledge into a concise response to be used by the chatbot.

It should be able to:

Understand user utterance.
Retrieve relevant data for the user prompt. 
Summarize world knowledge into concise text for the chatbot

### Tools and technologies

Hugging Face DialogFlow Python Pytorch

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
