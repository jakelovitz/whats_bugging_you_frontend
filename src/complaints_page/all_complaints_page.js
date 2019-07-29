import React, { Component, Children } from 'react';
import { Grid } from 'semantic-ui-react'
import ActualComplaint from './actual_complaint'
import styled from '@emotion/styled'
import Flexbox from 'flexbox-react';

const MyContainer = styled.div`
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
  justify-content: center;
`

const MyBox = styled.div`
  display: flex;
  margin: auto;
`
class AllComplaintsPage extends Component {


    setComplaintType = (complaint) => {
        let type = this.props.currentUser.complaint_types.filter(ct => ct.id === complaint.complaint_type_id)
        return type[0]
    }

    render() {
        return(

            <MyContainer>
                
                {this.props.userComplaints.map(function(complaint) { //add an IF statement to check for selected type and filter bugs according. - if ()
                    if (this.props.selectedComplaintType === "showAll") {

                        return <MyBox key={complaint.id}>
                            < ActualComplaint complaint={complaint} complaintType={this.setComplaintType(complaint)} key={complaint.id} />
                        </MyBox>

                    } else if ((this.setComplaintType(complaint).name === this.props.selectedComplaintType)) {

                        return <MyBox key={complaint.id}>
                            < ActualComplaint complaint={complaint} complaintType={this.setComplaintType(complaint)} key={complaint.id} />
                        </MyBox>

                    }

                }, this)}
            
            </MyContainer>
        )
    }
}

export default AllComplaintsPage