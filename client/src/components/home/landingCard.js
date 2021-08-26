import React, { Component } from 'react';
import { Card, Icon } from 'antd-mobile';

import './css/landingCard.css';
import Logo from '../../static/logo.png';

class LandingCard extends Component {
  render() {
    return (
      <div className='card-container'>
        <Card>
          <Card.Body>
            <div className='card-inner-container'>
              <img src={Logo} alt='logo' />
              <div>
                <p>Welcome to EcoSearch</p>
                <small>Login to upload your pictures</small>
              </div>
              <Icon type='up' size='lg' />
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default LandingCard;
