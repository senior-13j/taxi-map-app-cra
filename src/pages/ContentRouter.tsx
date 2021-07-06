import { Switch, Route, Redirect } from 'react-router-dom';
import { HomePage } from './Home/HomePage';
import { MyTrips } from './MyTrips/MyTrips';
import { NotFoundPage } from './NotFoundPage/NotFoundPage';
import { OrderTaxi } from './OrderTaxi/OrderTaxi';

export const ContentRouter = (): JSX.Element => (
  <Switch>
    <Route exact path='/' component={HomePage} />
    <Route exact path='/homePage' component={HomePage} />
    <Route exact path='/orderTaxi' component={OrderTaxi} />
    <Route exact path='/myTrips' component={MyTrips} />
    <Route exact path='/404page' component={NotFoundPage} />
    <Route path="/" render={(): JSX.Element => (<Redirect to="/404page" />)} />
  </Switch>
);
