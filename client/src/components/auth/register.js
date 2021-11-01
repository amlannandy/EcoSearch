import { connect } from "react-redux";
import { Link } from "react-router-dom";
import React, { Component } from "react";

import "./css/index.css";
import { isEmail } from "../../utils/helpers";
import { register } from "../../actions/index";
import { WingBlank, InputItem, Button, WhiteSpace, Toast } from "antd-mobile";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    errors: {
      nameError: null,
      emailError: null,
      passwordError: null,
      confirmPasswordError: null,
      isFormValid: false,
    },
  };

  handleChange = e =>
    this.setState({ [e.target.name]: e.target.value }, this.validateForm);

  validateForm = () => {
    const { name, email, password, confirmPassword } = this.state;
    let nameError = null,
      emailError = null,
      passwordError = null,
      confirmPasswordError = null,
      isFormValid = false;
    if (name.trim().length === 0) {
      nameError = "Please enter your name";
    }
    if (!isEmail(email)) {
      emailError = "Please enter a valid email";
    }
    if (password.trim().length < 6) {
      passwordError = "Please provide a valid password";
    }
    if (password.trim() !== confirmPassword.trim()) {
      confirmPasswordError = "Passwords do not match";
    }
    if (!nameError && !emailError && !passwordError && !confirmPasswordError) {
      isFormValid = true;
    }
    this.setState({
      errors: {
        nameError,
        emailError,
        passwordError,
        confirmPasswordError,
        isFormValid,
      },
    });
  };

  handleRegister = () => {
    const { register } = this.props;
    const { name, email, password } = this.state;
    const postData = { name, email, password };
    register(postData, this.errorCallback);
  };

  errorCallback = error => {
    Toast.fail(error);
  };

  render() {
    const { name, email, password, confirmPassword, errors } = this.state;
    const {
      auth: { authActions },
    } = this.props;

    return (
      <WingBlank>
        <WhiteSpace size='lg' />
        <div className='header'>
          <h1>Register</h1>
          <p>To join this community of wildlife enthusiasts</p>
        </div>
        <WhiteSpace size='lg' />
        <InputItem
          name='name'
          value={name}
          error={errors.nameError}
          placeholder='Enter name'
          onChangeCapture={this.handleChange}
          disabled={authActions.isAuthenticating}
        />
        <WhiteSpace size='sm' />
        <InputItem
          name='email'
          type='email'
          value={email}
          error={errors.emailError}
          placeholder='Enter email address'
          onChangeCapture={this.handleChange}
          disabled={authActions.isAuthenticating}
        />
        <WhiteSpace size='sm' />
        <InputItem
          name='password'
          type='password'
          value={password}
          error={errors.passwordError}
          placeholder='Enter password'
          onChangeCapture={this.handleChange}
          disabled={authActions.isAuthenticating}
        />
        <WhiteSpace size='md' />
        <InputItem
          name='confirmPassword'
          type='password'
          value={confirmPassword}
          error={errors.confirmPasswordError}
          placeholder='Confirm password'
          onChangeCapture={this.handleChange}
          disabled={authActions.isAuthenticating}
        />
        <WhiteSpace size='md' />
        <Button
          type='primary'
          disabled={authActions.isAuthenticating || !errors.isFormValid}
          onClick={this.handleRegister}>
          Register
        </Button>
        <div className='forgot-password-text'>
          <Link to='/forgot-password'>Forgot Password?</Link>
        </div>
      </WingBlank>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    register: (postData, errorCallback) => {
      return dispatch(register(postData, errorCallback));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
