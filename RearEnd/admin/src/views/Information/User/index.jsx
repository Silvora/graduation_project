import React, { Component } from "react";
import { Table, Space, Modal, Drawer, Input, Descriptions, message, Row, Col } from "antd";
import {
	EyeOutlined,
	EditOutlined,
	DeleteOutlined,
	ExclamationCircleOutlined,
} from "@ant-design/icons";
import "./index.css";
import { getUserList, getUserSearch, userEdit, userDelete } from "../../../api/information";
import { UserInfoTable } from "../../../static/InformationUserTable"

const { confirm } = Modal;
const { Search } = Input;

export default class Information extends Component {
	state = {
		selectValue: "",
		visibleUserInfo: false,
		visibleUserEdit: false,
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
				title: "姓名",
				dataIndex: "real_name",
				key: "real_name",
				ellipsis: true,
				fixed: "left",
			},
			{
				title: "性别",
				dataIndex: "sex",
				key: "sex",
				ellipsis: true,
				fixed: "left",
			},
			{
				title: "电话",
				dataIndex: "phone",
				key: "phone",
				ellipsis: true,
				fixed: "left",
			},
			{
				title: "现居住地址",
				dataIndex: "now_address",
				key: "now_address",
				ellipsis: true,
				fixed: "left",
			},
			{
				title: "服务时长（s）",
				key: "serviceTime",
				dataIndex: "serviceTime",
				ellipsis: true,
				fixed: "left",
			},
			{
				title: "所属团队",
				dataIndex: "team",
				key: "team",
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
						<EyeOutlined
							onClick={() => {
								this.handleClickLook(record);
							}}
						/>
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
		userInfo: {},
	};

	componentDidMount() {
		//console.log('dsadsadsadas')
		//console.log(this.data)
		let params = {
			page: 1,
			limit: 10,
		};
		getUserList(params).then((res) => {
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
		//console.log(current);
		getUserList(params).then((res) => {
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
		getUserSearch(params).then((res) => {
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
		this.setState({
			visibleUserInfo: true,
			userInfo: record,
		});
	}
	handleClickEdit(record) {
		console.log(record);
		this.setState({
			visibleUserEdit: true,
			userInfo: record
		});
	}
	handleClickDelete(record) {
		console.log(record);
		confirm({
			title: "提示",
			icon: <ExclamationCircleOutlined />,
			content: `是否删除 ${record.name} 志愿者? `,
			okText: "是",
			okType: "danger",
			cancelText: "否",
			onOk() {
				userDelete(record).then(res=>{
					message.success('用户删除成功');
				})
			},
			onCancel() {
				console.log("Cancel");
			},
		});
	}
	onClose() {
		this.setState({
			visibleUserInfo: false,
		});
	}
	handleOk() {
		console.log(this.state.userInfo.phone.length,this.state.userInfo.cards.length)

		if(this.state.userInfo.phone.length === 11 && this.state.userInfo.cards.length === 18){
			userEdit(this.state.userInfo).then(res=>{
				message.success('数据更新成功');
				setTimeout(this.setState({
					visibleUserEdit: false,
				}),500)
			})
		}else{
			message.warning('手机号或身份证号错误！！！');
		}
				
	}

	handleCancel() {
		this.setState({
			visibleUserEdit: false,
		});
	}
	// onFinish(values) {
	// 	console.log("Success:", values);
	// }

	// onFinishFailed(errorInfo) {
	// 	console.log("Failed:", errorInfo);
	// }
	inputValue(e,userName){
		let userInfo = Object.assign({}, this.state.userInfo, { [userName]: e.target.value })
		this.setState({
			userInfo: userInfo
		});
	}
	render() {
		const { pagination, loading, visibleUserInfo, visibleUserEdit, userInfo } =
			this.state;
		return (
			<div className="Mation">
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

				<Drawer
					title="用户详情"
					placement="right"
					onClose={this.onClose.bind(this)}
					visible={visibleUserInfo}
					width="60%"
				>
					<Descriptions bordered>
						<Descriptions.Item label="昵称：">
							{userInfo.userName}
						</Descriptions.Item>
						<Descriptions.Item label="姓名：">
							{userInfo.real_name}
						</Descriptions.Item>
						<Descriptions.Item label="性别：">{userInfo.sex}</Descriptions.Item>

						<Descriptions.Item label="出生日期：">
							{userInfo.born_data}
						</Descriptions.Item>
						<Descriptions.Item label="电话：" span={2}>
							{userInfo.phone}
						</Descriptions.Item>
						<Descriptions.Item label="服务时长：">
							{userInfo.serviceTime}
						</Descriptions.Item>
						<Descriptions.Item label="邮箱：" span={2}>
							{userInfo.email}
						</Descriptions.Item>
						<Descriptions.Item label="身份证号：" span={3}>
							{userInfo.cards}
						</Descriptions.Item>
						<Descriptions.Item label="家庭地址：" span={3}>
							{userInfo.address}
						</Descriptions.Item>
						<Descriptions.Item label="现居住地：" span={3}>
							{userInfo.now_address}
						</Descriptions.Item>
						<Descriptions.Item label="所属团队：" span={3}>
							{userInfo.team}
						</Descriptions.Item>
						<Descriptions.Item label="参加活动：" span={3}>
							{userInfo.join_activity}
						</Descriptions.Item>
					</Descriptions>
				</Drawer>

				<Modal
					title="用户编辑"
					visible={visibleUserEdit}
					onOk={this.handleOk.bind(this)}
					onCancel={this.handleCancel.bind(this)}
					okText="确认"
          			cancelText="取消"
				>
					{
						UserInfoTable.map((item) => {
							return (
								<Row key={item.name}>
									<Col span={6}>
										<p style={{padding: '4px 11px'}}>{item.title}</p>
									</Col>
									<Col span={18}>
										<Input value={userInfo[item.name]} onChange={e=>this.inputValue(e, item.name)}/>
									</Col>
								</Row>
							)
						})
					}
				</Modal>
			</div>
		);
	}
}
