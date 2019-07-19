import React, { Component } from 'react';
import Navbar from '../navbar/navbar'
// import Complaint from './complaint_component'
import { Grid } from 'semantic-ui-react'
import withAuth from '../withAuth'
import NewComplaintForm from './new_complaint_form'
import ComplaintContainer from './complaints_container'

class MainContainer extends Component {

    render() {
        return(
            <React.Fragment>
                <Navbar />
                <Grid>
                    <Grid.Row centered={true}><ComplaintContainer/></Grid.Row>
                    
                    <NewComplaintForm />
                </Grid>
            </React.Fragment>
        )
    }

}

export default withAuth(MainContainer)