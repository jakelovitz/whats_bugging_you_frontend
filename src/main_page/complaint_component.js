import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Card, Button } from 'semantic-ui-react'
import NewReaction from './reaction_form'

class Complaint extends Component {

    state = {
        complaintType: null,
        reactionToggle: false
    }

    setComplaintType = () => {
        return this.props.currentUser.complaint_types.filter(ct => ct.id === this.props.complaint.complaint_type_id)
    }

    componentDidMount() {
        let type = this.setComplaintType()
        this.setState({ complaintType: type[0]})
    }

    toggleReactionForm = () => {
        this.setState({ reactionToggle: !this.state.reactionToggle})
    }

    handleDelete = (id) => {
        fetch(`http://localhost:3000/complaints/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.props.complaint)
        })
        .then(res => res.json())
        .then(response => this.props.removeUnreactedComplaint(this.locateIndex()))
    }

    locateIndex = () => {
        return (this.props.unreactedUserComplaints.indexOf(this.props.complaint))
    }

    render() {
        const reactionToggle = this.state.reactionToggle
        let reactionForm;

        if (reactionToggle) {
            reactionForm = < NewReaction complaint={this.props.complaint}/>
        }
        if (this.state.complaintType === undefined || this.state.complaintType === null) {
            return (
                "loading"
            )
        } else {
            return( 
                <React.Fragment>
                <Card fluid color={this.state.complaintType.color}>
                    <Card.Content header={this.state.complaintType.name} />
                    <Card.Content description={this.props.complaint.complaint_text} />
                    <Card.Content >
                        <Button onClick={this.toggleReactionForm} color={this.state.complaintType.color}>React</Button>
                        <Button color={this.state.complaintType.color}>Edit</Button>
                        <Button onClick={() => this.handleDelete(this.props.complaint.id)}color={this.state.complaintType.color}>Delete</Button>
                    </Card.Content>
                </Card>
                {reactionForm}
                </React.Fragment>
            )
        }
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
        removeUnreactedComplaint: (complaint_id) => {
            dispatch({type: "REMOVE_UNREACTED_COMPLAINT", payload: complaint_id})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Complaint)