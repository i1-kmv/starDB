import React, {Component} from 'react'
import Header from '../header'
import RandomPlanet from '../random-planet'
import ErrorBoundry from '../error-boundry'
import {SwapiServiceProvider} from "../swapi-service-context"
import SwapiService from "../../services/swapi-service"
import './app.css'
import DummySwapiService from "../../services/dummy-swapi-service"
import PeoplePage from "../pages/people-page"
import {PlanetsPage, StarshipsPage} from "../pages"




export default class App extends Component {


    state = {
        swapiService: new SwapiService()
    };

    onServiceChange = () => {
        this.setState(({swapiService}) => {
            const Service = swapiService instanceof SwapiService ? DummySwapiService : SwapiService;
            return {
                swapiService: new Service()
            }
        })
    }



    render() {

        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={this.state.swapiService}>
                    <div className="stardb-app">
                        <Header onServiceChange={this.onServiceChange}/>

                        <RandomPlanet updateInterval={10000}/>

                        <PeoplePage/>

                        <PlanetsPage/>

                        <StarshipsPage/>

                    </div>
                </SwapiServiceProvider>
            </ErrorBoundry>
        );
    }
}
