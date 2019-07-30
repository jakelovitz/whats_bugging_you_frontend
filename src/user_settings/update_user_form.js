import React, { Component } from 'react';
import { Button, Form, Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'

class UpdateUserForm extends Component {

    state = {
        newUsername: "",
        newPhoneNumber: ""
    }

    componentDidMount() {
        this.setState({
            newUsername: this.props.currentUser.username,
            newPhoneNumber: this.props.currentUser.phone_number
        })
    }

    handleNewName = (event) => { this.setState({ newUsername: event.target.value }) }

    handleNewNumber = (event) => { this.setState({ newPhoneNumber: event.target.value }) }

    handleSubmit = (event, id) => {
        event.preventDefault()
        fetch(`http://localhost:3000/users/${id}`, {
            method: "PATCH",
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
                this.props.updateUserSettings(response)
            }
        })
    }

    render() {
        // console.log(this.state)
        return (
            <Grid centered={true}>
            <Grid.Row><h1>{`Hey ${this.props.currentUser.username}, update your settings here!`}</h1></Grid.Row>
            <Form onSubmit={(event => this.handleSubmit(event, this.props.currentUser.id))}>
                <Grid.Column>
                <Form.Field >
                    <label>New Username</label>
                    <input defaultValue={this.state.newUsername} onChange={this.handleNewName}/>
                </Form.Field>
                </Grid.Column>

                <Grid.Column>
                <Form.Field >
                    <label>New Phone Number</label>
                    <input defaultValue={this.state.newPhoneNumber} onChange={this.handleNewNumber}/>
                </Form.Field>
                </Grid.Column>

                <Button style={{margin: "1%"}} disabled={!this.state.newUsername || !this.state.newPhoneNumber}>Submit</Button>
                
            </Form>
            </Grid>
        )
    }

}

function mapStateToProps(state) {
   return {currentUser: state.currentUser}
}
  
function mapDispatchToProps(dispatch){
    return {
        updateUserSettings: (user) => {
            dispatch({type: "UPDATE_USER_SETTINGS", payload: user})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUserForm)