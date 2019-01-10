import React, { Component } from "react";
import Checkbox from "./Checkbox";

const HEALTH_FILTER = ["Gluten", "Soy", "Peanuts", "Fish", "Dairy", "Shellfish", "Eggs", "Tree Nuts", "Wheat"];
const DIET_FILTERS = ["Vegetarian", "Paleo", "Low-Fat", "Low-Carb", "Low-Sodium", "Balanced"];

export class FilterBar extends Component {
    /*state = {
        checkboxes: HEALTH_FILTER.reduce(
            (options, option) => ({
                ...options,
                [option]: false
            }),
            {}
        ),
        checkboxes2: DIET_FILTERS.reduce(
            (options, option) => ({
                ...options,
                [option]: false
            }),
            {}
        )
    };*/


    /*handleCheckboxChange = changeEvent => {
        const { name } = changeEvent.target;

        this.setState(prevState => ({
            checkboxes: {
                ...prevState.checkboxes,
                [name]: !prevState.checkboxes[name]
            },
            checkboxes2: {
                ...prevState.checkboxes2,
                [name]: !prevState.checkboxes2[name]
            }
        }));

    };*/

    /*handleFormSubmit = formSubmitEvent => {
        formSubmitEvent.preventDefault();

        Object.keys(this.state.checkboxes)
            .filter(checkbox => this.state.checkboxes[checkbox])
            .forEach(checkbox => {
                console.log(checkbox, "is selected.");
            });
    };*/

    createCheckbox = option => (
        <Checkbox
            label={option}
            free={"-free"}
            isSelected={this.props.checkboxes[option]}
            onCheckboxChange={this.props.handleCheckBoxChange}
            key={option}
        />
    );


    createCheckbox2 = option => (
        <Checkbox
            label={option}
            free={""}
            isSelected={this.props.checkboxes[option]}
            onCheckboxChange={this.props.handleCheckBoxChange}
            key={option}
        />
    );


    createCheckboxes = () => HEALTH_FILTER.map(this.createCheckbox);
    createCheckboxes2 = () => DIET_FILTERS.map(this.createCheckbox2);

    render() {
        return (
            <div className="container">
                <div className="row">
                    <h3 className="text-center col-sm-6"> ALLERGIES </h3>
                    <h3 className="text-center col-sm-6"> DIET </h3>
                </div>
                <div className="row filterBar">
                    <div className="col-sm-6 allergies border-right border-dark">
                        {this.createCheckboxes()}
                    </div>
                    <div className="col-sm-6 diet">
                        {this.createCheckboxes2()}
                    </div>

                </div>
            </div>
        );
    }
}
