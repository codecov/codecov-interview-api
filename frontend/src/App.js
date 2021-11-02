import React, { useState } from 'react';

import './App.css';
import Commits from './components/Commits';
import { fetchCommits, synchronizeRepository } from './services/commits';

function App() {

  const [organization, setOrganization] = useState("pytest-dev");
  const [repository, setRepository] = useState("pytest");
  const [commits, setCommits] = useState([]);

  const onBlur = async () => {
    try {
      let response = await fetchCommits(organization, repository)
      setCommits(response)
    } catch {
      console.error("Failed to get commits from repository")
    }
  }

  const syncRepository = async () => {
    try {
      await synchronizeRepository(organization, repository)
      onBlur()
    } catch {
      console.error("Failed to sync commits from repository")
    }
  }

  return (
    <form>
      <label>
        Organization:
        <input type="text" name="organization" value={organization} onChange={event => setOrganization(event.target.value)} onBlur={onBlur} />
      </label>
      <br />
      <label>
        Repository:
        <input type="text" name="repository" value={repository} onChange={event => setRepository(event.target.value)} onBlur={onBlur} />
      </label>
      <Commits commits={commits}
      />
      <button onClick={syncRepository} type="button">Sync</button>
    </form>
  );
}

export default App;
