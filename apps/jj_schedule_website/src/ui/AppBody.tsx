import {Component} from "solid-js";
import {useRoutes} from "@solidjs/router";
import {routes} from "../Routes";


const AppBody: Component = (props) => {
  const Routes = useRoutes(routes);
  return (
    <Routes/>
  );
}
export default AppBody;
