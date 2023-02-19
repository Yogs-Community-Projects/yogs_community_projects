import {ParentComponent} from "solid-js";
import {NavBar} from "./NavBar";
import {Footer} from "./Footer";
import {JJLogo} from "./JJLogo";


interface JJScaffoldProps {
  class?: string
}

export const JJScaffold: ParentComponent<JJScaffoldProps> = (props) => {
  return (
    <div class={props.class}>
      <div class={'min-h-screen flex flex-col items-center'}>
        <JJLogo/>
        <NavBar/>
        <div class={'container mx-auto'}>
          {props.children}
        </div>
        <div class={'grow'}/>
        <Footer/>
      </div>
    </div>
  );
}
