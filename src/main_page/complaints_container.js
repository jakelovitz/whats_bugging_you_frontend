import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Grid, Container, Loader, Dimmer, Segment } from 'semantic-ui-react'
import ComplaintComponent from './complaint_component'
import styled from '@emotion/styled'

const MyContainer = styled.div`
  display: grid;
  grid-template-rows: stretch stretch;
  width: 80%;
  grid-row-gap: 3%;
`

class ComplaintContainer extends Component {

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
            this.props.addUserComplaints(response, this.filterUnreactedComplaints(response))
         })
    }

    filterUnreactedComplaints = (userComplaints) => {
      let unreactedUserComplaints = []
      
        userComplaints.map((complaint) => {
          if (complaint.reactions === undefined || complaint.reactions.length === 0) {
            unreactedUserComplaints.push(complaint)
          }
        })


      return unreactedUserComplaints
    }

    render() {
        // console.log("USER COMPLAINTS", this.props.userComplaints)
        // console.log("UNREACTED USER COMPLAINTS",this.props.unreactedUserComplaints)

        if (this.props.unreactedUserComplaints === null) {
            return (
              <Segment>
                <Dimmer active>
                  <Loader />
                </Dimmer>
              </Segment>
            )
        } else {
          return (
            
            
              
                <MyContainer >
                <h1>{ this.props.unreactedUserComplaints.length === 0 ? "You have no Bugs waiting for a reaction. Want to add some more?" : "These Bugs are waiting for a reaction!"}</h1>
                  {this.props.unreactedUserComplaints.map((complaint) => {
                    return <ComplaintComponent key={complaint.id} complaint={complaint} handleReactionClick={this.handleReactionClick} />
                  })}

                </ MyContainer>
            
            

          )
    }
}}

function mapStateToProps(state) {
    return {
      currentUser: state.currentUser,
      userComplaints: state.userComplaints,
      unreactedUserComplaints: state.unreactedUserComplaints
  }
}
  
function mapDispatchToProps(dispatch){
    return {
      addUserComplaints: (userComplaints, unreactedUserComplaints) => {
        dispatch({type: "ADD_USER_COMPLAINTS", payload: {
          one: userComplaints,
          two: unreactedUserComplaints
        }})
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComplaintContainer)