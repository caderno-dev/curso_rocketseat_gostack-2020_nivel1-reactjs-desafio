import React from 'react';
import api from './services/api';

import './styles.css';
import { useState, useEffect } from 'react';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const titleEl = document.getElementById('repository-title');
    const response = await api.post('repositories', {
      title: titleEl.value
    });

    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid='repository-list'>
        {
          repositories.map(repository => 
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          )
        }
      </ul>

      <input type="text" id="repository-title" placeholder="Digite o título do repositório"></input>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
