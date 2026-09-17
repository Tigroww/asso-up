import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import ReactGA from 'react-ga4';
import App from './App';

jest.mock('react-ga4', () => ({
  initialize: jest.fn(), send: jest.fn(), event: jest.fn(),
}));

let container;
let root;

beforeEach(() => {
  window.history.replaceState(null, '', '/');
  window.scrollTo = jest.fn();
  window.IS_REACT_ACT_ENVIRONMENT = true;
  jest.clearAllMocks();
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  act(() => root?.unmount());
  container.remove();
});

function renderApp() {
  root = createRoot(container);
  act(() => root.render(<React.StrictMode><App /></React.StrictMode>));
}

function click(element) {
  expect(element).not.toBeNull();
  act(() => element.click());
}

function card() {
  return container.querySelector('main [role="button"]');
}

test.each([
  ['À propos', 'À propos / Mission'],
  ['Annuaire', 'Annuaire Complet'],
  ['Contact', 'Contact & édition'],
])('le pied de page %s quitte une fiche', (label, title) => {
  renderApp();
  click(card());
  expect(container.querySelector('main h1').textContent).toBe("Math'Rix");
  click([...container.querySelectorAll('footer [role="button"]')].find(el => el.textContent === label));
  expect(container.querySelector('main h2').textContent).toBe(title);
});

test('une fiche partagée reste ouverte après remontage et Retour ouvre l’annuaire', () => {
  window.history.replaceState(null, '', '#/association/1');
  renderApp();
  expect(container.querySelector('main h1').textContent).toBe("Math'Rix");
  act(() => root.unmount());
  renderApp();
  expect(container.querySelector('main h1').textContent).toBe("Math'Rix");
  click(container.querySelector('main button'));
  expect(container.querySelector('main h2').textContent).toBe('Annuaire Complet');
});

test('précédent et suivant restaurent les vues', async () => {
  window.history.replaceState(null, '', '#/assos');
  renderApp();
  click(card());
  expect(window.location.hash).toBe('#/association/1');
  async function travel(direction) {
    await act(async () => {
      await new Promise(resolve => {
        window.addEventListener('popstate', resolve, { once: true });
        window.history[direction]();
      });
    });
  }
  await travel('back');
  expect(container.querySelector('main h2').textContent).toBe('Annuaire Complet');
  await travel('forward');
  expect(container.querySelector('main h1').textContent).toBe("Math'Rix");
});

test.each(['Enter', ' '])('les cartes fonctionnent avec la touche %s', key => {
  renderApp();
  act(() => card().dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true })));
  expect(container.querySelector('main h1').textContent).toBe("Math'Rix");
});

test('Analytics compte une vue initiale puis une vue par changement', () => {
  renderApp();
  expect(ReactGA.initialize).toHaveBeenCalledTimes(1);
  expect(ReactGA.initialize).toHaveBeenCalledWith('G-SC6NH30G91', { gaOptions: { send_page_view: false } });
  expect(ReactGA.send).toHaveBeenCalledTimes(1);
  click(card());
  expect(ReactGA.send).toHaveBeenCalledTimes(2);
  expect(ReactGA.send).toHaveBeenLastCalledWith({ hitType: 'pageview', page: '/association/1' });
});

test.each(['#/association/9999', '#/inconnu'])('une adresse inconnue %s affiche l’accueil', hash => {
  window.history.replaceState(null, '', hash);
  renderApp();
  expect(container.querySelectorAll('main [role="button"]')).toHaveLength(12);
});

test('le menu mobile se ferme à la navigation', () => {
  renderApp();
  const toggle = container.querySelector('[aria-expanded]');
  click(toggle);
  expect(toggle.getAttribute('aria-expanded')).toBe('true');
  const contacts = [...container.querySelectorAll('nav button')].filter(el => el.textContent === '📩 Contact');
  click(contacts[contacts.length - 1]);
  expect(toggle.getAttribute('aria-expanded')).toBe('false');
  expect(container.querySelector('main h2').textContent).toBe('Contact & édition');
});
