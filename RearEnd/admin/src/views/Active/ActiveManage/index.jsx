import React, { Component } from 'react'
import { Table, Space, Modal, Drawer, Tag, Input } from "antd";
import {
	EyeOutlined,
	EditOutlined,
	DeleteOutlined,
	ExclamationCircleOutlined,
} from "@ant-design/icons";
import { getActiveList, getActiveSearch } from "../../../api/active"

const { confirm } = Modal;
const { Search } = Input;
export default class Exercise extends Component {
	
	state = {
        visible: false,
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
				title: "活动名称",
				dataIndex: "activity_name",
				key: "activity_name",
				ellipsis: true,
				fixed: "left",
			},
			{
				title: "活动开始时间",
				dataIndex: "begin_time",
				key: "begin_time",
				ellipsis: true,
				fixed: "left",
			},
			{
				title: "活动时长（s）",
				dataIndex: "time",
				key: "time",
				ellipsis: true,
				fixed: "left",
			},
			{
				title: "活动地点",
				key: "address",
				dataIndex: "address",
				ellipsis: true,
				fixed: "left",
			},
			{
				title: "所需人数",
				key: "total",
				dataIndex: "total",
				ellipsis: true,
				fixed: "left",
			},
			{
				title: "活动状态",
				dataIndex: "activity_apply_coding",
				key: "activity_apply_coding",
				ellipsis: true,
				fixed: "left",
				render: coding=>(
					<Tag color={coding === '0'?'gray':(coding === '1'?'blue':'red')} key={coding}>
						{coding === '0' ?'未开始':(coding === '1'?'进行中':'已结束')}
				  </Tag>
				)
			},
			{
				title: "活动负责人",
				key: "activity_director",
				dataIndex: "activity_director",
			},
			{
				title: "操作",
				key: "action",
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
		data: []
	};
	componentDidMount() {
		//console.log('dsadsadsadas')
		//console.log(this.data)
		let params = {
			page: 1,
			limit: 10,
		};
		getActiveList(params).then((res) => {
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
		getActiveList(params).then((res) => {
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
		getActiveSearch(params).then((res) => {
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
		this.setState({
            visible: true
        })
	};
	handleClickEdit(record) {
		console.log(record);
	};
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
				console.log("OK");
			},
			onCancel() {
				console.log("Cancel");
			},
		});
	};
    
    onClose(){
        this.setState({
            visible: false
        })
      };
	render() {
		const { pagination, loading, visible } = this.state;
		return (
			<div className="Mation">
				<Space direction="vertical" style={{ width: 304, float: "right" }}>
					<Search
						addonBefore="活动名称"
						placeholder=""
						allowClear
						onSearch={this.onSearch.bind(this)}
					/>
				</Space>

				<Table
					columns={this.state.columns}
					dataSource={this.state.data}
					//scroll={{ y: 586 }}
					pagination={pagination}
					onChange={this.onChange.bind(this)}
					loading={loading}
					rowKey={(columns) => columns.UID}
				/>


                <Drawer title="Basic Drawer" placement="right" onClose={this.onClose.bind(this)} visible={visible} width="40%">
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </Drawer>
			</div>
		);
	}
}
