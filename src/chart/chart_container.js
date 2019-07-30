import React, { Component } from 'react';
import Navbar from '../navbar/navbar'
import BarChart from './bar_chart'
import { connect } from 'react-redux'
import withAuth from '../withAuth'
import ChartFilter from './chart_filter'
import { Grid } from 'semantic-ui-react'
import PieChart from './pie_chart'

class ChartContainer extends Component {

    state = {
        selectedComplaintType: this.props.currentUser.complaint_types[0]
    }

    setSelectedComplaintType = (complaintType) => { //sets the state in response to a button click.
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
              this.props.addUserComplaintsFromChartLoad(response)
           })
    }

    render() {
        // console.log('chart container', this.state)
        return (

            <React.Fragment>
                <Navbar />
                <Grid container centered>

                    <Grid.Row><h2>Number of Complaints Per Bug Type</h2></Grid.Row>
                    {(!!this.props.userComplaints.length) && //not sure why the .length is needed, but without it the check does not work correctly. All it does is make sure the userComplaints array is populated
                        <Grid.Row><BarChart currentUser={this.props.currentUser} /></Grid.Row>
                    }

                    <Grid.Row><h2>Reactions By Bug Type</h2></Grid.Row>

                    <Grid.Row><ChartFilter setSelectedComplaintType={this.setSelectedComplaintType}/></Grid.Row>

                    {(!!this.props.userComplaints.length) && 
                        <Grid.Row><PieChart complaintType={this.state.selectedComplaintType} /></Grid.Row>
                    }

                </Grid>
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
      currentUser: state.currentUser,
      userComplaints: state.userComplaints
  }
}
  
function mapDispatchToProps(dispatch){
    return {
        addUserComplaintsFromChartLoad: (userComplaints) => {
            dispatch({type: "ADD_USER_COMPLAINTS_FROM_CHART_LOAD", payload: userComplaints})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(ChartContainer))
