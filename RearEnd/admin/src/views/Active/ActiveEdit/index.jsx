import React from "react";
import "./index.css";
import { Form, Input, Button, DatePicker, message } from "antd";
import { activeEdit } from "../../../api/active"
import { dealDate, getSecondByDate } from "../../../utils/Date"

export default function ActiveEdit() {
	const { RangePicker } = DatePicker;
    const [form] = Form.useForm();
	const onFinish = (values) => {
		console.log("Success:", values.time[0]._d, values.time[1]._d);
        let startTime = dealDate(values.time[0]._d)
        let endTime = dealDate(values.time[1]._d)
        let time = getSecondByDate(startTime, endTime)

        let params = {
            ...values,
            begin_time: startTime,
            end_time: endTime,
            time: time,
        }
        activeEdit(params).then(()=>{
            message.success('活动创建成功')
            form.resetFields();
        })
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};
    const onReset = () => {
        form.resetFields();
      };
	return (
		<Form
            form={form}
			labelCol={{
				span: 2,
			}}
			wrapperCol={{
				span: 22,
			}}
			layout="horizontal"
			size="large"
			initialValues={{
				remember: true,
			}}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			autoComplete="off"
			//style={{backgroundColor: 'red'}}
		>
			<Form.Item
				label="活动名称："
				name="activity_name"
				rules={[
					{
						required: true,
						message: "请输入活动名称！！!",
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				name="time"
				label="活动时间："
				rules={[
					{
						type: "array",
						required: true,
						message: "请选择活动时间!",
					},
				]}
			>
				<RangePicker
					style={{ width: "100%" }}
					showTime={{ format: "HH:mm" }}
					format="YYYY-MM-DD HH:mm"
				/>
			</Form.Item>

			<Form.Item
				label="所需人数："
				name="total"
				rules={[
					{
						required: true,
						message: "请输入所需人数！！!",
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label="活动地址："
				name="address"
				rules={[
					{
						required: true,
						message: "请输入活动地址！！!",
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				name="introduce"
				label="活动介绍："
				rules={[
					{
						required: true,
						message: "请输入活动介绍！！！",
					},
				]}
			>
				<Input.TextArea showCount maxLength={1000} style={{ height: 180 }} />
			</Form.Item>

			<Form.Item>
				<Button type="primary" htmlType="submit" className="Btn">
					提交
				</Button>
				<Button className="Btn" onClick={onReset}>重置</Button>
			</Form.Item>
		</Form>
	);
}
