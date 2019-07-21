import React, { Component } from 'react'
import firebase from '../../firebase';


import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


class Login extends Component {
    state = {
        email: '',
        password: '',
        errors: [],
        loading: false,

    };

    displayErrors = errors => errors.map((error, i) => <p key={i}>{error.message}</p>);

    handleChange = event => {
        const e = event.target;
        this.setState({ [e.name]: e.value })
        

    }

    handleSubmit = event => {
        event.preventDefault();
        if(this.isFormValid(this.state)) {
            this.setState({ errors: [], loading: true })
            firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(signedInUser => {
                console.log(signedInUser);
            })
            .catch(err => {
                console.error(err);
                this.setState({
                    errors: this.state.errors.concat(err),
                    loading: false
                })
            })
        }
    };

    isFormValid = ({ email, password }) => email && password;

    handleInputError = (errors, inputName) => {
        return errors.some(error =>
            error.message.toLowerCase().includes(inputName)
        )
            ? 'error'
            :''
    }

    render() {
        const { email, password, errors, loading } = this.state;
        return(
            <Grid textAlign="center" verticalAlign="middle" className="app">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h1" icon color="red" textAlign="center">
                        <Icon name="comments" color="red" />
                        Login for Chat In
                    </Header>
                    <Form onSubmit={this.handleSubmit} size="large">
                        <Segment stacked>

                            <Form.Input
                            fluid
                            name="email"
                            icon="mail"
                            iconPosition="left"
                            placeholder="Email"
                            onChange={this.handleChange}
                            type="text"
                            className={this.handleInputError(errors, 'email')}
                            value={email}
                            />

                            <Form.Input
                            fluid
                            name="password"
                            icon="lock"
                            iconPosition="left"
                            placeholder="Password"
                            onChange={this.handleChange}
                            type="password"
                            className={this.handleInputError(errors, 'password')}
                            value={password}
                            />

                            <Button
                            disabled={loading}
                            className={loading ? 'loading' : ''}
                            color="red"
                            fluid
                            size="large">
                                Submit
                            </Button>
                        </Segment>
                    </Form>
                    {errors.length > 0 && (
                        <Message error>
                            <h5>Error</h5>
                            {this.displayErrors(errors)}
                        </Message>
                    )}
                    <Message>Don't have an account ? <Link to="/register">Register</Link></Message>
                </Grid.Column>
            </Grid>
        )
    }
}


export default Login;