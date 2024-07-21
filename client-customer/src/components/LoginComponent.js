import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import withRouter from '../utils/withRouter';
//import '../assets/SCSS';
import 'bootstrap/dist/css/bootstrap.min.css';
import FooterComponent from './FooterComponent';

class Login extends Component {
    static contextType = MyContext; // using this.context to access global state
    constructor(props) {
        super(props);
        this.state = {
            txtUsername: 'long',
            txtPassword: '123'
        };
    }
    render() {
        return (
            <div>
                <div className="align-center">
                    <h2 className="text-center">CUSTOMER LOGIN</h2>
                    <form>
                        <div className="col-12 form-group login-input">
                            <table className="align-center">

                                <div className='username'><div class="form-floating">
                                    <input type="Username" class="form-control" id="floatingInput" placeholder="Username" value={this.state.txtUsername} onChange={(e) => { this.setState({ txtUsername: e.target.value }) }} />
                                    <label for="floatingInput">Username</label>
                                </div></div>
                                <div className="form-floating">
                                    <input class="form-control" id="floatingInput" placeholder="Password" type="password" value={this.state.txtPassword} onChange={(e) => { this.setState({ txtPassword: e.target.value }) }} />
                                    <label for="floatingInput">Username</label>
                                </div>
                                <div className='btn'><input class="btn btn-primary active" type="submit" value="LOGIN" onClick={(e) => this.btnLoginClick(e)} /></div>


                            </table>
                        </div>
                    </form>
                </div>
                <FooterComponent />
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