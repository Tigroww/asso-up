# Asso'UP

L'annuaire des associations du campus des Grands Moulins - Université Paris Cité.

🔗 **Site en ligne** : https://stixhel.github.io/asso-up

---

## 🚀 Déploiement sur GitHub Pages

### 1. Créer le repository sur GitHub

1. Va sur https://github.com/new
2. Nom du repo : `asso-up`
3. Crée le repo (sans README, sans .gitignore)

### 2. Pousser le code

Dans le dossier `asso-up` sur ton PC, exécute :

```bash
# Initialiser git
git init

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "Initial commit"

# Connecter au repo GitHub (remplace stixhel par ton vrai username)
git remote add origin https://github.com/stixhel/asso-up.git

# Pousser le code
git push -u origin main
```

### 3. Installer les dépendances et déployer

```bash
# Installer les packages
npm install

# Déployer sur GitHub Pages
npm run deploy
```

### 4. Activer GitHub Pages

1. Va sur ton repo GitHub → **Settings** → **Pages**
2. Source : choisis **Deploy from a branch**
3. Branch : sélectionne **gh-pages** → **/(root)**
4. Clique sur **Save**

⏱️ Attends 2-3 minutes, puis ton site sera disponible sur :
**`https://stixhel.github.io/asso-up`**

---

## 🛠️ Développement local

```bash
# Démarrer le serveur de développement
npm start
```

Le site sera accessible sur http://localhost:3000

---

## 📝 Modifier les associations

Pour modifier les associations, édite le fichier `src/App.js` et modifie le tableau `assos` au début du fichier.

---

## 🎨 Technologies utilisées

- React 18
- Tailwind CSS
- Lucide React (icônes)
- GitHub Pages (hébergement)
