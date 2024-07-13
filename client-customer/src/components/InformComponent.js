import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../contexts/MyContext';
import '../assets/SCSS/Inform.scss';

class Inform extends Component {
    static contextType = MyContext; // using this.context to access global state
    render() {
        return (
            <div className="border-bottom">
                <div className="float-left">
                    {this.context.token === '' ?
                        <div><Link to='/login'><i class="fa-solid fa-user"></i>Login</Link> | <Link to='/signup'><i class="fa-solid fa-user-plus"></i>Sign-up</Link> | <Link to='/active'><i class="fa-brands fa-creative-commons-share"></i>Active</Link></div>
                        :
                        <div>Hello <b>{this.context.customer.name}</b> | <Link to='/home' onClick={() => this.lnkLogoutClick()}><i class="fa-solid fa-user-minus"></i>Logout</Link> | <Link to='/myprofile'><i class="fa-solid fa-user"></i>My profile</Link> | <Link to='/myorders'><i class="fa-solid fa-thumbs-up"></i>My orders</Link></div>
                    }
                </div>
                <div className="float-right">
                    <Link to='/mycart'><i class="fa-solid fa-cart-shopping"></i>My cart</Link> have <b>{this.context.mycart.length}</b> items
                </div>
                <div className="float-clear" />
            </div>
        );
    }
    // event-handlers
    lnkLogoutClick() {
        this.context.setToken('');
        this.context.setCustomer(null);
        this.context.setMycart([]);
    }
}
export default Inform;