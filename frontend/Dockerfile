From node:alpine
ARG deployDir=/app
RUN mkdir -p $deployDir
WORKDIR $deployDir
COPY ["package.json", "package-lock.json", "./"]
RUN npm install --force --production
COPY . .
EXPOSE 3000
RUN npm install -g serve
CMD ["npm", "start"]