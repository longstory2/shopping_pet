import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import withRouter from '../utils/withRouter';
//import '../assets/SCSS';
import 'bootstrap/dist/css/bootstrap.min.css';

class Login extends Component {
    static contextType = MyContext; // using this.context to access global state
    constructor(props) {
        super(props);
        this.state = {
            txtUsername: '123',
            txtPassword: '132'
        };
    }
    render() {
        return (
            <div className="login-container align-center">
                <div className="login-content row">
                    <h2 className="col-12 text-login">CUSTOMER LOGIN</h2>
                    <form>
                        <table className="align-center-1">
                            <tbody>
                                <div className="col-12 form-group login-input">
                                    <tr>
                                        <td>Username</td>
                                        <td>
                                            <input
                                                type="text"
                                                className="form-control-1"
                                                value={this.state.txtUsername} onChange={(e) => { this.setState({ txtUsername: e.target.value }) }} /></td>
                                    </tr>
                                </div>
                                <div className="col-12 form-group login-input">
                                    <tr>
                                        <td>Password</td>
                                        <td className='custom-input'>
                                            <input
                                                className="form-control-2"
                                                type="password" value={this.state.txtPassword} onChange={(e) => { this.setState({ txtPassword: e.target.value }) }} /></td>
                                    </tr>
                                </div>
                                <tr>
                                    <td></td>
                                    <td><input type="submit" value="LOGIN" onClick={(e) => this.btnLoginClick(e)} /></td>
                                </tr>

                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        );
    }
    // event-handlers
    btnLoginClick(e) {
        e.preventDefault();
        const username = this.state.txtUsername;
        const password = this.state.txtPassword;
        if (username && password) {
            const account = { username: username, password: password };
            this.apiLogin(account);
        } else {
            alert('Please input username and password');
        }
    }
    // apis
    apiLogin(account) {
        axios.post('/api/customer/login', account).then((res) => {
            const result = res.data;
            if (result.success === true) {
                this.context.setToken(result.token);
                this.context.setCustomer(result.customer);
                this.props.navigate('/home');
            } else {
                alert(result.message);
            }
        });
    }
}
export default withRouter(Login);