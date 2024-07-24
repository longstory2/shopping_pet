import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import image from '../assets/Image/logo_vanlang.png';
import "../assets/SCSS/Menu.scss";
import MyContext from '../contexts/MyContext';

class Menu extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false
    };
  }

  toggleMenu = () => {
    this.setState(prevState => ({
      menuOpen: !prevState.menuOpen
    }));
  }

  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setUsername('');
  }

  render() {
    return (
      <div className="menu-container border-bottom">
        <div className="left-section">
          <img src={image} className="logo" alt="Logo" />
        </div>
        <div className="menu-wrapper">
          <div id='toggle' onClick={this.toggleMenu}>
            <i className="fa-solid fa-bars"></i>
          </div>
          <nav className={this.state.menuOpen ? 'open' : ''}>
            <ul className="menu">
              <li><Link to='/admin/home'>Home</Link></li>
              <li><Link to='/admin/category'>Category</Link></li>
              <li><Link to='/admin/product'>Product</Link></li>
              <li><Link to='/admin/order'>Order</Link></li>
              <li><Link to='/admin/customer'>Customer</Link></li>
            </ul>
            <div className="right-section">
              <Link to='/admin/home' onClick={() => this.lnkLogoutClick()}>
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

export default Menu;
