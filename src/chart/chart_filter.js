import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Grid, Button } from 'semantic-ui-react'

class ChartFilter extends Component {
    render() {
        return(
            <Grid centered={true} rows={1} >
                {this.props.currentUser.complaint_types.map(function(complaintType) {
                    return <Button key={complaintType.id} color={complaintType.color} onClick={() => this.props.setSelectedComplaintType(complaintType)}>{complaintType.name}</Button>
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

export default connect(mapStateToProps)(ChartFilter)