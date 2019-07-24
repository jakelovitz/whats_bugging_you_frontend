import React, { Component } from 'react';
import { Grid, Card } from 'semantic-ui-react'

class ActualComplaint extends Component {

    state={
        //ONLY FOR CARD INFORMATION
        complaintType: ""
    }


    // setComplaintType = () => {
    //     return this.props.currentUser.complaint_types.filter(ct => ct.id === this.props.complaint.complaint_type_id)
    // }

    // componentDidMount() {
    //     let type = this.setComplaintType()
    //     this.setState({ complaintType: type[0]})
    // }

    render() {
        return(
            <Card>
                <Card.Content header={this.props.complaintType.name + ", Severity: " + this.props.complaint.severity} />
                <Card.Content description={this.props.complaint.text} />
            </Card>
        )
    }

}

export default ActualComplaint