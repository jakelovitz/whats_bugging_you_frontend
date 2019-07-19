import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Card, Button } from 'semantic-ui-react'

class Complaint extends Component {

    render() {
        // console.log(this.props)
        return( 
            <Card>
                <Card.Content header={this.props.complaint.complaint_type_id + this.props.complaint.created_at}/>
                <Card.Content description={this.props.complaint.complaint_text} />
                <Card.Content extra>
                    <Button>React</Button>
                    <Button>Edit</Button>
                    <Button>Delete</Button>
                </Card.Content>
            </Card>
        )
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