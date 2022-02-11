import React, { Component } from "react";
import {
	Table,
	Space,
	Modal,
	Row,
	Col,
	Input,
	message,
	Button,
	Form,
} from "antd";
import {
	EditOutlined,
	DeleteOutlined,
	ExclamationCircleOutlined,
} from "@ant-design/icons";

import {
	getRootList,
	getRootSearch,
	addRootUser,
	rootDelete,
	rootEdit,
} from "../../../api/information";

// const { Search } = Input;

const { confirm } = Modal;
const { Search } = Input;

export default class index extends Component {
    formRef = React.createRef(); 
	state = {
		visibleRootInfo: false,
		visibleRootAdd: false,
		pagination: {
			hideOnSinglePage: true,
			position: ["bottomCenter"],
			//pageSize: 10 ,
			total: 500,
			defaultCurrent: 1,
		},

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
                        style={{color: '#1890ff'}}
							onClick={() => {
								this.handleClickEdit(record);
							}}
						/>
						<DeleteOutlined
                        style={{color: 'red'}}
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

	handleClickEdit(record) {
		this.setState({
			visibleRootInfo: true,
			rootInfo: record,
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
				rootDelete(record).then((res) => {
					message.success("用户删除成功");
				});
			},
			onCancel() {
				console.log("Cancel");
			},
		});
	}

	handleOk() {
		rootEdit(this.state.rootInfo).then(() => {
			message.success("数据更新成功");
			setTimeout(
				this.setState({
					visibleRootInfo: false,
				}),
				500
			);
		});
	}
	handleCancel() {
		this.setState({
			visibleRootInfo: false,
		});
	}
	handleEditOk() {

        this.formRef.current.validateFields()
            .then(values => {
                this.formRef.current.resetFields();
                this.setState({
                    visibleRootAdd: false,
                });
                addRootUser(values).then(()=>{
                    message.success('管理员添加成功');
                    this.setState({
                      visibleRootAdd: false,
                    });
                  })
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });


		
		// rootEdit(this.state.rootInfo).then(()=>{
		//     message.success('数据更新成功');
		// 		setTimeout(this.setState({
		// 			visibleRootInfo: false,
		// 		}),500)
		// })
	}
	handleEditCancel() {
        this.formRef.current.resetFields();
		this.setState({
			visibleRootAdd: false,
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
	handleAddRoot() {
		this.setState({
			visibleRootAdd: true,
		});
	}

	inputValue(e, userName) {
		let rootInfo = Object.assign({}, this.state.rootInfo, {
			[userName]: e.target.value,
		});
		this.setState({
			rootInfo: rootInfo,
		});
		console.log(rootInfo);
	}
	render() {
		const { pagination, visibleRootInfo, rootInfo, visibleRootAdd } =
			this.state;
		return (
			<div className="Mation">
				<Button
					type="primary"
					shape="round"
					size="Large"
					style={{ float: "left" }}
					onClick={this.handleAddRoot.bind(this)}
				>
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
					title="管理员编辑"
					onOk={this.handleEditOk.bind(this)}
					onCancel={this.handleEditCancel.bind(this)}
					visible={visibleRootAdd}
					okText="确认"
					cancelText="取消"
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
                        ref={this.formRef} 
						// onFinish={this.onFinish.bind(this)}
						// onFinishFailed={this.onFinishFailed.bind(this)}
						autoComplete="off"
					>
						<Form.Item
							label="昵称："
							name="userName"
							rules={[
								{
									required: true,
									message: "请输入昵称!",
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
									message: "请输入姓名!",
								},
							]}
						>
							<Input />
						</Form.Item>

						<Form.Item
							label="密码："
							name="password"
                            hasFeedback
							rules={[
								{
									required: true,
									message: "请输入密码!",
								},
							]}
						>
							<Input.Password />
						</Form.Item>
						<Form.Item
							label="确认密码："
							name="newPassword"
                            dependencies={['password']}
                            hasFeedback
							rules={[
								{
									required: true,
									message: "请再次输入密码!",
								},
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                      if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                      }
                        
                                      return Promise.reject(new Error('密码不同，请重新输入!'));
                                    },
                                  }),
							]}
						>
							<Input.Password />
						</Form.Item>
					</Form>
				</Modal>

				<Modal
					title="管理员编辑"
					onOk={this.handleOk.bind(this)}
					onCancel={this.handleCancel.bind(this)}
					visible={visibleRootInfo}
					okText="确认"
					cancelText="取消"
				>
					<Row>
						<Col span={6}>
							<p style={{ padding: "4px 11px" }}>昵称：</p>
						</Col>
						<Col span={18}>
							<Input
								value={rootInfo.userName}
								onChange={(e) => this.inputValue(e, "userName")}
							/>
						</Col>
					</Row>

					<Row>
						<Col span={6}>
							<p style={{ padding: "4px 11px" }}>姓名：</p>
						</Col>
						<Col span={18}>
							<Input
								value={rootInfo.real_name}
								onChange={(e) => this.inputValue(e, "real_name")}
							/>
						</Col>
					</Row>

					<Row>
						<Col span={6}>
							<p style={{ padding: "4px 11px" }}>密码：</p>
						</Col>
						<Col span={18}>
							<Input
								value={rootInfo.passWord}
								onChange={(e) => this.inputValue(e, "passWord")}
							/>
						</Col>
					</Row>
				</Modal>
			</div>
		);
	}
}
