import React, { Component } from 'react';
import FormValidator from './FormValidator.js';

class Form extends Component {
    constructor(props) {
        super(props);

        this.validator = new FormValidator([
          {
            field: "nickname",
            method: "isEmpty",
            validWhen: false,
            message: "Nickname is required."
          },
          {
            field: "email",
            method: "isEmpty",
            validWhen: false,
            message: "Email is required."
          },
          {
            field: "email",
            method: "isEmail",
            validWhen: true,
            message: "That is not a valid email."
          },
          {
            field: "ip",
            method: "isEmpty",
            validWhen: false,
            message: "IP address is required."
          },
          {
            field: "ip",
            method: "isIP",
            args: [4],
            validWhen: true,
            message: "That is not a valid IP address."
          }
        ]);

        this.state = {
            nickname: '',
            email: '',
            ip: '',
            validation: this.validator.valid()
        }

        this.submitted = false;
    }

    handleInputChange = event => {
        event.preventDefault();

        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleFormSubmit = event => {
        event.preventDefault();

        const validation = this.validator.validate(this.state);
        this.setState({ validation });
        this.submitted = true;

        if (validation.isValid) {
            const tempUser = {
                nickname: this.refs.inputNickname.value.toLowerCase(),
                email: this.refs.inputEmail.value.toLowerCase(),
                ip: this.refs.inputIP.value
            }
            this.props.onAdd(tempUser);
        }
    }

    render() {
        let validation = this.submitted ? this.validator.validate(this.state) :this.state.validation;                 

        return <form className="form" onSubmit>
            <h2 class="section__header">Enter user data</h2>

            <div className={validation.nickname.isInvalid && "has-error"}>
              <label className="form__label" htmlFor="nickname">
                Nickname:
              </label>
              <input type="nickname" className="form__input" name="nickname" onChange={this.handleInputChange} ref="inputNickname" />
              <span className="form__help">
                {validation.nickname.message}
              </span>
            </div>

            <div className={validation.email.isInvalid && "has-error"}>
              <label className="form__label" htmlFor="email">Email address:</label>
              <input type="email" className="form__input" name="email" placeholder="user@email.com" onChange={this.handleInputChange} ref="inputEmail" />
              <span className="form__help">
                {validation.email.message}
              </span>
            </div>

            <div className={validation.ip.isInvalid && "has-error"}>
              <label className="form__label" htmlFor="ip">IP:</label>
              <input type="ip" className="form__input" name="ip" placeholder="x.x.x.x" onChange={this.handleInputChange} ref="inputIP" />
                <span className="form__help">
                {validation.ip.message}
              </span>
            </div>

            <button onClick={this.handleFormSubmit} className="button">
              Add user
            </button>
          </form>;
    }
}
export default Form;