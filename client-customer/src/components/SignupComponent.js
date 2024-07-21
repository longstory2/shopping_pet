import axios from 'axios';
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FooterComponent from './FooterComponent';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../assets/SCSS/SignUp.scss';
class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txtUsername: '',
            txtPassword: '',
            txtName: '',
            txtPhone: '',
            txtEmail: ''
        };
    }
    render() {
        return (
            <div>
                <div className="align-center">
                    <h2 className="text-center">SIGN-UP</h2>
                    <form>
                        <div className="col-12 form-group login-input">
                            <table className="align-center">
                                <tbody>
                                    <div class="form-floating">
                                        <input class="form-control" id="floatingInput" placeholder="Username" type="Username" value={this.state.txtUsername} onChange={(e) => { this.setState({ txtUsername: e.target.value }) }} />
                                        <label for="floatingInput">Username</label>
                                    </div>
                                    <div class="form-floating">
                                        <input class="form-control" id="floatingInput" placeholder="Password" type="password" value={this.state.txtPassword} onChange={(e) => { this.setState({ txtPassword: e.target.value }) }} />
                                        <label for="floatingInput">Password</label>
                                    </div>
                                    <div class="form-floating">
                                        <input class="form-control" id="floatingInput" placeholder="Name" type="text" value={this.state.txtName} onChange={(e) => { this.setState({ txtName: e.target.value }) }} />
                                        <label for="floatingInput">Name</label>
                                    </div>
                                    <div class="form-floating">
                                        <input class="form-control" id="floatingInput" placeholder="Phone" type="tel" value={this.state.txtPhone} onChange={(e) => { this.setState({ txtPhone: e.target.value }) }} />
                                        <label for="floatingInput">Phone</label>
                                    </div>
                                    <div class="form-floating">
                                        <input class="form-control" id="floatingInput" placeholder="Email" type="email" value={this.state.txtEmail} onChange={(e) => { this.setState({ txtEmail: e.target.value }) }} />
                                        <label for="floatingInput">Email</label>
                                    </div>
                                    <div className='btn'><input class="btn btn-primary active" type="submit" value="SIGN-UP" onClick={(e) => this.btnSignupClick(e)} /></div>
                                </tbody>
                            </table>
                        </div>
                    </form >
                </div >
                <FooterComponent />
            </div>
        );
    }
    // event-handlers
    btnSignupClick(e) {
        e.preventDefault();
        const username = this.state.txtUsername;
        const password = this.state.txtPassword;
        const name = this.state.txtName;
        const phone = this.state.txtPhone;
        const email = this.state.txtEmail;
        if (username && password && name && phone && email) {
            const account = { username: username, password: password, name: name, phone: phone, email: email };
            this.apiSignup(account);
        } else {
            alert('Please input username and password and name and phone and email');
        }
    }
    // apis
    apiSignup(account) {
        axios.post('/api/customer/signup', account).then((res) => {
            const result = res.data;
            alert(result.message);
        });
    }
}
export default Signup;