export const registerDataValidator = {
    userName: [
      { required: true, message: "请输入用户名", trigger: "blur" },
    //   { min: 3, max: 20, message: "长度在 3 到 15 个字符", trigger: "blur" },
    ],
    passWord: [
      { required: true, message: "请输入用户密码", trigger: "blur" },
    //   { min: 6, max: 18, message: "长度在 6 到 18 个字符", trigger: "blur" },
    ],

    nowPassWord: [
      { required: true, message: "请再次输入用户密码", trigger: "blur" },
    //   { min: 6, max: 18, message: "长度在 6 到 18 个字符", trigger: "blur" },
    ],
    real_name: [
      { required: true, message: "请输入姓名", trigger: "blur" },
    ],
    address: [
      { required: true, message: "请输入家庭地址", trigger: "blur" },
    ],

    phone: [
      { required: true, message: "请输入手机号", trigger: "blur" },
    //   { min: 11, max: 11, message: "请输入有效手机号", trigger: "blur" },
    ],
    cards: [
      { required: true, message: "请输入身份证号", trigger: "blur" },
    //   { min: 18, max: 18, message: "请输入有效身份证号", trigger: "blur" },
    ],
    now_address: [
      { required: true, message: "请输入现居住地址", trigger: "blur" },
    ],
    email: [
      { required: true, message: "请输入邮箱", trigger: "blur" },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
    ],
    verify: [
        { required: true, message: "请输入邮箱验证码", trigger: "blur" },
        { message: "请输入有效邮箱验证码", trigger: "blur" },
      ],

    born_data: [
      {
        required: true,
        message: "请选择日期",
        trigger: "change",
      },],
  
    sex: [
      { required: true, message: "请选择性别", trigger: "change" },
    ],
  }