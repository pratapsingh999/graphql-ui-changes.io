import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CharacterList from './Components/CharacterList';
import CharacterInfo from './Components/CharacterInfo';
import Episode from './Components/Episode';
import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={CharacterList} />
          <Route path="/characters/:id" component={CharacterInfo} />
          <Route path="/episode/:id" component={Episode} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
