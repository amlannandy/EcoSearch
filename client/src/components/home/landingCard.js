import { Card } from "antd-mobile";
import { connect } from "react-redux";
import React, { Component } from "react";
import { FaUserPlus, FaCamera } from "react-icons/fa";

import "./css/landingCard.css";
import Logo from "../../static/logo.png";

class LandingCard extends Component {
  render() {
    const {
      history,
      auth: { authActions, user },
    } = this.props;

    return (
      <div className='card-container'>
        <Card>
          <Card.Body>
            <div className='card-inner-container'>
              {authActions.isAuthenticated && user ? (
                <img className='user-avatar' src={user.imageUrl} alt='logo' />
              ) : (
                <img src={Logo} alt='logo' />
              )}
              {authActions.isAuthenticated && user ? (
                <div className='inner-text'>
                  <p>Hello, {user.name}</p>
                  <small>Upload a wildlife picture now!</small>
                </div>
              ) : (
                <div className='inner-text'>
                  <p>Welcome to EcoSearch</p>
                  <small>Login to upload your pictures</small>
                </div>
              )}
              <div>
                {authActions.isAuthenticated && user ? (
                  <FaCamera
                    className='gray-icon'
                    size={40}
                    onClick={() => history.push("/records")}
                  />
                ) : (
                  <FaUserPlus
                    className='gray-icon'
                    size={40}
                    onClick={() => history.push("/auth")}
                  />
                )}
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(LandingCard);
