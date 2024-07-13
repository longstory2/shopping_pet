import React, { Component } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import MyContext from '../contexts/MyContext';
import Category from './CategoryComponent';
import Customer from './CustomerComponent';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Order from './OrderComponent';
import Product from './ProductComponent';
class Main extends Component {
  static contextType = MyContext; // using this.context to access global state

  render() {
    if (this.context.token !== '') {
      return (
        <div className="body-admin">
          <Menu />
          <Routes>
            <Route path='/admin' element={<Navigate replace to='/admin/home' />} />
            <Route path='/admin/home' element={<Home />} />
            <Route path='/admin/category' element={<Category />} />
            <Route path='/admin/product' element={<Product />} />
            <Route path='/admin/order' element={<Order />} />
            <Route path='/admin/customer' element={<Customer />} />
          </Routes>
        </div>
      );
    }
    return (<div />);
  }
}

export default Main;
