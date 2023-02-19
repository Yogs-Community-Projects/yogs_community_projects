import {ParentComponent} from "solid-js";
import {useFirebaseConfig} from "../firebase_config";
import {DebugProvider, YcFirebaseConfigProvider, YcFirebaseProvider} from "@ycapp/common";

const JJFirebaseProvider: ParentComponent = (props) => {
  return (
    <YcFirebaseConfigProvider config={useFirebaseConfig()}>
      <YcFirebaseProvider>
        <DebugProvider debug={false}>
          {props.children}
        </DebugProvider>
      </YcFirebaseProvider>
    </YcFirebaseConfigProvider>
  );
}
export default JJFirebaseProvider;
