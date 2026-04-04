# Frontend Dockerfile
FROM node:20

WORKDIR /app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install
RUN npm install --network-timeout=1000000

# Copier le reste du code
COPY . .

# Exposer le port de React
EXPOSE 3000

# Commande par défaut
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]