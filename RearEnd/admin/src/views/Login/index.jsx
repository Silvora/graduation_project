import React from "react";
import "./index.css";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/login"
export default function Login() {
	const navigate = useNavigate();

  
  const onFinish = (values)=>{
      login(values).then(()=>{
        navigate('/admin')
          //navigate('/admin')
        })
  };

	return (
		<div>
			<section className="main">
				<div className="logoTitle text-center">
					<p style={{ fontSize: "40px", color: "#fff" }}>志愿者后台管理系统</p>
				</div>
				<div className="content-w3ls text-center">
					<Form
						name="normal_login"
						className="login-form"
						initialValues={{ remember: true }}
						onFinish={onFinish}
					>
						<Form.Item
							name="username"
							rules={[{ required: true, message: "请输入账号!！！" }]}
						>
							<Input
								prefix={<UserOutlined className="site-form-item-icon" />}
								placeholder="手机号/身份证号"
								style={{
									width: "500px",
									padding: "15px 20px",
									borderRadius: "25px",
								}}
							/>
						</Form.Item>

						<Form.Item
							name="password"
							rules={[{ required: true, message: "请输入密码!！！" }]}
						>
							<Input
								prefix={<LockOutlined className="site-form-item-icon" />}
								style={{
									width: "500px",
									padding: "15px 20px",
									borderRadius: "25px",
								}}
								type="password"
								placeholder="密码"
							/>
						</Form.Item>
						<Form.Item>
							<p className="forgotPwd">忘记密码</p>
						</Form.Item>

						<Form.Item>
							<Button
								type="primary"
                htmlType="submit"
								className="login-form-button"
								size="large"
								style={{ padding: "8px 230px", borderRadius: "10px" }}
							>
								登录
							</Button>
						</Form.Item>
					</Form>
				</div>
				<div className="copyright">
					<p>© 2020 Universe Signin Form. Made with love | Designed by </p>
				</div>
			</section>
		</div>
	);
}
