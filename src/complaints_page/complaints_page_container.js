import React, { Component } from 'react';
import { connect } from 'react-redux'
import Navbar from '../navbar/navbar'
import withAuth from '../withAuth'
import { Grid } from 'semantic-ui-react'
import FilterBar from './filter_bar'
import AllComplaintsPage from './all_complaints_page'
import styled from '@emotion/styled'

class ComplaintsPageContainer extends Component {

    state = {
        selectedComplaintType: "showAll"
    }

    setSelectedComplaintType = (complaintType) => {
        this.setState({ selectedComplaintType: complaintType })
    }

    componentDidMount() {
        fetch("http://localhost:3000/user_complaints", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  "Accepts": "application/json",
              },
              body: JSON.stringify({"user_id": this.props.currentUser.id})
          })
          .then(res => res.json())
          .then(response => {
              this.props.addUserComplaints(response)
           })
      }

    render() {
        return(
            <React.Fragment>
            <Navbar />
            <Grid>
                <Grid.Row><FilterBar setSelectedComplaintType={this.setSelectedComplaintType} currentUser={this.props.currentUser} /></Grid.Row>
                <Grid.Row style={{justifyContent: "center"}}><AllComplaintsPage selectedComplaintType={this.state.selectedComplaintType} currentUser={this.props.currentUser} userComplaints={this.props.userComplaints} /></Grid.Row>
            </Grid>
        </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
      currentUser: state.currentUser,
      userComplaints: state.userComplaints,
      unreactedUserComplaints: state.unreactedUserComplaints
  }
}
  
function mapDispatchToProps(dispatch){
    return {
      addUserComplaints: (userComplaints) => {
        dispatch({type: "ADD_ALL_USER_COMPLAINTS", payload: userComplaints})
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(ComplaintsPageContainer))