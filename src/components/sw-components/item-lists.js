import React from "react"
import ItemList from "../item-list/item-list"
import { withData, withSwapiService} from '../hoc-helper'




const withChildFunction = (Wrapped, fn) => {
    return (props) => {
        return (
            <Wrapped {...props}>
                {fn}
            </Wrapped>
            )
    }
}

const renderName = ({name}) => <span>{name}</span>

const renderModelAndName = ({model, name}) => <span> {name} ({model})</span>

const ListWithChildren = withChildFunction(
    ItemList,
    ({ name }) => <span>{name}</span>
)

const mapPersonMethodToProps = (swapiService) => {
    return {
        getData: swapiService.getAllPeople
    }
}
const mapPlanetMethodToProps = (swapiService) => {
    return {
        getData: swapiService.getAllPlanets
    }
}
const mapStarshipMethodToProps = (swapiService) => {
    return {
        getData: swapiService.getAllStarships
    }
}

const PersonList = withSwapiService(withData(withChildFunction(ItemList, renderName)), mapPersonMethodToProps)
const PlanetList =  withSwapiService(withData(withChildFunction(ItemList, renderName)), mapPlanetMethodToProps)
const StarshipList =  withSwapiService(withData(withChildFunction(ItemList, renderName)), mapStarshipMethodToProps)

export {
    PersonList,
    PlanetList,
    StarshipList
}