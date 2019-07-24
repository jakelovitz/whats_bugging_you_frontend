import React, { Component } from 'react';
import { Card } from 'semantic-ui-react'

class ActualComplaint extends Component {

    state={
        //ONLY FOR CARD INFORMATION
        complaintType: ""
    }

    reactions = () => {
        // console.log("the reactions function is being hit")
        let returnValue
        if (this.props.complaint.reactions.length !== 0) {
            this.props.complaint.reactions.map((reaction) => {
                returnValue = <Card.Content description={reaction.cooldown_thoughts+ ", Post-Reflection Severity: " + reaction.updated_severity}></Card.Content>
            })
        } else {
            returnValue = <Card.Content description={"You haven't reacted to this bug yet!"}></Card.Content>
        }
        return returnValue
    }

    render() {
        // console.log(this.props)
        return(
            <Card color={this.props.complaintType.color}>
                <Card.Content header={this.props.complaintType.name + ", Severity: " + this.props.complaint.severity} />
                <Card.Content description={"Bug: " +  this.props.complaint.complaint_text} />
                {this.reactions()}
            </Card>
        )
    }

}

export default ActualComplaint