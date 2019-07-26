import React, { Component } from 'react';
import { connect } from 'react-redux'
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

    componentDidMount() {
        // console.log("COM PLAINTS CONTAINER COMPONENT DID MOUNT", this.props)
        fetch("http://localhost:3000/user_complaints", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  "Accepts": "application/json",
              },
              body: JSON.stringify({"user_id": this.props.currentUser.id})
          })
          .then(res => res.json())
          // .then(response => console.log("USER_COMPLAINTS FETCH RESPONSE", response))
          .then(response => {
              this.props.addUserComplaints(response)
           })
      }

    render() {
        // console.log(this.state)
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