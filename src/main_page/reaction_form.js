import React, { Component } from 'react';
import { Button, Form, Container } from 'semantic-ui-react'
import { connect } from 'react-redux'

const options = [
    {key: 0, text: 0, value: 0 },
    {key: 1, text: 1, value: 1 },
    {key: 2, text: 2, value: 2 },
    {key: 3, text: 3, value: 3 },
    {key: 4, text: 4, value: 4 },
    {key: 5, text: 5, value: 5 }
]

class NewReaction extends Component {

    state = {
        reactionToggle: false,
        complaintId: this.props.complaint.id,
        userId: this.props.currentUser.id,
        reactionText: null,
        reactionSeverity: 0
    }

    handleSeverity = (_e, { value }) => this.setState({ reactionSeverity: value })

    handleChange = (event) => {
        this.setState({
            reactionText: event.target.value
        })
    }

    handleSubmit = (event) => {
        // debugger
        event.preventDefault()
        fetch("http://localhost:3000/reactions", {
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
            this.props.addResponse(this.locateIndex())
         })
    }

    locateIndex = () => {
        return (this.props.unreactedUserComplaints.indexOf(this.props.complaint))
    }

    render() {
        // console.log("does this go twice?")
        return(
            <Container>
                <Form>
                    <Form.TextArea onChange={this.handleChange} placeholder="Tell us how you feel about this bug now!" />
                    <Form.Select 
                        fluid label='Severity in Hindsight' 
                        options={options} 
                        placeholder='Select New Severity'
                        selection
                        value={options.value}
                        onChange={this.handleSeverity}
                    />
                <Button type='submit' onClick={event => this.handleSubmit(event)}>Submit Reaction</Button>
                </Form>
            </Container>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        unreactedUserComplaints: state.unreactedUserComplaints
    }
}
  
function mapDispatchToProps(dispatch){
    return {
        addResponse: (response) => {
            dispatch({type: "ADD_RESPONSE", payload: response})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewReaction)