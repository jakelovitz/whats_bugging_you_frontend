import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
//still need to import whatever I need to get Redux working

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
            // console.log(response)
            if (response.errors) {
                alert(response.errors)
            } else {
                console.log("THIS GUY JUST LOGGED IN", response)
                this.props.logInUser(response)
                localStorage.setItem("user_id", response.id)
                console.log("POST-SIGNIN PROPS", this.props.currentUser)
                //REDIRECT
            }
        })
    }

    render() {
        // console.log(this.state)
        // console.log("STORE PROPS", this.props)
        return (   
            <div>
            <h1>Log In!</h1>         
            <Form size="large" onSubmit={this.handleSubmit}>
                <Form.Field>
                    <Form.Input onChange={this.handleChange} name="username" label='Username' placeholder='Username'/>
                </Form.Field>

                <Form.Field>
                    <Form.Input onChange={this.handleChange} type='password' name="password" label='Password' placeholder='Password'/>
                </Form.Field>

                <Button type='submit'>Submit</Button>
            </Form>
            </div>
        )
    }

    
}
function mapStateToProps(state) {
    return state
}

function mapDispatchToProps(dispatch){
    console.log('hitting the dispatch in login_form')
    return {
        logInUser: (user) => {
            dispatch({type: "LOG_IN", payload: user})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);