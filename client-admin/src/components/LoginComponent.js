import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import '../assets/SCSS/Login.scss';
import MyContext from '../contexts/MyContext';
class Login extends Component {
  static contextType = MyContext; // using this.context to access global state

  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: ''
    };
  }
  handleShowHidePassword = () => {
    this.setState({
      isshowPassword: !this.state.isshowPassword
    })

  }

  render() {
    if (this.context.token === '') {
      return (
        <div className="login-background">

          <Helmet>
            <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
          </Helmet>


          <div className="login-container">

            <div className="login-content row">
              <h2 className="col-12 text-login">ADMIN LOGIN</h2>
              <form>
                <table className="align-center">
                  <tbody>
                    <div className="col-12 form-group login-input">
                      <tr>
                        <td>Username</td>
                        <td>
                          <input
                            type="text"
                            value={this.state.txtUsername}
                            className="form-control-1"
                            onChange={(e) => { this.setState({ txtUsername: e.target.value }) }}
                          />
                        </td>
                      </tr>
                    </div>
                    <div className="col-12 form-group login-input">
                      <tr>
                        <td>Password</td>
                        <td className='custom-input'>
                          <input
                            type={this.state.isshowPassword ? 'text' : 'password'}
                            value={this.state.txtPassword}
                            className="form-control-2"
                            onChange={(e) => { this.setState({ txtPassword: e.target.value }) }}

                          />
                          <span onClick={() => this.handleShowHidePassword()}>
                            <i class={this.state.isshowPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}>
                            </i>
                          </span>

                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <div className="col-12" >
                          <td>
                            <input
                              type="submit"
                              value="LOGIN"
                              className="form-login"
                              onClick={(e) => this.btnLoginClick(e)}
                            />
                          </td>
                        </div>
                      </tr>
                    </div>
                  </tbody>
                </table>
              </form>
            </div>
          </div>
        </div>
      );
    }
    return (<div />);
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
    axios.post('/api/admin/login', account).then((res) => {
      const result = res.data;
      if (result.success === true) {
        this.context.setToken(result.token);
        this.context.setUsername(account.username);
      } else {
        alert(result.message);
      }
    });
  }
}

export default Login;
