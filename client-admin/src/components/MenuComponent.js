import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import image from '../assets/Image/logo_vanlang.png';
import "../assets/SCSS/Menu.scss";
import MyContext from '../contexts/MyContext';
class Menu extends Component {
  static contextType = MyContext; // using this.context to access global state
  render() {
    return (
      <div className="border-bottom">
        <div className="float-left">
          <div className='image'>
            <img src={image} className="logo" alt="Logo" />
          </div>
          <ul className="menu">
            <li className="menu"><Link to='/admin/home'>Home</Link></li>
            <li className="menu"><Link to='/admin/category'>Category</Link></li>
            <li className="menu"><Link to='/admin/product'>Product</Link></li>
            <li className="menu"><Link to='/admin/order'>Order</Link></li>
            <li className="menu"><Link to='/admin/customer'>Customer</Link></li>
          </ul>
        </div>
        <div className="float-right">
          {/* Hello <b>{this.context.username}</b> | */}
          <Link to='/admin/home' onClick={() => this.lnkLogoutClick()}><i class="fa-solid fa-arrow-right-from-bracket"></i></Link>
        </div>
        <div className="float-clear" />
      </div>
    );
  }
  // event-handlers
  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setUsername('');
  }
}
export default Menu;