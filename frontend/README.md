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