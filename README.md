# Asso'UP

L'annuaire des associations du campus des Grands Moulins - Université Paris Cité.

🔗 **Site en ligne** : https://asso.upgm.fr/

---

## 🛠️ Développement local

```bash
# Installer les dépendances avec Node.js 22 et npm
npm ci

# Démarrer le serveur de développement
npm start
```

Le site sera accessible sur http://localhost:3000

## Vérification et publication

```bash
CI=true npm test -- --watchAll=false
npm run build
```

Pour publier volontairement sur GitHub Pages : `npm run deploy`.
Le site est publié sur la branche `gh-pages`, à l’adresse
`https://asso.upgm.fr/`. Le champ `homepage` de `package.json` configure
les chemins des fichiers pour ce domaine. Le fichier `public/CNAME` est copié
dans la compilation pour conserver le domaine à chaque publication.
Garder le fichier `CNAME` à la racine identique à `public/CNAME`.

Les onglets et fiches utilisent des adresses avec `#` pour permettre le partage,
le rechargement et la navigation précédent/suivant sur GitHub Pages.

---

## 📝 Modifier les associations

Pour modifier les associations, édite le fichier `src/App.js` et modifie le tableau `assos` au début du fichier.

---

## 🎨 Technologies utilisées

- React 18
- Tailwind CSS
- Lucide React (icônes)
- GitHub Pages (hébergement)
