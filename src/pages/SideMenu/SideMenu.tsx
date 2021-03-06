import { Menu } from 'antd';
import {
  CarOutlined,
  BookOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import styles from './side-menu.module.sass';

export const SideMenu = (): JSX.Element => (
  <Menu theme="dark" mode="inline" className={styles.menu}>
    <Menu.Item key="1" icon={<CarOutlined />}>
      <Link to='/orderTaxi'>Order taxi</Link>
    </Menu.Item>
    <Menu.Item key="2" icon={<BookOutlined />}>
      <Link to='/myTrips'>My trips</Link>
    </Menu.Item>
  </Menu>
);
