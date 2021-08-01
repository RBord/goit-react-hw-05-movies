import { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import Container from '../Container/Container';

const HomePage = lazy(() =>
  import(
    '../../Views/HomePageView/HomePage' /* webpackChunkName: 'home-page'*/
  ),
);
const MoviesPage = lazy(() =>
  import(
    '../../Views/MoviesPage/MoviesPage' /* webpackChunkName: 'movies-page'*/
  ),
);
const NotFoundView = lazy(() =>
  import('../../Views/NotFoundView' /* webpackChunkName: 'notfound-page'*/),
);
const MovieDetailsPage = lazy(() =>
  import(
    '../../Views/MovieDetailsPageView/MovieDetailsPage' /* webpackChunkName: 'movie-details-page'*/
  ),
);

export default function App() {
  return (
    <Container>
      <Navigation />
      <Switch>
        <Suspense fallback={<h1>Загружаем инфо...</h1>}>
          <Route path="/" exact>
            <HomePage />
          </Route>

          <Route path="/movies" exact>
            <MoviesPage />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>

          <Redirect to="/" />
        </Suspense>
        <Route>
          <NotFoundView />
        </Route>
      </Switch>
    </Container>
  );
}
