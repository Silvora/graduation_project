import {
    TeamOutlined,
    AppstoreAddOutlined,
    PicLeftOutlined,
    UserSwitchOutlined,
  } from '@ant-design/icons';

import Consumer from "../views/Consumer/index";
import ActiveManage from "../views/Active/ActiveManage/index";
import ActiveEdit from "../views/Active/ActiveEdit/index"
import Team from "../views/Team/index";
import User from "../views/Information/User/index.jsx";
import Root from "../views/Information/Root/index.jsx";
export const adminLink = [
    {
        title: '资讯动态',
        iconImg: <PicLeftOutlined />,
        children: [
            {
                title: '资讯编辑',
                path: 'a'
            },
            {
                title: '资讯管理',
                path: 'b'
            }
        ]
    },
    {
        title: '活动管理',
        iconImg: <AppstoreAddOutlined />,
        children: [
            {
                title: '活动编辑',
                path: 'activeEdit'
            },
            {
                title: '活动管理',
                path: 'activeManage'
            }
        ]
    },
    {
        title: '团队管理',
        iconImg: <TeamOutlined />,
        children: [
            {
                title: '团队编辑',
                path: 'e'
            },
            {
                title: '团队管理',
                path: 'f'
            }
        ]
        
    },
    {
        title: '用户管理',
        iconImg: <UserSwitchOutlined />,
        children: [
            {
                title: '权限管理',
                path: 'root'
            },
            {
                title: '用户管理',
                path: 'user'
            }
        ]
    }
]


export const adminRoute = [
    {
        title: '资讯编辑',
        path: 'a',
        component: <Consumer/>
    },
    {
        title: '资讯管理',
        path: 'b',
        component: <Consumer/>
    },
    {
        title: '活动编辑',
        path: 'activeEdit',
        component: <ActiveEdit/>
    },
    {
        title: '活动管理',
        path: 'activeManage',
        component: <ActiveManage/>
    },
    {
        title: '团队编辑',
        path: 'e',
        component: <Team/>
    },
    {
        title: '团队管理',
        path: 'f',
        component: <Team/>
    },
    {
        title: '权限管理',
        path: 'root',
        component: <Root/>
    },
    {
        title: '用户管理',
        path: 'user',
        component: <User/>
    }
]

