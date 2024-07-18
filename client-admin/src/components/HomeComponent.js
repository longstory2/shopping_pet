import React, { Component } from 'react';
import '../assets/SCSS/home1.scss';

import Cat1 from '../assets/Image/cat1.jpg';
import Cat2 from '../assets/Image/Cat2.jpg';
import Cat3 from '../assets/Image/cat3.jpg';
import Cat4 from '../assets/Image/cat4.jpg';
import Cat5 from '../assets/Image/cat5.jpg';
import Cat6 from '../assets/Image/cat6.jpg';
import Cat7 from '../assets/Image/cat7.jpg';
import Dog1 from '../assets/Image/dog1.jpg';
import Dog2 from '../assets/Image/dog2.jpg';
import Dog3 from '../assets/Image/dog3.jpg';
import Dog4 from '../assets/Image/dog4.jpg';
import Dog5 from '../assets/Image/dog5.jpg';
import Dog6 from '../assets/Image/dog6.jpg';
import Dog7 from '../assets/Image/dog7.jpg';
import FooterComponent from './FooterComponent';

const images = [
  Cat1, Dog1, Cat2, Dog2, Cat3, Dog3, Cat4, Dog4, Cat5, Dog5, Cat6, Dog6, Cat7, Dog7,
];

class Home extends Component {
  render() {
    return (
      <div className="home-container">
        <div className="img-container">
          <img
            src="https://monspet.com/wp-content/uploads/2019/07/uploads2Fcard2Fimage2F4581502F31d70745-4fbb-4630-a27d-cc0591c780b7.jpg2F950x534__filters3Aquality288029-768x432.jpg"
            alt="Welcome Image"
            className="welcome-image"
          />
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index + 1}`}
              className="welcome-image"
            />
          ))}
        </div>
        <FooterComponent />
      </div>
    );
  }
}

export default Home;
