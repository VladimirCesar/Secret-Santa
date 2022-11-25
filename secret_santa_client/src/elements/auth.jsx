import logo from '../res/TroubleFuckers.png';
import background_image from '../res/background.jpg';
import { UserOutlined } from '@ant-design/icons';
import { Input, Button } from 'antd';

export function Auth() {
    const element = (
        <div className='auth_page' style={{
            backgroundImage: `url(${background_image})`,
        }}>
            <div className='auth_page_container margin5'>
                <img className='main_logo' src={logo} alt="TroubleFuckers" />
                <div className="auth_form_container">
                    <h3 className='auth_form__header'>А ты кто из траблоёбов?</h3>
                    <Input status='error' className='auth_form__login' placeholder="Имя" />
                    <Input.Password status='error' className='auth_form__password' placeholder="Пароль" />
                    <Button className='auth_form__button' type="primary">Войти</Button>
                </div>
            </div>
        </div>
    );
    return element;
}