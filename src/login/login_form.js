import React, { Component } from 'react';
import { Grid, Container, Button, Form } from 'semantic-ui-react'
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
            console.log(response)
            if (response.errors) {
                alert(response.errors)
            } else {
                //REDUX
                this.props.logInUser(response)
                console.log("POST-SIGNIN PROPS", this.props.currentUser)
                //REDIRECT
            }
        })
    }

    render() {

        console.log(this.state)
        console.log("STORE PROPS", this.props)

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
function mapStateToProps(state) {
    return state
}

function mapDispatchToProps(dispatch){
    return {
        logInUser: (user) => {
            dispatch({type: "LOG_IN", payload: user})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);