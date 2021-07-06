import Title from 'antd/lib/typography/Title';
import { MapComponent } from '../MapComponent/MapComponent';
import classes from './order-taxi.module.sass';

export const OrderTaxi = (): JSX.Element => (
  <div className={classes.orderTaxi}>
    <Title>Заказать такси</Title>
    <MapComponent />
  </div>
);
