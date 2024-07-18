import '@fortawesome/fontawesome-free/css/all.min.css';
import React, { Component } from 'react';
import '../assets/SCSS/FooterComponent.scss';

class FooterComponent extends Component {
  render() {
    return (
      <div className="page-container">
        <div className="main-content"></div>
        <div className="footer-container">
          <div className="contact-list contact-address">
            <h5><span><i className="fas fa-map-marker-alt"></i></span> Địa chỉ</h5>
            <p>10 đường số 3, cư xá Lữ Gia, P.15, Q.11, TP.HCM</p>
            <p>10 đường số 3, cư xá Lữ Gia, P.15, Q.11, TP.HCM</p>
            <p>10 đường số 3, cư xá Lữ Gia, P.15, Q.11, TP.HCM</p>
          </div>
          <div className="contact-list">
            <h5><span><i className="far fa-envelope"></i></span> Nhập email để cập nhật thông tin hàng tuần</h5>
            <div className="email-contact">
              <input className="input-group" placeholder="Email" type="email" />
              <button className="btn btn-primary">Đăng kí</button>
            </div>
          </div>
          <div className="contact-list">
            <h5><span><i className="fas fa-phone"></i></span> Điện Thoại</h5>
            <p>0921.77.77.77 - 0922.77.77.77</p>
            <p>0921.88.88.88 - 0922.88.88.88</p>
          </div>
        </div>
      </div>
    );
  }
}

export default FooterComponent;
