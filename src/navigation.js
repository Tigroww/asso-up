import { useEffect, useState } from 'react';

const tabs = ['home', 'assos', 'mission', 'contact'];

export function readRoute(associations) {
  const path = window.location.hash.slice(1);
  const match = /^\/association\/(\d+)$/.exec(path);
  const association = match && associations.find(asso => asso.id === Number(match[1]));
  if (association) {
    const previousTab = window.history.state?.assoUpTab;
    return { tab: tabs.includes(previousTab) ? previousTab : 'assos', association };
  }
  const tab = path.replace(/^\//, '');
  return { tab: tabs.includes(tab) ? tab : 'home', association: null };
}

export function useNavigation(associations) {
  const [route, setRoute] = useState(() => readRoute(associations));

  useEffect(() => {
    const restore = () => setRoute(readRoute(associations));
    window.addEventListener('popstate', restore);
    window.addEventListener('hashchange', restore);
    return () => {
      window.removeEventListener('popstate', restore);
      window.removeEventListener('hashchange', restore);
    };
  }, [associations]);

  const navigate = (tab, association = null) => {
    const hash = association ? `#/association/${association.id}` : `#/${tab}`;
    if (window.location.hash !== hash) {
      window.history.pushState({ assoUpTab: tab }, '', hash);
    }
    setRoute({ tab, association });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return { route, navigate };
}

export function activateWithKeyboard(event) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    event.currentTarget.click();
  }
}
