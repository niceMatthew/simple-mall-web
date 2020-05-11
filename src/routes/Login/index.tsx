import React, { PropsWithChildren } from 'react';
import './index.less';
import { Form, Input, Icon, Button, message } from 'antd';
import { connect } from 'react-redux';
import { CombinedState, ProfileState } from '@/typings/state';
import { RouteComponentProps, Link } from 'react-router-dom';
import mapDispatchToProps from '@/store/actions/profile';
import { FormComponentProps } from 'antd/lib/form';
import Nav from '@/components/Nav';
type Props = PropsWithChildren<RouteComponentProps & ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps> & FormComponentProps;
function Login(props: Props) {
    const { getFieldDecorator } = props.form;
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.form.validateFieldsAndScroll(async (errors: any, values) => {
            if (errors) {//如果errors有值，则表示有某些字段较验不通过
                message.error('注册信息不合法');
            } else {
                props.login(values);
            }
        });
    }
    return (
        <>
            <Nav history={props.history}>用户登录</Nav>
            <Form className="login-form" onSubmit={handleSubmit}>
                <Form.Item>
                    {
                        getFieldDecorator('username', {
                            rules: [
                                { required: true, message: '用户名不能为空' }
                            ]
                        })(<Input placeholder="用户名" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />)
                    }
                </Form.Item>
                <Form.Item>
                    {
                        getFieldDecorator('password', {
                            rules: [
                                { required: true, message: '密码不能为空' }
                            ]
                        })(<Input placeholder="密码" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} />)
                    }
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                    >登录</Button>
                    或者 <Link to="/register">注册</Link>
                </Form.Item>
            </Form>
        </>
    )
}
//WrappedRegister就是一个高阶组件 ，会向Register组件里传递属性 name没有什么用
const WrappedLogin = Form.create({ name: '登录表单' })(Login)
let mapStateToProps = (state: CombinedState): ProfileState => state.profile;
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WrappedLogin);