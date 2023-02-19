import {Component} from "solid-js";

export const BetaBanner: Component = () => {
  return (
    <div class={'w-full text-white text-center bg-accent rounded-3xl text-2xl p-2'}>
      <p>This is a new version of jj.yogs.app. It is currently being tested and many things are not final. Please
        report problems using <a
          href={'mailto:contact@yogs.app'} class={'underline'}>this email</a> or DM Ostof on <a
          href={'https://discord.gg/D5eqweWQPs'} class={'underline'}>Discord</a> or <a
          href={'https://old.reddit.com/message/compose/?to=Ostof'} class={'underline'}>Reddit</a></p>
    </div>
  );
}
