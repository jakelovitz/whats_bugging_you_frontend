import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react'

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
        .then(response => {
            if (response.errors) {
                alert(response.errors)
            } else {
                alert("You're ready to sign in!")
            }
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        if (this.state.password === this.state.confirmPassword) {
            this.createUser()
        } else {
            alert("Your passwords don't match fool")
        }
    }

    render() {
        // console.log(this.state)
        return (
            <div>
            <h1>Sign up!</h1>
            <Form size="large" onSubmit={(event) => this.handleSubmit(event)}>
                <Form.Field>
                    <Form.Input onChange={this.handleChange} name='username' label='Username' placeholder='Username' value={this.state.value}/>
                </Form.Field>

                <Form.Field>
                    <Form.Input onChange={this.handleChange} type='password' name='password' label='Password' placeholder='Password' value={this.state.value}/>
                </Form.Field>

                <Form.Field>
                    <Form.Input onChange={this.handleChange} type='password' name='confirmPassword' label='Confirm Password' placeholder='Re-enter Password' value={this.state.value}/>
                </Form.Field>

                <Form.Field>
                    <Form.Input onChange={this.handleChange} name='phone_number' label='10-Digit Phone Number' placeholder='e.g. 555-555-5555' type='phone number' value={this.state.value}/>
                </Form.Field>

                <Button type='submit'
                    disabled={!this.state.username || !this.state.password || !this.state.confirmPassword || !this.state.phone_number}
                >Submit</Button>
            </Form>
            </div>
        )
    }
}

export default Signup