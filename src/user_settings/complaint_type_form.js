import React, { Component } from 'react';
import { Button, Form, Card } from 'semantic-ui-react'
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

class UpdateComplaintTypeForm extends Component {

    state = {
        userId: "",
        complaintTypeName: "",
        complaintTypeColor: ""
    }

    componentDidMount() {
        this.setState({
            userId: this.props.currentUser.id,
            complaintTypeName: this.props.complaintType.name,
            complaintTypeColor: this.props.complaintType.color
        })
    }

    handleChange = (event) => { this.setState({ complaintTypeName: event.target.value }) }

    handleDropdown = (_e, { value }) => this.setState({ 
        complaintTypeColor: value
    });

    handleSubmit = (event, id) => {
        // debugger
        event.preventDefault()
        fetch(`http://localhost:3000/complaint_types/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json",
            },
            body: JSON.stringify(this.state)
        })
        .then(res => res.json())
        // .then(response => console.log(response))
        .then(response => alert("Submitted!"))
        // .then(response => this.props.setTypeAfterEdit())
        // .then(response => this.props.toggleEditForm())
    }

    render() {
        return (
            <Form >
            <Card centered={true} color={this.state.complaintTypeColor}>
                <Card.Content >
                    <Form.Field>
                        <label>Update Bug Type Name</label>
                        <input defaultValue={this.state.complaintTypeName} onChange={this.handleChange}></input>
                    </Form.Field>

                    <Form.Select 
                    fluid label='Update Bug Type Color'
                    placeholder='Select a color'
                    options={options}
                    selection
                    defaultValue={this.props.complaintType.color}
                    style={{color: options.color}}
                    onChange={this.handleDropdown}
                />
                </Card.Content>

                <Card.Content>
                    <Button.Group>
                        <Button type='submit' color={this.state.complaintTypeColor} onClick={(event) => this.handleSubmit(event, this.props.complaintType.id)}>Submit</Button>
                        <Button color={this.state.complaintTypeColor}>Disable</Button>
                        <Button color={this.state.complaintTypeColor}>Delete</Button>
                    </Button.Group>
                </Card.Content>
            </Card>
            </Form>
        )
    }
    
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser
    }
}
  
function mapDispatchToProps(dispatch){
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateComplaintTypeForm)