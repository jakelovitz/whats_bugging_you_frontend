import React, { Component } from 'react';
import Navbar from '../navbar/navbar'
import Complaint from './complaint_component'
import { Grid } from 'semantic-ui-react'
import withAuth from '../withAuth'
import NewComplaintForm from './new_complaint_form'

class MainContainer extends Component {

    // componentDidMount() {
    //     fetch()
    // }

    render() {
        return(
            <React.Fragment>
                <Navbar />
                <Grid>
                    <Grid.Row centered={true}><Complaint/></Grid.Row>
                    
                    <NewComplaintForm />
                </Grid>
            </React.Fragment>
        )
    }

}

export default withAuth(MainContainer)