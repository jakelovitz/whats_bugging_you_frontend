import React, { Component } from 'react';
import Navbar from '../navbar/navbar'
import withAuth from '../withAuth'
import { Grid } from 'semantic-ui-react'
import FilterBar from './filter_bar'
import AllComplaintsPage from './all_complaints_page'

class ComplaintsPageContainer extends Component {

    state = {
        selectedComplaintType: "showAll"
    }

    setSelectedComplaintType = (complaintType) => {
        this.setState({ selectedComplaintType: complaintType })
    }

    render() {
        console.log(this.state)
        return(
            <React.Fragment>
            <Navbar />
            <Grid>
                <Grid.Row><FilterBar setSelectedComplaintType={this.setSelectedComplaintType} /></Grid.Row>
                <Grid.Row><AllComplaintsPage selectedComplaintType={this.state.selectedComplaintType} /></Grid.Row>
            </Grid>
        </React.Fragment>
        )
    }
}

export default withAuth(ComplaintsPageContainer)