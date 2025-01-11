import { render } from 'solid-js/web';
import { createSignal, Match, onCleanup, onMount, Switch } from 'solid-js';
import './index.css';

import { App } from './app';
import { Creator } from './creator';
import { StoreProvider } from './contexts/store';
import Scheduler from './scheduler';

const Router = () => {
  const [hash, setHash] = createSignal(window.location.hash);
  const location = () => hash().replace(/^#/, '') || '/';

  const onChange = () => setHash(window.location.hash);

  onMount(() => {
    window.addEventListener('hashchange', onChange, false);
  });

  onCleanup(() => {
    window.removeEventListener('hashchange', onChange, false);
  });

  return (
    <div class="h-full">
      <Switch fallback={<App />}>
        <Match when={location() === '/creator'}>
          <Creator />
        </Match>
        <Match when={location() === '/scheduler'}>
          <Scheduler />
        </Match>
      </Switch>
    </div>
  );
};

render(
  () => (
    <StoreProvider>
      <Router />
    </StoreProvider>
  ),
  document.getElementById('app') as HTMLElement,
);
