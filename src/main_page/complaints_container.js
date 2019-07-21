import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Grid, Card, Container, Item } from 'semantic-ui-react'
import ComplaintComponent from './complaint_component'
import { arrayExpression } from '@babel/types';

class ComplaintContainer extends Component {

    state = {
      user_complaints: null
    }

    componentDidMount() {
      // debugger
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
            this.setState({ user_complaints: response})
         })
    }

    // handleReactionClick = (event) => {
    //   this.locateComplaint()
    // }

    render() {
        console.log(this.state)

        const UnreactedComplaints = () => (

          //we need to add a check if this.state.user_complaints is null, if so, we want to render a loader

          <Grid columns={3} >
          {this.state.user_complaints.map((complaint) => {
            if (complaint.reactions === null) {

             return <Grid.Row key={complaint.id} width={5}>
                  <ComplaintComponent complaint={complaint} key={complaint.id} handleReactionClick={this.handleReactionClick} />
              </Grid.Row>

            }
          })}
          </ Grid>
        )


        const ComplaintList = () => (
            <Grid columns={3} >
              {this.props.complaints.map((complaint) => (
  
                <Grid.Row key={complaint.id} width={5}>
                  <ComplaintComponent complaint={complaint} key={complaint.id} handleReactionClick={this.handleReactionClick} />
                </Grid.Row>
                
              ))}
            </Grid>
        );

        return (
           
          <React.Fragment>
            <Container >
              <h1>These bugs are waiting for a reaction!</h1>
                  < UnreactedComplaints />
            </Container>
           </React.Fragment>

        )
    }
}

function mapStateToProps(state) {
    return state.currentUser
}
  
function mapDispatchToProps(dispatch){
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComplaintContainer)