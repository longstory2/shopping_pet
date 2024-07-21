import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';
import 'bootstrap/dist/css/bootstrap.min.css';
import image from '../assets/Image/logo_vanlang.png';
import '../assets/SCSS/Menu.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';

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
            <div className="border-bottom">
                <div className="float-left 1">
                    <img src={image} className="logo" alt="Logo" />
                    <ul className="menu">
                        <li className="menu"><Link to='/'>Home</Link></li>
                        {cates}
                    </ul>
                </div>
                <div className="float-right">
                    <div className="search">
                        <div class="form-floating">
                            <input class="form-control-sm" type="search" placeholder="Enter keyword" value={this.state.txtKeyword} onChange={(e) => { this.setState({ txtKeyword: e.target.value }) }} />
                            <input type="submit" id="btn" class="btn btn-primary" value="SEARCH" onClick={(e) => this.btnSearchClick(e)} />
                        </div>
                    </div>
                </div>
                <div className="float-clear" />
            </div>
        );
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