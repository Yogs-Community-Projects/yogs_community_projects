import {LoadingSpinner} from "./LoadingSpinner";
import {Component} from "solid-js";

interface LoadingProps {
}

export const Loading: Component<LoadingProps> = (props) => {
  return (
    <div class={'flex flex-row justify-center items-center'}>
      <LoadingSpinner/>
      <p class={'text-white text-xl'}>Loading...</p>
    </div>
  );
}
