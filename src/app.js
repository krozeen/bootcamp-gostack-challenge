const express = require("express");
const cors = require("cors");
const { uuid } = require('uuidv4')

// const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
    return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

    const repository = {
      id: uuid(),
      title: title,
      url: url,
      techs: techs,
      likes: 0
    }

    repositories.push(repository);

    return response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { title, url, techs } = request.body

  const { id } = request.params

  const repoIndex = repositories.findIndex(repo => repo.id === id)

  if(repoIndex < 0){
    return response.status(400).json({ Error: "repository not found!" })
  }

  const repository = {
    id,
    title: title,
    url: url,
    techs: techs,
    likes: repositories[repoIndex].likes
  }

  repositories[repoIndex] = repository

  return response.status(200).json(repository);

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params

  const repoIndex = repositories.findIndex(repo => repo.id === id)

  if(repoIndex < 0){
    return response.status(400).json({ Error: "repository not found!" })
  }

  repositories.splice(repoIndex, 1)

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
    const { id } = request.params

    const repoIndex = repositories.findIndex(repo => repo.id === id)

    if(repoIndex < 0){
      return response.status(400).json({ Error: "repository not found!" })
    }

  const repository = {
    id,
    title: repositories[repoIndex].title,
    url: repositories[repoIndex].url,
    techs: repositories[repoIndex].techs,
    likes: repositories[repoIndex].likes + 1
  }

  repositories[repoIndex] = repository

  return response.status(200).json(repository);

});

module.exports = app;
