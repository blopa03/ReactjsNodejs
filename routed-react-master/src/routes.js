// src/routes.js
import React from 'react';
import { Router, Route } from 'react-router'

import App from './components/App';
import Items from './components/Items';
import Detalle from './components/Detalle';
import NotFound from './components/NotFound';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App} />
    <Route path="/items" component={Items} />
    <Route path="/api/items/:id" component={Detalle} />
    <Route path="*" component={NotFound} />
  </Router>
);

export default Routes;
