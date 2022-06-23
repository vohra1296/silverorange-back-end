import { Router, Request, Response } from 'express';
import axios from 'axios';
import { Repo } from '../models/Repo';

export const repos = Router();

repos.get('/', async (_: Request, res: Response) => {
  try {
    res.header('Cache-Control', 'no-store');

    res.status(200);

    // TODO: See README.md Task (A). Return repo data here. You’ve got this!
    let finalRepos: Array<Repo> = new Array();
    let result = await axios.get(
      'https://api.github.com/users/silverorange/repos'
    );
    let repos = result.data;
    repos.forEach((repo: Repo) => {
      if (!repo.fork) {
        finalRepos.push(repo);
      }
    });

    res.json(finalRepos.length > 0 ? finalRepos : []);
  } catch (err) {
    console.log('Error Fetching Repos', err);
  }
});
