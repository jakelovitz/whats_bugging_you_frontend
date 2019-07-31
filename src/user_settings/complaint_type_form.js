import React, { Component } from 'react';
import { Button, Form, Card, Modal } from 'semantic-ui-react'
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

class UpdateComplaintTypeForm extends Component {

    state = {
        userId: "",
        complaintTypeName: "",
        complaintTypeColor: "",
        isModalOpen: false
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
        .then(response => this.props.updateComplaintType(response, this.locateIndex()))
        .then(response => alert("Submitted!"))
    }

    handleDelete = (id, userId) => { //this is currently just copied from complaint_component.js, it needs to be redone and handled correctly to delete ALL complaints associated with the complaint type
        fetch(`http://localhost:3000/complaint_types/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id: id, userId: userId})
        })
        .then(res => res.json())
        .then(response => this.props.updateUserComplaints(response))
        .then(response => console.log(response))
        .then(response => this.props.removeComplaintType(this.locateIndex()))//redux method goes here
        .then(response => this.closeModal())
    }

    locateIndex = () => {
        return (this.props.currentUser.complaint_types.indexOf(this.props.complaintType))
    }
    openModal = () => {this.setState({ isModalOpen: true })}

    closeModal = () => {this.setState({ isModalOpen: false})}
      
    render() {
        return (
            <React.Fragment>
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
                        <Button color={this.state.complaintTypeColor} id={this.props.complaintType.id} onClick={() => this.openModal()}>Delete</Button>
                    </Button.Group>
                </Card.Content>
            </Card>
            </Form>
            <Modal
                key={this.props.complaintType.id}
                open={this.state.isModalOpen}
                header="Important!"
                content="Deleting this Bug Type will delete ALL the bugs associated. Are you sure you want to proceed?"
                actions={[
                    <React.Fragment>
                    <Button color="green" onClick={this.closeModal}>No</Button>
                    <Button color="red" onClick={() => this.handleDelete(this.props.complaintType.id, this.props.currentUser.id)}>Yes</Button>
                    </React.Fragment>
                ]}
                onClose={this.handleClose}
            />
            </React.Fragment>
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
        removeComplaintType: (complaintTypeId) => {
            dispatch({type: "REMOVE_COMPLAINT_TYPE", payload: complaintTypeId})
        },
        updateUserComplaints: (response) => {
            dispatch({type: "UPDATE_USER_COMPLAINTS", payload: response})
        },
        updateComplaintType: (response, index) => {
            dispatch({type: "UPDATE_COMPLAINT_TYPE", payload: response, index: index})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateComplaintTypeForm)