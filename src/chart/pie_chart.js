import React, { Component } from 'react';
import Chart from 'chart.js'
// import classes from "./LineGraph.module.css";
import { connect } from 'react-redux'

let myChart;
class PieChart extends Component {

   chartRef = React.createRef()

    getComplaints = (complaintTypeId) => { // get complaints for this complaint type
        let array = this.props.userComplaints.filter(complaint => 
            complaint.complaint_type_id === parseInt(complaintTypeId)
        )
        return array
    }

    sortComplaints = (complaintsList) => {
        let positive = 0;
        let negative = 0;
        let unreacted = 0;
        let unchanged = 0;

        complaintsList.forEach(function(complaint) {
            if (complaint.reactions.length === 0) {
                unreacted++
            } else if (complaint.reactions[0].updated_severity < complaint.severity) {
                positive++
            } else if (complaint.reactions[0].updated_severity > complaint.severity) {
                negative++
            } else if (complaint.reactions[0].updated_severity === complaint.severity) {
                unchanged++
            }
        })
        return [negative, positive, unreacted, unchanged]
    }

    componentDidMount() {
        let complaintsList = this.getComplaints(this.props.complaintType.id)
        let reactionData = this.sortComplaints(complaintsList)

        const myChartRef = this.chartRef.current.getContext("2d");
        myChart = new Chart(myChartRef, {
            type: "pie",
            data: {
                labels: ["Bugs that got better with time", "Bugs that got worse with time", "Bugs that didn't change with time", "Bugs you haven't reacted to yet"],
                datasets: [
                    {
                        label: "Number of Bugs per Bug Type",
                        data: [reactionData[1], reactionData[0], reactionData[3], reactionData[2]],
                        backgroundColor: ["#008000", "#FF0000", "#D2B48C", "#A9A9A9"]
                    }
                ]
            },
            options: {
                // styling options will go here, unless you go the style sheet route (see comment below)
            }
        })
    }
    
    componentDidUpdate() { //using component did update because I could immediately run a check to see if the component recieved a new complaint type, and I can run the function needed to get the required data without setting state
            
        let complaintsList = this.getComplaints(this.props.complaintType.id)
        let reactionData = this.sortComplaints(complaintsList)


         myChart.data.datasets[0].data = [reactionData[1], reactionData[0], reactionData[3], reactionData[2]]
         myChart.update();
        
    }

    render() {
        return (
            <React.Fragment>
            <div style={{width: "100%"}}>
                {this.props.userComplaints &&
                <canvas //having a stylings sheet for the div here to style, per Brockhoff
                    id="myChart"
                    ref={this.chartRef}
                />
                }
            </div>
            <h2 style={{align: "center"}}>{this.props.complaintType.name}</h2>
            </React.Fragment>
        )
    }


}

function mapStateToProps(state) {
    return {
        userComplaints: state.userComplaints
    }
}
    
export default connect(mapStateToProps)(PieChart)