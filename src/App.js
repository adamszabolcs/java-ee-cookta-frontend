import React, {Component} from 'react';
import './App.css';
import './templatemo-style.css';
import {Navbar} from "./components/Navbar";
import {SearchBar} from "./components/SearchBar";
import {Featured} from "./components/Featured";
import {Recipes} from "./components/Recipes";


const HEALTH_FILTER = ["Gluten", "Soy", "Peanuts", "Fish", "Dairy", "Shellfish", "Eggs", "Tree Nuts", "Wheat"];
const DIET_FILTERS = ["Vegetarian", "Paleo", "Low-Fat", "Low-Carb", "Low-Sodium", "Balanced"];

class App extends Component {

    constructor(props) {
        super(props);
        let basurl = "https://api.edamam.com/search?q=chicken&app_id=5b5897f7&app_key=9ac6d44f07118d8a2bead5a790b270d5&from=0&to=10&calories=591-722&health=alcohol-free"

        this.handleSubmit = this.handleSubmit.bind(this);
        //this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            health: HEALTH_FILTER.reduce(
                (options, option) => ({
                    ...options,
                    [option]: false
                }),
                {}
            ),
            diet: DIET_FILTERS.reduce(
                (options, option) => ({
                    ...options,
                    [option]: false
                }),
                {}
            ),
            hits: [],
            isLoading: false,
            searchprase: ""
        };
    }


    componentDidMount() {
        this.setState({isLoading: true});

        this.performSearch();

        /*fetch("http://localhost:8080/api/")
            .then(response => response.json())
            .then(data => this.setState({hits: data, isLoading: false}));*/
    }

     performSearch = (query = '') => {
        let passed = "";
        if(query !== ''){
            //let searchy = this.handleSubmit();
            passed = "search/" + query;
        }
         console.log(passed);
         fetch("http://localhost:8080/api/"+passed)
            .then(response => response.json())
            .then(responseData => {this.setState({hits: responseData, isLoading: false
            });
            })
            .catch(error => {
                console.log('Error fetching and parsing data', error);
            });
    }


    handleCheckboxChange = name => {
        //const { name } = changeEvent.target;

        this.setState(prevState => ({
            diet: {
                ...prevState.diet,
                [name]: !prevState.diet[name]
            },
            health: {
                ...prevState.health,
                [name]: !prevState.health[name]
            }
        }));

    };



    handleSubmit(event) {
        event.preventDefault();
        let urlPart = "?q=" + this.state.searchprase+"&";
        let diet = this.state.diet;
        let health = this.state.health;

        for(let d in diet){
            //console.log(d);
            if(diet[d] && DIET_FILTERS.indexOf(d) > -1){
                urlPart += "diet" + "=" + d.toLowerCase()+"&"
            }
        }

        for(let h in health){
            if(health[h] && HEALTH_FILTER.indexOf(h) > -1){
                urlPart += "health" + "=" + h.toLowerCase()+"-free"+"&"
            }
        }
        urlPart = urlPart.substring(0, urlPart.length -1);
        console.log(urlPart);
        this.performSearch(urlPart)
    }

    handleChange(event) {
        this.setState({searchprase: event.target.value});
    }


    render() {
        const { hits, isLoading } = this.state;

        return (
            <div className="App">
                <Navbar/>
                <SearchBar
                    searchprase={this.state.searchprase}
                    onSubmit={this.handleSubmit}
                    searchValueChange={this.handleChange}
                    checkboxes={this.state.diet}
                    checkboxes2={this.state.health}
                    handleCheckBoxChange={this.handleCheckboxChange}
                />
                <Featured/>
                <Recipes
                    recipes={hits}
                    isLoading={isLoading}
                />
            </div>
        );
    }
}

export default App;
