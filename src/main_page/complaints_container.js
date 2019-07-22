import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Grid, Container, Loader, Dimmer, Segment } from 'semantic-ui-react'
import ComplaintComponent from './complaint_component'

class ComplaintContainer extends Component {

    componentDidMount() {
      fetch("http://localhost:3000/user_complaints", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json",
            },
            body: JSON.stringify({"user_id": this.props.id})
        })
        .then(res => res.json())
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
        console.log(this.props.unreactedUserComplaints)

        const UnreactedComplaints = () => (

          <Grid columns={3} >
          {this.props.unreactedUserComplaints.map((complaint) => {
             return <Grid.Row key={complaint.id} width={5}>
                  <ComplaintComponent complaint={complaint} key={complaint.id} handleReactionClick={this.handleReactionClick} />
              </Grid.Row>
          })}
          </ Grid>
        )

        if (this.props === null) {
            return (
              <Segment>
                <Dimmer active>
                  <Loader />
                </Dimmer>
              </Segment>
            )
        } else {
          return (
            
            <React.Fragment>
              <Container >
                <h1>These bugs are waiting for a reaction!</h1>
                    < UnreactedComplaints />
              </Container>
            </React.Fragment>

          )
    }
}}

function mapStateToProps(state) {
    return {
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