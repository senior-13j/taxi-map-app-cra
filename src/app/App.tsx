import { useState } from 'react';
import { Layout } from 'antd';
import { SideMenu } from '../pages/SideMenu/SideMenu';
import { BrowserRouter } from 'react-router-dom';
import { ContentRouter } from '../pages/ContentRouter';
import Title from 'antd/lib/typography/Title';
import styles from './App.module.sass';

const { Header, Content, Footer, Sider } = Layout;

export const App = (): JSX.Element => {
  const [collapsed, setCollapse] = useState(false);

  const onCollapse = (collapsed: boolean): void => {
    setCollapse(collapsed);
  };

  return (
    <BrowserRouter>
      <Layout className={styles.layout}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <SideMenu />
        </Sider>
        <Layout>
          <Header className={styles.header} />
          <Content className={styles.content}>
            <ContentRouter></ContentRouter>
          </Content>
          <Footer className={styles.footer}>
            <Title level={5}>Created by Arkadiy Kotlyarov <sup>©</sup> 2021</Title>
          </Footer>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};
