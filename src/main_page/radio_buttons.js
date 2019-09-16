import React, { Component } from 'react';
import styled from '@emotion/styled'
        

class RadioButtons extends Component {
    
    handleChange = (event) => {
        console.log(event.target.value)
    }

    render() {

        return(
            <div>
                {this.props.species.map(function(complaintType) {
                    return <label key={complaintType.id}>
                        <input type="radio"
                            value={complaintType.id}
                            name="bugSpecies"
                            key={complaintType.id}
                            // checked={this.debugger} 
                            // onChange={(event) => this.handleChange(event)}
                            onChange={(event) => this.props.handleRadio(event.target.value)}
                        />
                        {complaintType.name}
                    </label>
                }, this)}
        </div>
        )
    }
}
export default RadioButtons