import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'


const options = [
    {key: 1, text: "Red", value: "red", style: {color: 'red'}},
    {key: 2, text: "Orange", value: "orange", style: {color: 'orange'} },
    {key: 3, text: "Olive", value: "olive", style: {color: 'olive'} },
    {key: 4, text: "Green", value: "green", style: {color: 'green'} },
    {key: 5, text: "Teal", value: "teal", style: {color: 'teal'} },
    {key: 6, text: "Blue", value: "blue", style: {color: 'blue'} },
    {key: 7, text: "Violet", value: "violet", style: {color: 'violet'} },
    {key: 8, text: "Purple", value: "purple", style: {color: 'purple'} },
    {key: 9, text: "Pink", value: "pink", style: {color: 'pink'} },
    {key: 10, text: "Brown", value: "brown", style: {color: 'brown'} },
]

class NewComplaintTypeForm extends Component {

    state = {
        userId: this.props.id,
        complaintType: "",
        complaintColor: ""
    }

    handleChange = (event) => { this.setState({ complaintType: event.target.value }) }

    handleDropdown = (_e, { value }) => this.setState({ complaintColor: value });

    handleSubmit = (event) => {
        event.preventDefault()
        // debugger
        fetch("http://localhost:3000/complaint_types/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json",
            },
            body: JSON.stringify(this.state)
        })
        .then(res => res.json())
        .then(response => this.props.addComplaintTypeToUser(response))
        .then(response => this.setState({ complaintType: "", complaintColor: ""}))
    }

    render() {
        // console.log(this.state)
        return (
            <div>
            <h2>Add a new Bug Species!</h2>
            <Form onSubmit={(event) => this.handleSubmit(event)}>
                <Form.Field >
                    <input placeholder='Bug Species' onChange={this.handleChange} value={this.state.complaintType}/>
                </Form.Field>
                <Form.Select 
                    fluid label='Color'
                    placeholder='Select a color'
                    options={options}
                    selection
                    value={this.state.complaintColor}
                    style={{color: options.color}}
                    onChange={this.handleDropdown}
                />
                <Button type='submit' disabled={!this.state.complaintType || !this.state.complaintColor}>Add Bug Type!</Button>
            </Form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state.currentUser
}
  
function mapDispatchToProps(dispatch){
    return {
        addComplaintTypeToUser: (complaintType) => {
            dispatch({type: "ADD_COMPLAINT_TYPE", payload: complaintType})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewComplaintTypeForm)