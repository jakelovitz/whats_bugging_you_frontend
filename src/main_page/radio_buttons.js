import React, { Component } from 'react';
import styled from '@emotion/styled'


const RadioButtonContainer = styled.div`
    display: grid;
    grid-template-columns: 80%;
    justify-content: center;
`

const MyLabel = styled.label`
    display: grid;
    grid-template-columns: auto 1fr;
    grid-column-gap: 5%;
    justify-items: start;
    align-items: center;
    border: 5px solid ${props => props.color};
    border-radius: 15px;
    margin-bottom: 4%;
    padding-top: 3%;
    padding-bottom: 3%;
    padding-right: 10%;
    padding-left: 3%;
    white-space: nowrap;
    font-weight: bold;
    color: ${props => props.color}
`
        

class RadioButtons extends Component {
    render() {
        return(
            <RadioButtonContainer>
                {this.props.species.map(function(complaintType) {
                    return <MyLabel key={complaintType.id} color={complaintType.color}>
                        <input type="radio"
                            value={complaintType.id}
                            name="bugSpecies"
                            key={complaintType.id}
                            onChange={(event) => this.props.handleRadio(event.target.value)}
                            color={complaintType.color}
                        />
                        {complaintType.name}
                    </MyLabel>
                }, this)}
        </RadioButtonContainer>
        )
    }
}

export default RadioButtons