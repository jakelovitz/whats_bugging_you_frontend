import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'


const options = [
    {key: 1, text: "Red", value: "red", style: {color: 'red'}},
    {key: 2, text: "Orange", value: "orange", style: {color: 'orange'} },
    {key: 3, text: "Yellow", value: "yellow", style: {color: 'yellow'} },
    {key: 4, text: "Olive", value: "olive", style: {color: 'olive'} },
    {key: 5, text: "Green", value: "green", style: {color: 'green'} },
    {key: 6, text: "Teal", value: "teal", style: {color: 'teal'} },
    {key: 7, text: "Blue", value: "blue", style: {color: 'blue'} },
    {key: 8, text: "Violet", value: "violet", style: {color: 'violet'} },
    {key: 9, text: "Purple", value: "purple", style: {color: 'purple'} },
    {key: 10, text: "Pink", value: "pink", style: {color: 'pink'} },
    {key: 11, text: "Brown", value: "brown", style: {color: 'brown'} },
    {key: 12, text: "Grey", value: "grey", style: {color: 'grey'} },
    {key: 13, text: "Black", value: "black", style: {color: 'black'} }
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
        console.log(this.state)
        return (
            <React.Fragment>
            <h2>Add a new Bug type!</h2>
            <Form onSubmit={(event) => this.handleSubmit(event)}>
                <Form.Field onChange={this.handleChange} value={this.state.complaintType}>
                    <input placeholder='Bug Type' />
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
                <Button type='submit'>Add Bug Type!</Button>
            </Form>
            </React.Fragment>
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