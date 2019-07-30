import React, { Component } from 'react';
import { Button, Card, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'

const options = [
    {key: 1, text: 1, value: 1 },
    {key: 2, text: 2, value: 2 },
    {key: 3, text: 3, value: 3 },
    {key: 4, text: 4, value: 4 },
    {key: 5, text: 5, value: 5 }
]

class EditForm extends Component {

    state = {
        currentComplaintType: "",
        newComplaintType: "",
        newComplaintText: "",
        newComplaintSeverity: ""
    }

    complaintTypeOptions = () => {
        let i = 1
        let complaintTypes = this.props.currentUser.complaint_types.map((complaintType) => {
            return {key: i++, text: complaintType.name, value: complaintType.id}
        })
        return complaintTypes
    }

    componentDidMount() {
        this.setState({
            currentComplaintType: this.props.complaintType,
            newComplaintType: this.props.complaintType,
            newComplaintText: this.props.complaintText,
            newComplaintSeverity: this.props.complaintSeverity
        })
    }

    locateComplaintType = (id) => {
        let updatedComplaintType = this.props.currentUser.complaint_types.filter(complaintType => {
            if (complaintType.id === id) {
                return complaintType
            }
        })
        return updatedComplaintType
    }

    handleSubmit = (event, id) => {
        // debugger
        event.preventDefault()
        fetch(`http://localhost:3000/complaints/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json",
            },
            body: JSON.stringify(this.state)
        })
        .then(res => res.json())
        // .then(response => console.log(response))
        .then(response => this.props.updatedEditedComplaint(response, this.locateIndex()))
        .then(response => this.props.setTypeAfterEdit())
        .then(response => this.props.toggleEditForm())
    }

    locateIndex = () => {
        return (this.props.unreactedUserComplaints.indexOf(this.props.complaint))
    }

    handleComplaintType = (_e, { value }) => this.setState({ 
        newComplaintType: value,
        currentComplaintType: this.locateComplaintType(value)[0]
    });

    handleSeverity = (_e, { value }) => this.setState({ newComplaintSeverity: value });

    handleChange = (event) => { this.setState({ newComplaintText: event.target.value }) }

    render() {
        return (
            <React.Fragment>
                <Form onSubmit={(event) => this.handleSubmit(event, this.props.complaint.id)}>
                <Card fluid color={this.state.currentComplaintType.color}>
                    <Card.Content header={this.state.currentComplaintType.name}></Card.Content>
                    <Card.Content >
                        <Form.Field>
                            <input label="Bug Info" defaultValue={this.props.complaint.complaint_text} onChange={this.handleChange}/>
                        </Form.Field>
                    
                        <Form.Select   
                            label='Bug Severity' 
                            options={options} 
                            placeholder={this.props.complaint.severity.toString()}
                            selection
                            value={this.state.newComplaintSeverity}
                            onChange={this.handleSeverity}
                        />

                        <Form.Select
                            label='Bug Type'
                            options={this.complaintTypeOptions()}
                            placeholder={this.props.complaintType.name.toString()}
                            selection
                            //removed value={this.state.newComplaintType} because it was causing numerous issues and prevented the placeholder from showing
                            onChange={this.handleComplaintType}
                        />
                    </Card.Content>
                    <Card.Content>
                        <Button onClick={() => this.props.toggleEditForm()} color={this.state.currentComplaintType.color} >Don't Edit</Button>
                        <Button disabled={!this.state.newComplaintType || !this.state.newComplaintSeverity || !this.state.newComplaintSeverity} color={this.state.currentComplaintType.color}>Submit</Button>
                    </Card.Content>
                </Card>
                </Form>
            </React.Fragment>
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
        updatedEditedComplaint: (response, index) =>
            dispatch({type: "UPDATED_EDITED_COMPLAINT", payload: response, index: index})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditForm)