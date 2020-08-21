import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';
import {SwapiServiceProvider} from "../swapi-service-context";


import ItemDetails, { Record } from "../item-details/item-details";
import SwapiService from "../../services/swapi-service";

import './app.css';

import {
    PersonList,
    PlanetList,
    StarshipList,
    PersonDetails,
    PlanetDetails,
    StarshipDetails
} from '../sw-components'
import DummySwapiService from "../../services/dummy-swapi-service";

export default class App extends Component {



  state = {
    showRandomPlanet: true,
    swapiService: new DummySwapiService
  };

  onServiceChange = () => {
        this.setState(({swapiService}) => {
            const Service = swapiService instanceof SwapiService ? DummySwapiService : SwapiService;
            return {
                swapiService: new Service()
            }
        })
  }

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    });
  };

  render() {

    const planet = this.state.showRandomPlanet ?
      <RandomPlanet/> :
      null;

    const { getPerson,
            getStarship,
            getPersonImage,
            getStarshipImage,
            } = this.state.swapiService;

    const personDetails = (
      <ItemDetails
        itemId={11}
        getData={getPerson}
        getImageUrl={getPersonImage} >

        <Record field="gender" label="Gender" />
        <Record field="eyeColor" label="Eye Color" />

      </ItemDetails>
    );

    const starshipDetails = (
      <ItemDetails
        itemId={5}
        getData={getStarship}
        getImageUrl={getStarshipImage}>

        <Record field="model" label="Model" />
        <Record field="length" label="Length" />
        <Record field="costInCredits" label="Cost" />
      </ItemDetails>


    );

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value = {this.state.swapiService}>
            <div className="stardb-app">
              <Header onServiceChange={this.onServiceChange}/>
                <PlanetDetails itemId={11}/>
                <PersonDetails itemId={8}/>
                <PersonList/>
                <PlanetList/>
                <StarshipList/>
            </div>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
