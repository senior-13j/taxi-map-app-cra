import { Menu } from 'antd';
import {
  CarOutlined,
  BookOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import styles from './side-menu.module.sass';

export const SideMenu = (): JSX.Element => (
  <Menu theme="dark" mode="inline" className={styles.menu}>
    <Menu.Item key="1" icon={<HomeOutlined />}>
      <Link to='/homePage'>Главная</Link>
    </Menu.Item>
    <Menu.Item key="2" icon={<CarOutlined />}>
      <Link to='/orderTaxi'>Заказать такси</Link>
    </Menu.Item>
    <Menu.Item key="3" icon={<BookOutlined />}>
      <Link to='/myTrips'>Мои поездки</Link>
    </Menu.Item>
  </Menu>
);
