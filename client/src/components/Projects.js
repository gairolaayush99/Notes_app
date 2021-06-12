import React from 'react'
import Header from './project/Nav'
import Home from "./project/Home";
import CreateNote from "./project/CreateProject";
import EditNote from "./project/EditProject";
import Details from "./project/Details";

import {BrowserRouter as Router,Route} from 'react-router-dom'


export default function Projects({ setIsLogin }) {
  return (
    <Router>
      <div className="notes-page">
        <Header setIsLogin={setIsLogin} />
        <section>
          <Route path="/" component={Home} exact />
          <Route path="/create" component={CreateNote} exact />
          <Route path="/edit/:id" component={EditNote} exact />
          <Route path="/details" component={Details} exact />
        </section>
      </div>
    </Router>
  );
}
