import React, { Component } from 'react';
import Navbar from '../navbar/navbar'
import withAuth from '../withAuth'
import { Grid } from 'semantic-ui-react'
import UpdateUserForm from './update_user_form'
import UpdateComplaintTypesContainer from './edit_complaint_types_form_container'

class UserSettingsContainer extends Component {
    render() {
        return(
            <React.Fragment>
                <Navbar />
                <Grid>
                    <Grid.Row centered={true}>< UpdateUserForm /></Grid.Row>
                    
                    <Grid.Row centered={true}>< UpdateComplaintTypesContainer /></Grid.Row>
                </Grid>
            </React.Fragment>
        )
    }
}

export default withAuth(UserSettingsContainer)