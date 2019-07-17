import React, { Component } from 'react';
import { Grid, Container, Button, Form } from 'semantic-ui-react'

class Login extends Component {
    state = {
        username: "",
        password: ""
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = () => {
        fetch("http://localhost:3000/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json",
            },
            body: JSON.stringify(this.state)
        })
        .then(res => res.json())
        .then(response => {
            console.log(response)
        })
    }

    // const SET_LOGIN_PENDING = 'SET_LOGIN_PENDING';
    // const SET_LOGIN_SUCCESS = 'SET_LOGIN_SUCCESS';
    // const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';

    // function setLoginPending(isLoginPending) {
    //     return {
    //         type: SET_LOGIN_PENDING,
    //         isLoginPending
    //     }
    // }

    // function setLoginSuccess(isLoginSuccess) {
    //     return {
    //         type: SET_LOGIN_Success,
    //         isLoginSuccess
    //     }
    // }

    // function setLoginError(isLoginError) {
    //     return {
    //         type: SET_LOGIN_Error,
    //         isLoginError
    //     }
    // }
    render() {

        console.log(this.state)
        return (



            <Container>
                <Grid className="centered">
                    <Form size="large" onSubmit={this.handleSubmit}>
                        <Form.Field>
                            <Form.Input onChange={this.handleChange} name="username" label='Username' placeholder='Username'/>
                        </Form.Field>

                        <Form.Field>
                            <Form.Input onChange={this.handleChange} name="password" label='Password' placeholder='Password'/>
                        </Form.Field>

                        <Button type='submit'>Submit</Button>
                    </Form>
                </Grid>
            </Container>
        )
    }
}

export default Login