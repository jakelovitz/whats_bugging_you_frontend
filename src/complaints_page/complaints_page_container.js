import React, { Component } from 'react';
import Navbar from '../navbar/navbar'
import withAuth from '../withAuth'
import { Grid } from 'semantic-ui-react'
import FilterBar from './filter_bar'
import AllComplaintsPage from './all_complaints_page'

class ComplaintsPageContainer extends Component {

    state = {
        //everything from all_complaints_page and filter_bar goes here
    }

    render() {
        return(
            <React.Fragment>
            <Navbar />
            <Grid>
                <Grid.Row><FilterBar /></Grid.Row>
                <Grid.Row><AllComplaintsPage /></Grid.Row>
            </Grid>
        </React.Fragment>
        )
    }
}

export default withAuth(ComplaintsPageContainer)