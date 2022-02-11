import React, { Component } from 'react'
import './index.css'
import { Layout, Menu, Breadcrumb, Modal} from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  ExclamationCircleOutlined,
  PoweroffOutlined 
} from '@ant-design/icons';
import ZyztIcon from "../../assets/svgImg"
//import Home from "../Home"
import {adminLink} from '../../static/AdminRouter';
import { NavLink , Outlet} from 'react-router-dom';


const { Header, Sider, Content } = Layout;
const { confirm } = Modal;
const { SubMenu } = Menu;

export default class Admin extends Component {
    state = {
        collapsed: false,
      };
    
      // componentDidMount(props){
      //   console.log(props)
      // }
      toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
      };
      leaveUser(){
        confirm({
          title: '提示',
          icon: <ExclamationCircleOutlined />,
          content: '你是否要退出登录？',
          onOk() {
            console.log('OK');
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }
      render() {
        return (
            <Layout>
            <Sider  breakpoint="lg"  trigger={null} collapsible collapsed={this.state.collapsed} style={{
            overflow: 'auto',
            height: '100vh', 
          }}>
              
              <Menu theme="dark" mode="inline" >
                <Menu.Item key="logo" icon={<ZyztIcon />} disabled className="logo">
                  志愿者后台管理系统
                </Menu.Item>
                {
                  adminLink.map((item, index)=>{
                    return (
                      <SubMenu key={index} icon={item.iconImg} title={item.title}>
                         {
                          item.children.map((res)=>{
                            return (
                              
                                <Menu.Item key={res.title}>
                                  <NavLink to={res.path}>
                                    {res.title}
                                  </NavLink>
                                </Menu.Item>
                              
                            )
                          })
                         }
                      </SubMenu>
                    )
                  })
                }
                
              </Menu>
            </Sider>
            <Layout className="site-layout">
              <Header className="site-layout-background" style={{padding: 0,margin: 'auto 0', display: 'flex'}}>
                <div style={{flex: '1'}}>
                  {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: this.toggle,
                  })}
                </div>
                <div style={{flex: '21',}}>
                  <Breadcrumb style={{lineHeight: '64px',float: "left"}}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    
                    <Breadcrumb.Item>An Application</Breadcrumb.Item>
                  </Breadcrumb>
                </div>
                <div style={{flex: '2', fontSize: '18px'}}>
                  <PoweroffOutlined onClick={this.leaveUser}/>
                  <span> 张三 </span>
                </div>
              </Header>
              <Content
                className="site-layout-background"
                style={{
                  margin: '24px 16px',
                  padding: 24,
                  minHeight: 280,
                }}
              >
                <Outlet></Outlet>
                    {/* <Routes>
                      <Route path="/" element={<Home/>}></Route>
                     
                      {
                        adminRoute.map((item, index)=>{
                          return (
                            <Route path={item.path} element={item.component} key={index}></Route>
                          )
                        })
                      }
                    </Routes> */}
              </Content>
            </Layout>
          </Layout>
        )
      }
}
