import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Grid, Button } from 'semantic-ui-react'

class FilterBar extends Component {
    render() {
        return(
            <Grid centered={true} columns={6} >

                <Grid.Row><Button onClick={() => this.props.setSelectedComplaintType("showAll")}>Show all bugs</Button></Grid.Row>
                {this.props.currentUser.complaint_types.map(function(complaintType) {
                    return <Grid.Column key={complaintType.id}>
                        <Button color={complaintType.color} onClick={() => this.props.setSelectedComplaintType(complaintType.name)}>{complaintType.name}</Button>
                    </Grid.Column>
                }, this)}
            </Grid>
        )
    }
}

function mapStateToProps(state) {
    return {
       currentUser: state.currentUser,
       userComplaints: state.userComplaints
    }
}
  
function mapDispatchToProps(dispatch){
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterBar)