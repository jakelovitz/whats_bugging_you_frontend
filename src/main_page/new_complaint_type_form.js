import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'


const options = [
    {key: 1, text: "Red", value: "#B03060", style: {color: '#B03060'}},
    {key: 2, text: "Orange", value: "#FE9A76", style: {color: '#FE9A76'} },
    {key: 3, text: "Yellow", value: "#FFD700", style: {color: '#FFD700'} },
    {key: 4, text: "Olive", value: "#32CD32", style: {color: '#32CD32'} },
    {key: 5, text: "Green", value: "#016936", style: {color: '#016936'} },
    {key: 6, text: "Teal", value: "#008080", style: {color: '#008080'} },
    {key: 7, text: "Blue", value: "#0E6EB8", style: {color: '#0E6EB8'} },
    {key: 8, text: "Violet", value: "#EE82EE", style: {color: '#EE82EE'} },
    {key: 9, text: "Purple", value: "#B413EC", style: {color: '#B413EC'} },
    {key: 10, text: "Pink", value: "#FF1493", style: {color: '#FF1493'} },
    {key: 11, text: "Brown", value: "#A52A2A", style: {color: '#A52A2A'} },
    {key: 12, text: "Grey", value: "#A0A0A0", style: {color: '#A0A0A0'} },
    {key: 13, text: "Black", value: "#000000", style: {color: '#000000'} }
]

class NewComplaintTypeForm extends Component {

    state = {
        userId: this.props.id,
        complaintType: null,
        complaintColor: null
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
    }

    render() {
        // console.log(this.props)
        return (
            <React.Fragment>
            <h2>Add a new Bug type!</h2>
            <Form onSubmit={(event) => this.handleSubmit(event)}>
                <Form.Field onChange={this.handleChange}>
                    {/* <label>Complaint Type</label> */}
                    <input placeholder='Bug Type' />
                </Form.Field>
                <Form.Select 
                    fluid label='Color'
                    placeholder='Select a color'
                    options={options}
                    selection
                    value={options.value}
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
            // console.log("hey dana")
            dispatch({type: "ADD_COMPLAINT_TYPE", payload: complaintType})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewComplaintTypeForm)