// import styles from './index.css';
import React from 'react';
import { Layout, Menu, Breadcrumb, Icon, LocaleProvider } from 'antd';
import Link from 'umi/link';
import zhCN from 'antd/es/locale-provider/zh_CN';

const { Content, Sider } = Layout;


class MainLayout extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <LocaleProvider locale={zhCN}>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1">
                <Icon type="camera" />
                <span>拍照</span>
                <Link to="/photograph">拍照</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="desktop" />
                <span>画廊</span>
                <Link to="/gallery">画廊</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            {/* <Header style={{ background: '#fff', padding: 0 }} /> */}
            <Content style={{ margin: '0 16px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                {/* <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
              </Breadcrumb>
              <div style={{ padding: 24, background: '#fff', minHeight: 900 }}>{this.props.children}</div>
            </Content>
            {/* <Footer style={{ textAlign: 'center' }}>ChangeBackgroundSystem ©2019 Created by Liu Jianxing</Footer> */}
          </Layout>
        </Layout>
      </LocaleProvider>
    );
  }
}

export default MainLayout;
