import React, { Component } from "react";
import { Table, Space, Modal, Input, Button, Form, message} from "antd";
import {
	EditOutlined,
	DeleteOutlined,
	ExclamationCircleOutlined,
} from "@ant-design/icons";
import "./index.css";
import { getRootList, getRootSearch, addRootUser, rootDelete } from "../../../api/information";

const { confirm } = Modal;
const { Search } = Input;

export default class Information extends Component {
	state = {
		selectValue: "",
		visibleRootAdd: false,
    visibleRootInfo: false,
		pagination: {
			hideOnSinglePage: true,
			position: ["bottomCenter"],
			//pageSize: 10 ,
			total: 500,
			defaultCurrent: 1,
		},
		loading: false,
		columns: [
      {
				title: "UID",
				dataIndex: "UID",
				key: "UID",
				ellipsis: true,
				fixed: "left",
			},
      {
				title: "昵称",
				dataIndex: "userName",
				key: "userName",
				ellipsis: true,
				fixed: "left",
			},
			{
				title: "姓名",
				dataIndex: "real_name",
				key: "real_name",
				ellipsis: true,
				fixed: "left",
			},
			{
				title: "操作",
				key: "action",
				ellipsis: true,
				fixed: "left",
				render: (record) => (
					<Space size="middle">
						<EditOutlined
							onClick={() => {
								this.handleClickEdit(record);
							}}
						/>
						<DeleteOutlined
							onClick={() => {
								this.handleClickDelete(record);
							}}
						/>
					</Space>
				),
			},
		],
		data: [],
		rootInfo: {},
	};

	componentDidMount() {
		//console.log('dsadsadsadas')
		//console.log(this.data)
		let params = {
			page: 1,
			limit: 10,
		};
		getRootList(params).then((res) => {
			// this.data = res.data.data
			this.setState({
				data: res.data.data,
				pagination: {
					position: ["bottomCenter"],
					//pageSize: 10 ,
					defaultCurrent: 1,
					total: res.data.cnt,
				},
			});
		});
		//console.log(this.data)
	}
	onChange(current) {
		let params = {
			page: current.current,
			limit: current.pageSize,
		};
		console.log(current);
		getRootList(params).then((res) => {
			// this.data = res.data.data
			this.setState({
				data: res.data.data,
			});
			console.log(this.state.data);
		});
	}
	onSearch(title) {
		let params = {
			page: 1,
			limit: 10,
			search: title,
		};
		getRootSearch(params).then((res) => {
			console.log(res.data.data);
			// this.data = res.data.data
			this.setState({
				data: res.data.data,
				pagination: {
					position: ["bottomCenter"],
					//pageSize: 10 ,
					defaultCurrent: 1,
					total: res.data.cnt,
				},
			});
		});
	}
	handleClickLook(record) {
		console.log(record);
		// this.setState({
		// 	visibleUserInfo: true,
		// 	userInfo: record,
		// });
	}
	handleClickEdit(record) {
		console.log(record);
		this.setState({
			visibleRootInfo: true,
			rootInfo: record
		});
	}
	handleClickDelete(record) {
		console.log(record);
		confirm({
			title: "提示",
			icon: <ExclamationCircleOutlined />,
			content: `是否删除 ${record.real_name} 志愿者? `,
			okText: "是",
			okType: "danger",
			cancelText: "否",
			onOk() {
				rootDelete(record).then(res=>{
					message.success('用户删除成功');
				})
			},
			onCancel() {
				console.log("Cancel");
			},
		});
	}


  handleAddRoot(){
    this.setState({
			visibleRootAdd: true,
		});
  }

	// handleOk(values) {
	// 	// console.log(this.state.userInfo.phone.length,this.state.userInfo.cards.length)

	// 	// if(this.state.userInfo.phone.length === 11 && this.state.userInfo.cards.length === 18){
	// 	// 	userEdit(this.state.userInfo).then(res=>{
	// 	// 		message.success('数据更新成功');
	// 	// 		setTimeout(this.setState({
	// 	// 			visibleUserEdit: false,
	// 	// 		}),500)
	// 	// 	})
	// 	// }else{
	// 	// 	message.warning('手机号或身份证号错误！！！');
	// 	// }
  //   	console.log("Success:", values);
  //   this.setState({
	// 		visibleRootAdd: false,
	// 	});
	// }

	handleCancel() {
		this.setState({
			visibleRootAdd: false,
		});
	}
	onFinish(values) {
		console.log("Success:", values);
    addRootUser(values).then(()=>{
      message.success('管理员添加成功');
      this.setState({
        visibleRootAdd: false,
      });
    })
	}

	onFinishFailed(errorInfo) {
		console.log("Failed:", errorInfo);
	}
	// inputValue(e,userName){
	// 	let userInfo = Object.assign({}, this.state.userInfo, { [userName]: e.target.value })
	// 	this.setState({
	// 		userInfo: userInfo
	// 	});
	// }

  handleOk(){}
	render() {
		const { pagination, visibleRootAdd, visibleRootInfo, rootInfo} =
			this.state;
		return (
			<div className="Mation">
        <Button type="primary" shape="round" size="Large"  style={{ float: "left" }} onClick={this.handleAddRoot.bind(this)}>
          添加管理员
        </Button>
        <Space direction="vertical" style={{ width: 304, float: "right" }}>
					<Search
						addonBefore="姓名"
						placeholder=""
						allowClear
						onSearch={this.onSearch.bind(this)}
					/>
				</Space>
				<Table
					columns={this.state.columns}
					dataSource={this.state.data}
					// scroll={{ y: 586 }}
					onChange={this.onChange.bind(this)}
					pagination={pagination}
					rowKey={(columns) => columns.UID}
				/>

        <Modal
          key={'创建用户'}
					title="创建用户"
					visible={visibleRootAdd}
					// onOk={this.handleOk.bind(this)}
					// onCancel={this.handleCancel.bind(this)}
          
					// okText="确认"
          // cancelText="取消"
          closable={false}
          footer={[null]}
				>
					<Form
      name="rootAdd"
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 20,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={this.onFinish.bind(this)}
      onFinishFailed={this.onFinishFailed.bind(this)}
      autoComplete="off"
    >
      <Form.Item
        label="昵称："
        name="userName"
        rules={[
          {
            required: true,
            message: '请输入昵称!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="姓名："
        name="real_name"
        rules={[
          {
            required: true,
            message: '请输入姓名!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="密码："
        name="password"
        rules={[
          {
            required: true,
            message: '请输入密码!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="确认密码："
        name="newPassword"
        rules={[
          {
            required: true,
            message: '请再次输入密码!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>


      <Form.Item
         wrapperCol={{
          offset: 4,
          span: 16,
        }}
        // style={{backgroundColor: 'red'}}
      >
        <Button onClick={this.handleCancel.bind(this)}>
          取消
        </Button>

        <Button type="primary"  htmlType="submit" style={{float: 'right'}}>
          确认
        </Button>
      </Form.Item>
    </Form>
				</Modal>

        <Modal
          key={'管理员编辑'}
					title="管理员编辑"
					onOk={this.handleOk} 
          onCancel={this.handleCancel}
					visible={visibleRootInfo}
          okText="确认"
          cancelText="取消"
				>
					
				</Modal>
				
			</div>
		);
	}
}
