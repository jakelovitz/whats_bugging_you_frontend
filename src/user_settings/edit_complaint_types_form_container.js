import React, { Component } from 'react';
import { connect } from 'react-redux'
import UpdateComplaintTypeForm from './complaint_type_form'
import styled from '@emotion/styled'

const MyContainer = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: [col-1-start] 1fr [col-2-start] 1fr [col-2-end];
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  margin-right: 10%;
  margin-left: 10%;
`

const MyBox = styled.div`
  margin: 2%;
`

const MyGreeting = styled.div`
  grid-column-start: col-1-start;
  grid-column-end: col-2-end;
`

//NOTE: If there's any problem with the grid it's likely because the MyGreeting component is throwing it off
class UpdateComplaintTypesContainer extends Component {

    render() {
        return(
            <React.Fragment>

            <MyContainer >

            <MyGreeting>
                <h1 style={{justifyContent: "center"}}>Feel free to update Bug types as well!</h1>
            </MyGreeting>

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