import React, { Component } from 'react';
import { connect } from 'react-redux'
import Navbar from '../navbar/navbar'
import withAuth from '../withAuth'
import FilterBar from './filter_bar'
import AllComplaintsPage from './all_complaints_page'

import styled from '@emotion/styled'

const MyContainer = styled.div`
  display: grid;
  align-items: center;
  
  grid-row-gap: 20px;
`
//NOTE: I removed the specification that created two rows by default. May be necessary to re-implement
class ComplaintsPageContainer extends Component {

    state = {
        selectedComplaintType: "showAll",
        bugSeverity: false,
        bugWorse: false,
        bugBetter: false,
    }

    setSelectedComplaintType = (complaintType) => {
        this.setState({ selectedComplaintType: complaintType })
    }

    toggleBugSeverity = () => {
        if (this.state.bugBetter === true) {
            this.setState({ bugSeverity: true, bugBetter: false})
        } else if (this.state.bugWorse === true) {
            this.setState({ bugSeverity: true, bugWorse: false})
        } else {
            this.setState({ bugSeverity: !this.state.bugSeverity})
        }
    }

    toggleBugWorse = () => {
        if (this.state.bugBetter === true) {
            this.setState({ bugWorse: true, bugBetter: false })
        } else if (this.state.bugSeverity === true) {
            this.setState({ bugWorse: true, bugSeverity: false})
        } else {
            this.setState({ bugWorse: !this.state.bugWorse})
        }
    }
    
    toggleBugBetter = () => {
        if (this.state.bugWorse === true) {
            this.setState({ bugBetter: true, bugWorse: false })
        } else if (this.state.bugSeverity === true) {
            this.setState({ bugBetter: true, bugSeverity: false})
        } {
            this.setState({ bugBetter: !this.state.bugBetter })
        }
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
          .then(response => this.props.addUserComplaints(response))
    }

    render() {
       
        return(
            <React.Fragment>
            <Navbar />

            <MyContainer>
                <FilterBar setSelectedComplaintType={this.setSelectedComplaintType} 
                currentUser={this.props.currentUser}
                toggleBugSeverity={this.toggleBugSeverity}
                toggleBugBetter={this.toggleBugBetter}
                toggleBugWorse={this.toggleBugWorse}
                worseChecked={this.state.bugWorse}
                betterChecked={this.state.bugBetter}
                severityChecked={this.state.bugSeverity}
                 />
                 
                <AllComplaintsPage 
                selectedComplaintType={this.state.selectedComplaintType} 
                currentUser={this.props.currentUser} 
                userComplaints={this.props.userComplaints}
                severityChecked={this.state.bugSeverity}
                worseChecked={this.state.bugWorse}
                betterChecked={this.state.bugBetter}
                />

            </MyContainer>
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