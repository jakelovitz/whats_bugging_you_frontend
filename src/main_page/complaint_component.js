import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Card, Button, Grid } from 'semantic-ui-react'
import NewReaction from './reaction_form'

class Complaint extends Component {

    state = {
        complaintType: null,
        reactionToggle: false
    }

    setComplaintType = () => {
        return this.props.complaint_types.filter(ct => ct.id === this.props.complaint.complaint_type_id)
    }

    componentDidMount() {
        let type = this.setComplaintType()
        this.setState({ complaintType: type[0]})
    }

    toggleReactionForm = () => {
        this.setState({ reactionToggle: !this.state.reactionToggle})
    }

    render() {

        const reactionToggle = this.state.reactionToggle
        let reactionForm;

        if (reactionToggle) {
            reactionForm = < NewReaction complaint={this.props.complaint}/>
        }
        // console.log(this.state.complaintType)
        if (this.state.complaintType === null) {
            return (
                "loading"
            )
        } else {
            return( 
                <React.Fragment>
                <Card fluid color="red">
                    <Card.Content header={this.state.complaintType.name} />
                    <Card.Content description={this.props.complaint.complaint_text} />
                    <Card.Content >
                        <Button onClick={this.toggleReactionForm}>React</Button>
                        <Button>Edit</Button>
                        <Button>Delete</Button>
                    </Card.Content>
                </Card>
                {reactionForm}
                </React.Fragment>
              
            )
        }
    }
}

function mapStateToProps(state) {
    // console.log(state)
    return state.currentUser
}
  
function mapDispatchToProps(dispatch){
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Complaint)