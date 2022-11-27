import { Typography, Input, Button } from 'antd';
import { InfoCircleOutlined, UserOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

import "../../styles/auth.css";

const { Title } = Typography;

export function AuthForm({ setAuthData }) {

    const inputLogin = (
        <Input
            placeholder="Введите логин"
            prefix={<UserOutlined className="site-form-item-icon" />}
        />
    );

    const inputPassword = (
        <Input.Password
            placeholder="Введите пароль"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
    );

    const btn = (
        <Button
        >
            Войти
        </Button>
    );

    const element = (
        <div className='auth-form'>
            <h1>Вход</h1>
            <form className="auth-form-input">
                <div>
                    <Title level={4}>Имя</Title>
                    {inputLogin}
                </div>
                <div>
                    <Title level={4}>Пароль</Title>
                    {inputPassword}
                </div>
                <div className='auth-form-btn'>
                    {btn}
                </div>
            </form>
        </div >

    );

    return element;
}