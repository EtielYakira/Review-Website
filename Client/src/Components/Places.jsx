import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import PlacePage from "./All-Places-Components/PlacePage";
import Places from "./AllPlaces";

function Place({handleShow}) {
  let match = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route path={`${match.path}/:placeId`}>
          <PlacePage handleShow={handleShow}/>
        </Route>
        <Route path={match.path}>
          <Places/>
        </Route>
      </Switch>
    </div>
  );
}

export default Place;
