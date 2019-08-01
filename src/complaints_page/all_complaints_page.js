import React, { Component } from 'react';
import ActualComplaint from './actual_complaint'
import styled from '@emotion/styled'
import { connect } from 'react-redux'


const MyContainer = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  margin-right: 12%;
  margin-left: 12%;
`

const MyBox = styled.div`
  align-self: stretch;
`
class AllComplaintsPage extends Component {

    state = {
        complaintsToDisplay: []
    }

    componentDidMount() {
        this.setState({ complaintsToDisplay: this.props.userComplaints})
    }

    setComplaintType = (complaint) => {
        let type = this.props.currentUser.complaint_types.filter(ct => ct.id === complaint.complaint_type_id)
        return type[0]
    }
    filterUserComplaints = (userComplaints) => {
        let returnArray = userComplaints.filter(function(complaint) {
            if (this.setComplaintType(complaint).name === this.props.selectedComplaintType) {
                return complaint
            } else if (this.props.selectedComplaintType === "showAll") {
                return complaint
            }
         }, this)
         return returnArray
     }
    
     orderUserComplaints = (givenArray) => { 
        return givenArray.sort((a, b) => parseFloat(b.severity) - parseFloat(a.severity));
    }

    filterBugWorse = (userComplaints) => {
        let returnArray = userComplaints.filter(function(complaint) {
            if (complaint.reactions[0] && complaint.severity < complaint.reactions[0].updated_severity) {
                return complaint
            }
        })
        return returnArray
    }

    filterBugBetter = (userComplaints) => {
        let returnArray = userComplaints.filter(function(complaint) {
            if (complaint.reactions[0] && complaint.severity > complaint.reactions[0].updated_severity) {
                return complaint
            }
        })
        return returnArray
    }

    componentDidUpdate(prevProps) {

        //ORDER BY SEVERITY CHECKS

        //Check to see if we should order by severity AND FILTER by complaintType
        if (this.props.severityChecked !== prevProps.severityChecked && this.props.severityChecked && this.props.selectedComplaintType !== "showAll") {
            let filterComplaints = this.filterUserComplaints(this.props.userComplaints)
            let orderComplaints = this.orderUserComplaints(filterComplaints)
            this.setState({ complaintsToDisplay: orderComplaints})
        //Check to see if we should order by Severity
        } else if (this.props.severityChecked !== prevProps.severityChecked && this.props.severityChecked) {
            let orderComplaints = this.orderUserComplaints(this.props.userComplaints)
            this.setState({ complaintsToDisplay: orderComplaints})
        //Check to see if we need to end ordering by severity
        } else if (this.props.severityChecked !== prevProps.severityChecked) {
            this.setState({ complaintsToDisplay: this.filterUserComplaints(this.props.userComplaints) })
        }

        //FILTER BY BUGWORSE CHECKS

        //check to see if we need to filter by bugWorse AND Filter by complaintType
        if (this.props.worseChecked !== prevProps.worseChecked && this.props.worseChecked && this.props.setComplaintType !== "showAll") {
            let filterComplaints = this.filterUserComplaints(this.props.userComplaints)
            let filteredFilterComplaints = this.filterBugWorse(filterComplaints)
            this.setState({ complaintsToDisplay: filteredFilterComplaints})
        }
        //check to see if we JUST need to filter by bugWorse
        else if (this.props.worseChecked !== prevProps.worseChecked && this.props.worseChecked) {
            this.setState({ complaintsToDisplay: this.filterBugWorse(this.props.userComplaints)})
        }
        //Check to see if we need to end ordering by bugWorse
        else if (this.props.worseChecked !== prevProps.worseChecked) {
            this.setState({ complaintsToDisplay: this.filterUserComplaints(this.props.userComplaints)})
        }
        

        //FILTER BY BUGBETTER CHECKS

         //check to see if we need to filter by bugbetter AND Filter by complaintType
         if (this.props.betterChecked !== prevProps.betterChecked && this.props.betterChecked && this.props.setComplaintType !== "showAll") {
            let filterComplaints = this.filterUserComplaints(this.props.userComplaints)
            let filteredFilterComplaints = this.filterBugBetter(filterComplaints)
            this.setState({ complaintsToDisplay: filteredFilterComplaints})
        }
        //check to see if we JUST need to filter by bugbetter
        else if (this.props.betterChecked !== prevProps.betterChecked && this.props.betterChecked) {
            this.setState({ complaintsToDisplay: this.filterBugBetter(this.props.userComplaints)})
        }
        //Check to see if we need to end ordering by bugbetter
        else if (this.props.betterChecked !== prevProps.betterChecked) {
            this.setState({ complaintsToDisplay: this.filterUserComplaints(this.props.userComplaints)})
        }

        //FILTER BY COMPLAINTTYPE CHECKS

        //Check to see if we need to filter by complaintType AND order by severity
        if (this.props.selectedComplaintType !== prevProps.selectedComplaintType && this.props.severityChecked) {
            let filterComplaints = this.filterUserComplaints(this.props.userComplaints)
            let orderedComplaints = this.orderUserComplaints(filterComplaints)
            this.setState({ complaintsToDisplay: orderedComplaints})
        //Check to see if we need to filter by complaintTYpe AND bugWorse
        } else if (this.props.selectedComplaintType !== prevProps.selectedComplaintType && this.props.worseChecked) {
            let filterComplaints = this.filterUserComplaints(this.props.userComplaints)
            let filteredFilterComplaints = this.filterBugWorse(filterComplaints)
            this.setState({ complaintsToDisplay: filteredFilterComplaints})
        }
        //Check to see if we need to filter by complaintType AND bugBetter
        else if (this.props.selectedComplaintType !== prevProps.selectedComplaintType && this.props.betterChecked) {
            let filterComplaints = this.filterUserComplaints(this.props.userComplaints)
            let filteredFilterComplaints = this.filterBugBetter(filterComplaints)
            this.setState({ complaintsToDisplay: filteredFilterComplaints})
        }
        //Check to see if we need to just filter by complaintType
        else if (this.props.selectedComplaintType !== prevProps.selectedComplaintType) {
            this.setState({ complaintsToDisplay: this.filterUserComplaints(this.props.userComplaints)})
        }
    }

    render() {
        
        return(

            <MyContainer>
                
                {/* {this.props.userComplaints.map(function(complaint) {
                    if (this.props.selectedComplaintType === "showAll") {

                        return <MyBox key={complaint.id}>
                            < ActualComplaint complaint={complaint} complaintType={this.setComplaintType(complaint)} key={complaint.id} />
                        </MyBox>

                    } else if ((this.setComplaintType(complaint).name === this.props.selectedComplaintType)) {

                        return <MyBox key={complaint.id}>
                            < ActualComplaint complaint={complaint} complaintType={this.setComplaintType(complaint)} key={complaint.id} />
                        </MyBox>

                    }

                }, this)} */}
                
                {this.state.complaintsToDisplay.map(function(complaint) {
                   return <MyBox key={complaint.id}>
                        < ActualComplaint complaint={complaint} complaintType={this.setComplaintType(complaint)} key={complaint.id} />
                    </MyBox>
                }, this)}
            
            </MyContainer>
        )
    }
}

export default AllComplaintsPage