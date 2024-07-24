import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';
import 'bootstrap/dist/css/bootstrap.min.css';
import image from '../assets/Image/logo_vanlang.png';
import '../assets/SCSS/Menu.scss';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            txtKeyword: ''
        };
    }
    render() {
        const cates = this.state.categories.map((item) => {
            return (
                <li key={item._id} className="menu"><Link to={'/product/category/' + item._id}>{item.name}</Link></li>
            );
        });
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
                            <li><Link to='/'>Home</Link></li>
                            {cates}
                        </ul>
                    </nav>
                </div>

                <div className="right-section">
                    <div class="form-floating">
                        <input class="form-control-sm" type="search" placeholder="Enter keyword" value={this.state.txtKeyword} onChange={(e) => { this.setState({ txtKeyword: e.target.value }) }} />
                        <input type="submit" id="btn" class="btn btn-primary" value="SEARCH" onClick={(e) => this.btnSearchClick(e)} />
                    </div>
                </div>
                <div className="float-clear" />
            </div>
        );
    }
    toggleMenu = () => {
        this.setState(prevState => ({
            menuOpen: !prevState.menuOpen
        }));
    }
    componentDidMount() {
        this.apiGetCategories();
    }
    // apis
    btnSearchClick(e) {
        e.preventDefault();
        this.props.navigate('/product/search/' + this.state.txtKeyword);
    }
    apiGetCategories() {
        axios.get('/api/customer/categories').then((res) => {
            const result = res.data;
            this.setState({ categories: result });
        });
    }
}
export default withRouter(Menu);