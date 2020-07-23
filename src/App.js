import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { Button } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
//change background follow the weather description
// export const CHOICES = {
//   scissors: {
//     name: "scissors",
//     url: "http://www.pngmart.com/files/1/Scissors-PNG-Pic.png"
//   },
//   paper: {
//     name: "paper",
//     url: "http://pngimagesfree.com/Paper/Thumb/blank-note-paper-free-clipa.png"
//   },
//   rock: {
//     name: "rock",
//     url:
//       "https://opengameart.org/sites/default/files/forum-attachments/very%20simple%20rock_0.png"
//   }

// };

class App extends Component {
  constructor() {
    super()
    // console.warn("constructor")
    this.state = {
      data: false,
      isLoading: true,
    }
  }
  componentDidMount() {
    // console.warn ("componentDidMount")
    this.setState({
      data: 'true'

    })

    this.getLocation()
  }
  //1.step 1: get location



  getLocation = () => {
    navigator.geolocation.getCurrentPosition((post) => {
      this.getWeather(post.coords.latitude, post.coords.longitude)
    })
  }

  search(whichCity) {
    if (document.getElementById("input").value === ''){
      alert("You need to enter the city")
    }else{whichCity.preventDefault()
      console.log(document.getElementById("input").value);
      let searchCity = document.getElementById("input").value;
  
      this.cities(searchCity);}
    
  }

  //2.step 2: get api
  async getWeather(latitude, longitude) {
    // const API_KEY = "53db8b4b3f72784d15eb4aa04d16ed91";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=53db8b4b3f72784d15eb4aa04d16ed91&units=metric`;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data)
    this.setState({
      locationName: data.name,

      isLoading: false,
      temperature: data.main.temp,
      weatherDescription: data.weather[0].description,
      country: data.sys.country,

      // put in more here
    });
  };
  async cities(name) {
    // const API_KEY = "53db8b4b3f72784d15eb4aa04d16ed91";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=53db8b4b3f72784d15eb4aa04d16ed91&units=metric`;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data)
    this.setState({
      locationName: data.name,

      isLoading: false,
      temperature: data.main.temp,
      weatherDescription: data.weather[0].description,
      country: data.sys.country,

      // put in more here
    });
  };

  //call direct the function getLocation here (no need return)


  render() {
    if (this.state.isLoading) { return (<h1>I am Loading</h1>) }

    return (

      <div className="container-fluid text-white my-auto">
        <div className="container mx-auto my-4 py-4">
          <div className="row justify-content-center text-center">
            <div className="nav">
              <ButtonGroup aria-label="Basic example">
                <Button variant="secondary" onClick={() => this.cities("antarctica")}>Antarctica</Button>
                <Button variant="secondary" onClick={() => this.cities("manila")}>Manila</Button>
                <Button variant="secondary" onClick={() => this.cities("tokyo")}>Tokyo</Button>
                <Button variant="secondary" onClick={() => this.cities("seoul")}>Seoul</Button>
                <Button variant="secondary" onClick={() => this.cities("barcelona")}>Barcelona</Button>
                <Button variant="secondary" onClick={() => this.cities("savona")}>Savona</Button>
              </ButtonGroup>
            </div>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="cities"

                type="text" name="name" id="input"
              />
              <InputGroup.Append>
                <Button variant="outline-secondary" onClick={this.search.bind(this)} >Search</Button>
              </InputGroup.Append>
            </InputGroup>
            <h1 className="col-12 display-4 my-2 py-3 text-success">
              Awesome Weather App
              </h1>
            <h2 className="col-12" > You are in: {this.state.locationName}</h2>
            <h3 className="col-12 text-danger">{this.state.temperature} °C </h3>
            <h3 className="col-12">Description: {this.state.weatherDescription}</h3>
          </div>
        </div>

      </div>
    );
  }
}


export default App;
