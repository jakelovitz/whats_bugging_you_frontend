import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Grid, Button } from 'semantic-ui-react'
import ComplaintComponent from './complaint_component'

class ComplaintContainer extends Component {

    
    render() {
        console.log(this.props)
        const ComplaintList = () => (
            <Grid colums={3} >
              {this.props.complaints.map((complaint) => ( //sometimes needs to be this.props.user.complaints
                <Grid.Column key={complaint.id} width={5}>
                  <ComplaintComponent complaint={complaint} key={complaint.id} />
                </Grid.Column>
              ))}
            </Grid>
          );


        // console.log(this.props)
        return (
           
            <div>
                < ComplaintList />
           </div>

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