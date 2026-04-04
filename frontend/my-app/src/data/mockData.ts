export interface Researcher {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  domain: string;
  publications: number;
  joinedAt: string;
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  domain: string;
  date: string;
  doi?: string;
  keywords: string[];
  status: "published" | "draft" | "review";
}

export interface Domain {
  id: string;
  name: string;
  description: string;
  researcherCount: number;
  publicationCount: number;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: "admin" | "moderator" | "user";
  status: "active" | "inactive";
  createdAt: string;
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
  published: boolean;
}

export interface FeaturedProject {
  id: string;
  title: string;
  description: string;
  domain: string;
  featured: boolean;
  image?: string;
}

export const researchers: Researcher[] = [
  { id: "1", firstName: "Amira", lastName: "Ben Salem", email: "amira.bensalem@ia-tech.tn", domain: "NLP", publications: 12, joinedAt: "2022-03-15" },
  { id: "2", firstName: "Karim", lastName: "Trabelsi", email: "karim.trabelsi@ia-tech.tn", domain: "Vision par ordinateur", publications: 8, joinedAt: "2021-09-01" },
  { id: "3", firstName: "Sana", lastName: "Gharbi", email: "sana.gharbi@ia-tech.tn", domain: "Cybersécurité IA", publications: 15, joinedAt: "2020-06-20" },
  { id: "4", firstName: "Mohamed", lastName: "Khelifi", email: "mohamed.khelifi@ia-tech.tn", domain: "NLP", publications: 6, joinedAt: "2023-01-10" },
  { id: "5", firstName: "Fatma", lastName: "Bouazizi", email: "fatma.bouazizi@ia-tech.tn", domain: "Vision par ordinateur", publications: 10, joinedAt: "2021-11-05" },
];

export const publications: Publication[] = [
  { id: "1", title: "Analyse de sentiments en dialecte tunisien avec BERT", authors: ["Amira Ben Salem", "Mohamed Khelifi"], domain: "NLP", date: "2025-01-15", doi: "10.1234/nlp.2025.001", keywords: ["NLP", "BERT", "sentiment"], status: "published" },
  { id: "2", title: "Détection d'objets en temps réel via YOLOv8", authors: ["Karim Trabelsi"], domain: "Vision par ordinateur", date: "2024-11-20", doi: "10.1234/cv.2024.042", keywords: ["YOLO", "détection", "temps réel"], status: "published" },
  { id: "3", title: "Détection d'intrusions réseau par apprentissage profond", authors: ["Sana Gharbi"], domain: "Cybersécurité IA", date: "2025-02-10", keywords: ["cybersécurité", "deep learning", "IDS"], status: "review" },
  { id: "4", title: "Segmentation sémantique pour l'imagerie médicale", authors: ["Fatma Bouazizi", "Karim Trabelsi"], domain: "Vision par ordinateur", date: "2025-03-01", keywords: ["segmentation", "médical", "U-Net"], status: "draft" },
  { id: "5", title: "Résumé automatique de textes juridiques arabes", authors: ["Amira Ben Salem"], domain: "NLP", date: "2024-08-22", doi: "10.1234/nlp.2024.018", keywords: ["résumé", "arabe", "juridique"], status: "published" },
];

export const domains: Domain[] = [
  { id: "1", name: "NLP", description: "Traitement Automatique du Langage Naturel", researcherCount: 2, publicationCount: 3 },
  { id: "2", name: "Vision par ordinateur", description: "Analyse et traitement d'images et vidéos", researcherCount: 2, publicationCount: 2 },
  { id: "3", name: "Cybersécurité IA", description: "Sécurité informatique basée sur l'intelligence artificielle", researcherCount: 1, publicationCount: 1 },
  { id: "4", name: "Robotique IA", description: "Intelligence artificielle appliquée à la robotique", researcherCount: 0, publicationCount: 0 },
];

export const userAccounts: UserAccount[] = [
  { id: "1", name: "Admin Principal", email: "admin@ia-tech.tn", role: "admin", status: "active", createdAt: "2020-01-01" },
  { id: "2", name: "Moderateur 1", email: "mod1@ia-tech.tn", role: "moderator", status: "active", createdAt: "2021-03-15" },
  { id: "3", name: "Amira Ben Salem", email: "amira.bensalem@ia-tech.tn", role: "user", status: "active", createdAt: "2022-03-15" },
  { id: "4", name: "Karim Trabelsi", email: "karim.trabelsi@ia-tech.tn", role: "user", status: "active", createdAt: "2021-09-01" },
  { id: "5", name: "Utilisateur Test", email: "test@ia-tech.tn", role: "user", status: "inactive", createdAt: "2024-06-01" },
];

export const newsItems: NewsItem[] = [
  { id: "1", title: "Lancement du laboratoire NLP avancé", content: "IA-Technology ouvre un nouveau laboratoire dédié au traitement du langage naturel.", date: "2025-03-10", published: true },
  { id: "2", title: "Conférence internationale sur la cybersécurité IA", content: "Nos chercheurs participeront à la conférence AISEC 2025 à Paris.", date: "2025-03-18", published: true },
  { id: "3", title: "Partenariat avec l'Université de Tunis", content: "Nouveau partenariat de recherche signé avec la faculté des sciences.", date: "2025-02-28", published: false },
];

export const featuredProjects: FeaturedProject[] = [
  { id: "1", title: "ChatBot Tunisien", description: "Assistant conversationnel en dialecte tunisien basé sur des LLM fine-tunés.", domain: "NLP", featured: true },
  { id: "2", title: "SmartSurveillance", description: "Système de vidéo-surveillance intelligent avec détection d'anomalies.", domain: "Vision par ordinateur", featured: true },
  { id: "3", title: "CyberShield AI", description: "Plateforme de détection proactive des menaces cybernétiques.", domain: "Cybersécurité IA", featured: false },
];
