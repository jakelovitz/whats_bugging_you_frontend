import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import ActualComplaint from './actual_complaint'

class AllComplaintsPage extends Component {


    setComplaintType = (complaint) => {
        let type = this.props.currentUser.complaint_types.filter(ct => ct.id === complaint.complaint_type_id)
        return type[0]
    }

    render() {
        // console.log("USER COMPLAINTS", this.props.userComplaints)
        return(
            <Grid centered={true} columns={6} >
                
                {this.props.userComplaints.map(function(complaint) { //add an IF statement to check for selected type and filter bugs according. - if ()
                    if (this.props.selectedComplaintType === "showAll") {
                        return <Grid.Column key={complaint.id}>
                            < ActualComplaint complaint={complaint} complaintType={this.setComplaintType(complaint)} />
                        </Grid.Column>
                    } else if ((this.setComplaintType(complaint).name === this.props.selectedComplaintType)) {
                        return <Grid.Column key={complaint.id}>
                            < ActualComplaint complaint={complaint} complaintType={this.setComplaintType(complaint)} />
                        </Grid.Column>
                    }

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

export default connect(mapStateToProps, mapDispatchToProps)(AllComplaintsPage)