import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div class="repositories">
        <div>
          <h3>Github</h3>
          <label>pytest-dev/pytest </label>
          <ul>
            <li>pytest commit info </li>
            <li>pytest commit info </li>
            <li>pytest commit info </li>
          </ul>
        </div>
        <div>
          <h3>Bitbucket</h3>
          <label>pytest-dev/pytest </label>
          <ul>
            <li>pytest commit info </li>
            <li>pytest commit info </li>
            <li>pytest commit info </li>
          </ul>
        </div>
      </div>
      <button class="btn">Sync</button>
    </div>
  );
}

export default App;
