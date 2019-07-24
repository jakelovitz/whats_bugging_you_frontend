import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'
import UpdateComplaintTypeForm from './complaint_type_form'

class UpdateComplaintTypesContainer extends Component {

    render() {
        return(
            <Grid centered={true} columns={2} >
                <Grid.Row><h1>Feel free to update Bug types as well!</h1></Grid.Row>

                {this.props.currentUser.complaint_types.map(function(complaintType) {
                    return <Grid.Column key={complaintType.id}>
                        < UpdateComplaintTypeForm  complaintType={complaintType}/>
                    </Grid.Column>
                })}
                
            </Grid>
        )
    }

}

function mapStateToProps(state) {
   return {currentUser: state.currentUser}
}
  
function mapDispatchToProps(dispatch){
    return {
        updateUserSettings: (user) => {
            dispatch({type: "UPDATE_USER_SETTINGS", payload: user})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateComplaintTypesContainer)