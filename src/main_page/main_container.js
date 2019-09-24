import React, { Component } from 'react';
import Navbar from '../navbar/navbar'
// import Complaint from './complaint_component'
import { Grid } from 'semantic-ui-react'
import withAuth from '../withAuth'
import NewComplaintForm from './new_complaint_form'
import ComplaintContainer from './complaints_container'
import styled from '@emotion/styled'

const MyContainer = styled.div`
    display: grid;
    width: 90%;
    justify-items: center;
`

class MainContainer extends Component {

    render() {
        return(
            <React.Fragment>
                <Navbar />
                <MyContainer>
                    <ComplaintContainer/>
                    
                    <NewComplaintForm />
                </MyContainer>
            </React.Fragment>
        )
    }

}

export default withAuth(MainContainer)