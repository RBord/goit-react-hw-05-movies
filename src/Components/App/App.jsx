import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import Container from '../Container/Container';
import HomePage from '../../Views/HomePage';
import MoviesPage from '../../Views/MoviesPage';
import NotFoundView from '../../Views/NotFoundView';
import MovieDetailsPage from '../../Views/MovieDetailsPage';

export default function App() {
  return (
    <Container>
      <Navigation />

      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>

        <Route path="/movies" exact>
          <MoviesPage />
        </Route>

        <Route path="/movies/:movieId">
          <MovieDetailsPage />
        </Route>

        <Route>
          <NotFoundView />
        </Route>
      </Switch>
    </Container>
  );
}
