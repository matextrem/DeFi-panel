import React from 'react';
import './App.scss';
import Panel from './components/Panel';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          DeFi Panel
        </p>
      </header>
      <main>
        <div className="App-content">
          <Panel />
        </div>
      </main>
    </div>
  );
}

export default App;
