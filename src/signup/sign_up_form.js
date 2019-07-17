import React, { Component } from 'react';
import { Grid, Container, Button, Form } from 'semantic-ui-react'

class Signup extends Component {

    state = {
        username: "",
        password: "",
        confirmPassword: "",
        phone_number: ""
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    createUser = () => {
        fetch("http://localhost:3000/users/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json",
            },
            body: JSON.stringify(this.state)
        })
        .then(res => res.json())
        .then(data => console.log(data))
    }

    handleSubmit = (event) => {
        // event.preventDefault()
        if (this.state.password === this.state.confirmPassword) {
            this.createUser()
        } else {
            alert("Your passwords don't match fool")
        }
    }

    render() {
        console.log(this.state)
        return (
            <Container>
                <Grid className="centered">
                    <Form size="large" onSubmit={(event) => this.handleSubmit(event)}>
                        <Form.Field>
                            <Form.Input onChange={this.handleChange} name='username' label='Username' placeholder='Username'/>
                        </Form.Field>

                        <Form.Field>
                            <Form.Input onChange={this.handleChange} name='password' label='Password' placeholder='Password'/>
                        </Form.Field>

                        <Form.Field>
                            <Form.Input onChange={this.handleChange} name='confirmPassword' label='Confirm Password' placeholder='Re-enter Password'/>
                        </Form.Field>

                        <Form.Field>
                            <Form.Input onChange={this.handleChange} name='phone_number' label='10-Digit Phone Number' placeholder='e.g. 555-555-5555' type='phone number'/>
                        </Form.Field>

                        <Button type='submit'>Submit</Button>
                    </Form>
                </Grid>
            </Container>
        )
    }
}

export default Signup