import axios from 'axios';
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import MyContext from '../contexts/MyContext';

class Myprofile extends Component {
    static contextType = MyContext; // using this.context to access global state
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
        if (this.context.token === '') return (<Navigate replace to='/login' />);
        return (
            <div className="align-center">
                <h2 className="text-center">MY PROFILE</h2>
                <form>
                    <table className="align-center">
                        <tbody>
                            <div class="form-floating">
                                <input class="form-control" id="floatingInput" placeholder="Username" type="text" value={this.state.txtUsername} onChange={(e) => { this.setState({ txtUsername: e.target.value }) }} />
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
                            <div className='btn'>
                                <input class="btn btn-primary active" type="submit" value="UPDATE" onClick={(e) => this.btnUpdateClick(e)} />
                            </div>
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
    componentDidMount() {
        if (this.context.customer) {
            this.setState({
                txtUsername: this.context.customer.username,
                txtPassword: this.context.customer.password,
                txtName: this.context.customer.name,
                txtPhone: this.context.customer.phone,
                txtEmail: this.context.customer.email
            });
        }
    }
    // event-handlers
    btnUpdateClick(e) {
        e.preventDefault();
        const username = this.state.txtUsername;
        const password = this.state.txtPassword;
        const name = this.state.txtName;
        const phone = this.state.txtPhone;
        const email = this.state.txtEmail;
        if (username && password && name && phone && email) {
            const customer = { username: username, password: password, name: name, phone: phone, email: email };
            this.apiPutCustomer(this.context.customer._id, customer);
        } else {
            alert('Please input username and password and name and phone and email');
        }
    }
    // apis
    apiPutCustomer(id, customer) {
        const config = { headers: { 'x-access-token': this.context.token } };
        axios.put('/api/customer/customers/' + id, customer, config).then((res) => {
            const result = res.data;
            if (result) {
                alert('OK BABY!');
                this.context.setCustomer(result);
            } else {
                alert('SORRY BABY!');
            }
        });
    }
}
export default Myprofile;