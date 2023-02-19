import {ParentComponent} from "solid-js";


interface GradientBackgroundProps {
  from: string;
  to: string;
}

const GradientBackground: ParentComponent<GradientBackgroundProps> = (props) => {
  return (
    <div class={``}>
      {props.children}
    </div>
  );
}
