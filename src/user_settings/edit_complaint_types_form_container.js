import React, { Component } from 'react';
import { connect } from 'react-redux'
import UpdateComplaintTypeForm from './complaint_type_form'
import styled from '@emotion/styled'

const MyContainer = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  margin-right: 10%;
  margin-left: 10%;
`

const MyBox = styled.div`
  margin: 2%;
`

class UpdateComplaintTypesContainer extends Component {

    render() {
        return(
            <React.Fragment>
            <h1>Feel free to update Bug types as well!</h1>
            <MyContainer >
                {this.props.currentUser.complaint_types.map(function(complaintType) {
                    return <MyBox key={complaintType.id}>
                        < UpdateComplaintTypeForm style={{marginBottom: "20px"}} complaintType={complaintType} key={complaintType.id}/>
                    </MyBox>
                })}    
            </MyContainer>
            </React.Fragment>
        )
    }

}

function mapStateToProps(state) {
   return {currentUser: state.currentUser}
}
  
function mapDispatchToProps(dispatch){
    return {
        updateUserSettings: (user) => {
            dispatch({type: "UPDATE_USER_SETTINGS", payload: user})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateComplaintTypesContainer)