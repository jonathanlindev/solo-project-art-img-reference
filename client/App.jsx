import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import PhotosViewController from './components/PhotosViewController.jsx';
import Characters from './components/Characters.jsx';
// import CreateCharacter from './components/CreateCharacter.jsx';

import './stylesheets/App.css';

const App = (props) => {
  return (
    <div className='router h-100'>
      <main className='h-100'>
        {/*
            NOTE: The syntax below is for React-Router
              - A helpful library for routing with a React app.
              You can learn more about this at:
              https://reacttraining.com/react-router/web/guides/quick-start
        */}
        <Switch>
          <Route exact path='/' component={PhotosViewController} />
          {/* <Route exact path='/create' component={CreateCharacter} /> */}
        </Switch>
      </main>
    </div>
  );
};

export default App;
