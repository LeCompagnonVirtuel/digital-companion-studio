import {
  Target, Brain, Layers, Clock, Sparkles, ShieldCheck,
  TrendingDown, Package, DollarSign, UserX, Zap, Eye,
  BarChart3, Wallet, Settings, Users, Network, Megaphone,
  Camera, UserMinus, AlertTriangle, Copy, Calculator, Repeat,
  Expand, Gauge, Cog, Heart, Flame, Compass
} from "lucide-react";

export interface EntrepreneurProblem {
  id: number;
  slug: string;
  title: string;
  shortTitle: string;
  icon: typeof Target;
  category: "Choix" | "Exécution" | "Offre" | "Acquisition" | "Mindset" | "Opérations";
  phase: "Find" | "PMF" | "Scale";
  signals: string[];
  rootCause: string;
  solution: string;
  actionSteps: string[];
}

export const entrepreneurProblems: EntrepreneurProblem[] = [
  {
    id: 1, slug: "mauvais-business-pour-profil", title: "Mauvais business pour son profil",
    shortTitle: "Mauvais business", icon: Target, category: "Choix", phase: "Find",
    signals: ["Aucune énergie pour travailler dessus", "Impression de forcer", "Pas d'avantage naturel dans le domaine"],
    rootCause: "Le business a été choisi par imitation ou par attrait du gain, pas par alignement avec le profil, les compétences et le marché accessible.",
    solution: "Repartir du profil : compétences, réseau, ressources disponibles. Choisir un business qui utilise un avantage injuste.",
    actionSteps: ["Lister vos 3 compétences les plus fortes", "Identifier votre réseau et vos accès marché", "Valider un business aligné avec ces avantages"]
  },
  {
    id: 2, slug: "apprendre-sans-executer", title: "Apprendre sans jamais exécuter",
    shortTitle: "Apprendre sans exécuter", icon: Brain, category: "Exécution", phase: "Find",
    signals: ["Consomme beaucoup de formations", "Reporte toujours le passage à l'action", "Sentiment de ne jamais être prêt"],
    rootCause: "L'apprentissage devient un refuge confortable qui donne l'illusion de progresser sans s'exposer au risque du réel.",
    solution: "Appliquer la règle 80/20 inversée : 20% apprentissage, 80% exécution. Chaque formation consommée doit générer une action dans les 24h.",
    actionSteps: ["Stopper toute nouvelle formation pendant 30 jours", "Choisir UNE action concrète à faire aujourd'hui", "Documenter les résultats, pas les connaissances"]
  },
  {
    id: 3, slug: "multi-projets-pas-de-focus", title: "Multi-projets, aucun focus",
    shortTitle: "Multi-projets", icon: Layers, category: "Exécution", phase: "Find",
    signals: ["3+ projets en parallèle", "Aucun n'est rentable", "Change d'idée tous les mois"],
    rootCause: "La diversification prématurée est une fuite : chaque nouveau projet évite de confronter l'échec du précédent.",
    solution: "Choisir UN seul projet et s'y engager pour 90 jours minimum. Tuer tous les autres. Le focus est le multiplicateur n°1.",
    actionSteps: ["Lister tous vos projets actifs", "Garder uniquement celui avec le plus de traction", "Archiver les autres pour 90 jours minimum"]
  },
  {
    id: 4, slug: "pas-de-discipline", title: "Pas de discipline, pas d'action",
    shortTitle: "Pas de discipline", icon: Clock, category: "Mindset", phase: "Find",
    signals: ["Objectifs non tenus", "Routines abandonnées après quelques jours", "Travaille uniquement quand motivé"],
    rootCause: "Dépendance à la motivation plutôt qu'à un système. La motivation est un carburant volatile ; la discipline est un moteur.",
    solution: "Créer un système minimal non-négociable : 2h/jour de travail productif, même sans motivation. Commencer petit et ne jamais casser la chaîne.",
    actionSteps: ["Définir un créneau fixe de 2h/jour pour le business", "Préparer la veille les 3 tâches du lendemain", "Tracker chaque jour complété (streak)"]
  },
  {
    id: 5, slug: "procrastination-productive", title: "Procrastination productive",
    shortTitle: "Fausse productivité", icon: Sparkles, category: "Exécution", phase: "PMF",
    signals: ["Passe du temps sur le logo, les couleurs, le site", "Évite les appels clients", "Beaucoup d'activité mais zéro revenu"],
    rootCause: "Les tâches confortables (design, admin, organisation) remplacent les tâches génératrices de revenus (prospection, vente, livraison).",
    solution: "Appliquer la règle du Revenue First : chaque journée commence par la tâche qui génère le plus directement du revenu.",
    actionSteps: ["Identifier LA tâche revenu du jour (prospection, relance, livraison)", "La faire EN PREMIER avant toute autre chose", "Bloquer les réseaux sociaux pendant cette tâche"]
  },
  {
    id: 6, slug: "pas-de-validation-marche", title: "Pas de validation marché",
    shortTitle: "Pas de validation", icon: ShieldCheck, category: "Offre", phase: "Find",
    signals: ["Construit un produit sans avoir parlé à des clients", "Aucun pré-commande ou pré-paiement", "Hypothèses non testées"],
    rootCause: "La construction remplace la validation. On évite le verdict du marché en restant dans la phase de création.",
    solution: "Valider AVANT de construire : obtenir 3 à 5 pré-paiements ou lettres d'intention avant d'investir dans le développement.",
    actionSteps: ["Décrire votre offre en 3 phrases", "Contacter 20 prospects potentiels cette semaine", "Obtenir au moins 3 engagements concrets"]
  },
  {
    id: 7, slug: "perfectionnisme", title: "Perfectionnisme paralysant",
    shortTitle: "Perfectionnisme", icon: Target, category: "Mindset", phase: "PMF",
    signals: ["Le produit n'est jamais assez bien pour être lancé", "Retarde indéfiniment la mise en marché", "Compare constamment avec des leaders établis"],
    rootCause: "Le perfectionnisme est une forme de peur du jugement déguisée en exigence de qualité.",
    solution: "Lancer une version 1 imparfaite mais fonctionnelle. Le marché vous dira quoi améliorer — pas votre imagination.",
    actionSteps: ["Définir le minimum viable (3 features max)", "Fixer une date de lancement non-négociable", "Lancer et itérer en fonction des retours réels"]
  },
  {
    id: 8, slug: "offre-pas-claire", title: "Offre pas claire ni structurée",
    shortTitle: "Offre floue", icon: Package, category: "Offre", phase: "PMF",
    signals: ["Le client ne comprend pas ce qu'il achète", "Difficulté à expliquer son offre en 30 secondes", "Pas de tarif fixe"],
    rootCause: "L'offre n'a pas été packagée : pas de nom clair, pas de livrables définis, pas de tarifs structurés.",
    solution: "Structurer l'offre en packs avec nom, description, livrables, prix et délai. Le client doit pouvoir dire oui en 5 minutes.",
    actionSteps: ["Créer 3 packs (basique, standard, premium)", "Lister les livrables exacts de chaque pack", "Tester les prix sur 5 prospects cette semaine"]
  },
  {
    id: 9, slug: "prix-trop-bas", title: "Prix trop bas / sous-valorisation",
    shortTitle: "Prix trop bas", icon: DollarSign, category: "Offre", phase: "PMF",
    signals: ["Tarifs inférieurs au marché", "Attire des clients difficiles", "Marge insuffisante pour vivre"],
    rootCause: "Peur de perdre le client, syndrome de l'imposteur, ou méconnaissance de la valeur réelle délivrée.",
    solution: "Augmenter les prix de 30-50% et observer : les bons clients restent, les mauvais partent. Calculer le vrai coût + marge.",
    actionSteps: ["Calculer votre coût réel (temps × tarif horaire souhaité)", "Augmenter vos prix de 30% dès le prochain devis", "Justifier par la valeur, pas par le temps passé"]
  },
  {
    id: 10, slug: "syndrome-imposteur", title: "Syndrome de l'imposteur",
    shortTitle: "Imposteur", icon: UserX, category: "Mindset", phase: "Find",
    signals: ["Ne se sent pas légitime", "Se compare aux experts établis", "Hésite à communiquer ou vendre"],
    rootCause: "Confusion entre expertise absolue et expertise relative. Vous n'avez pas besoin de tout savoir — juste d'en savoir plus que votre client.",
    solution: "Repositionner : vous êtes un guide 3 pas devant votre client, pas un gourou. Collecter des preuves (témoignages, résultats) pour ancrer la confiance.",
    actionSteps: ["Lister 5 résultats concrets que vous avez obtenus", "Demander 3 témoignages à d'anciens clients/collègues", "Publier UN contenu partageant votre expertise cette semaine"]
  },
  {
    id: 11, slug: "syndrome-objet-brillant", title: "Syndrome de l'objet brillant",
    shortTitle: "Objet brillant", icon: Zap, category: "Exécution", phase: "PMF",
    signals: ["Change de stratégie chaque semaine", "Court après chaque nouvelle tendance", "N'applique jamais une méthode assez longtemps"],
    rootCause: "La nouveauté donne un pic de dopamine qui remplace l'effort nécessaire pour qu'une stratégie porte ses fruits.",
    solution: "Choisir UNE stratégie et s'y tenir 90 jours. Aucune nouvelle tactique avant d'avoir épuisé le potentiel de l'actuelle.",
    actionSteps: ["Choisir UN canal d'acquisition", "S'engager pour 90 jours sans changement", "Mesurer les résultats chaque semaine pour ajuster, pas pivoter"]
  },
  {
    id: 12, slug: "herbe-plus-verte", title: "L'herbe est toujours plus verte ailleurs",
    shortTitle: "Herbe plus verte", icon: Eye, category: "Mindset", phase: "Find",
    signals: ["Envie constante de changer de business", "Idéalise les succès des autres", "Minimise ses propres progrès"],
    rootCause: "On compare ses coulisses aux highlights des autres. Chaque business a ses difficultés — celles qu'on ne voit pas de l'extérieur.",
    solution: "Se reconnecter à sa vision originale. Documenter ses propres progrès pour créer une preuve tangible d'avancement.",
    actionSteps: ["Écrire pourquoi vous avez choisi CE business", "Lister 5 progrès concrets depuis le début", "Couper le contenu qui vous fait douter (unfollow si nécessaire)"]
  },
  {
    id: 13, slug: "pas-de-metriques", title: "Aucune métrique suivie",
    shortTitle: "Pas de métriques", icon: BarChart3, category: "Opérations", phase: "PMF",
    signals: ["Ne sait pas combien de prospects contactés ce mois", "Pas de suivi du chiffre d'affaires", "Décisions au feeling"],
    rootCause: "Ce qui n'est pas mesuré ne peut pas être amélioré. Sans données, on navigue à l'aveugle.",
    solution: "Tracker 5 métriques clés maximum : prospects contactés, taux de réponse, clients signés, CA, NPS.",
    actionSteps: ["Créer un tableau de bord simple (Google Sheets suffit)", "Remplir chaque vendredi les métriques de la semaine", "Identifier le goulot d'étranglement n°1 et agir dessus"]
  },
  {
    id: 14, slug: "refuse-investir", title: "Refuse d'investir dans son business",
    shortTitle: "Refuse d'investir", icon: Wallet, category: "Mindset", phase: "PMF",
    signals: ["Utilise uniquement des outils gratuits", "Ne paie pas pour de la formation", "Refuse la publicité payante"],
    rootCause: "Mentalité de dépense vs mentalité d'investissement. Chaque franc bien dépensé dans le business devrait en rapporter 3 à 10.",
    solution: "Calculer le ROI avant chaque dépense. Si 10 000 FCFA de pub rapportent 50 000 FCFA, c'est un investissement, pas une dépense.",
    actionSteps: ["Identifier l'investissement au meilleur ROI pour votre phase", "Allouer 10% du CA au réinvestissement", "Mesurer le retour de chaque investissement"]
  },
  {
    id: 15, slug: "mauvais-business-model", title: "Mauvais business model",
    shortTitle: "Mauvais modèle", icon: Settings, category: "Offre", phase: "Find",
    signals: ["Beaucoup de travail pour peu de marge", "Modèle non scalable", "Dépendance à un seul client"],
    rootCause: "Le modèle a été copié sans adaptation ou choisi sans analyse de la rentabilité unitaire.",
    solution: "Revoir le modèle : marge par client, récurrence, scalabilité. Un bon modèle doit permettre de gagner plus en travaillant pareil ou moins.",
    actionSteps: ["Calculer votre marge nette par client", "Identifier comment créer de la récurrence", "Viser minimum 50% de marge brute"]
  },
  {
    id: 16, slug: "refuse-deleguer", title: "Refuse de déléguer / tout faire soi-même",
    shortTitle: "Tout faire seul", icon: Users, category: "Opérations", phase: "Scale",
    signals: ["Travaille 12h/jour", "Goulot d'étranglement sur toutes les tâches", "Qualité qui baisse par surcharge"],
    rootCause: "Croyance que personne ne peut faire aussi bien, peur de perdre le contrôle, ou incapacité à documenter ses processus.",
    solution: "Déléguer en commençant par les tâches à faible valeur ajoutée. Documenter chaque processus pour permettre la délégation.",
    actionSteps: ["Lister toutes vos tâches de la semaine dernière", "Identifier celles qui ne requièrent PAS votre expertise", "Déléguer la première tâche cette semaine (freelance, assistant)"]
  },
  {
    id: 17, slug: "isolation-pas-de-reseau", title: "Isolation / pas de réseau",
    shortTitle: "Isolation", icon: Network, category: "Mindset", phase: "Find",
    signals: ["Travaille seul sans feedback", "Pas d'entourage entrepreneurial", "Stagne sans savoir pourquoi"],
    rootCause: "L'entrepreneuriat en solo amplifie les doutes et limite les opportunités. Le réseau est un accélérateur invisible.",
    solution: "Rejoindre une communauté d'entrepreneurs. Avoir minimum 3 personnes à qui parler business chaque semaine.",
    actionSteps: ["Rejoindre 1 groupe Facebook/WhatsApp d'entrepreneurs", "Contacter 3 entrepreneurs cette semaine pour échanger", "Planifier un point hebdomadaire avec un pair"]
  },
  {
    id: 18, slug: "peur-de-vendre", title: "Peur de vendre / aversion commerciale",
    shortTitle: "Peur de vendre", icon: Megaphone, category: "Mindset", phase: "PMF",
    signals: ["Évite les appels de vente", "Donne son produit ou fait des réductions massives", "Attend que les clients viennent seuls"],
    rootCause: "Association négative avec la vente (manipulation, arnaque). En réalité, vendre = aider quelqu'un à résoudre son problème.",
    solution: "Reframer la vente : vous ne vendez pas, vous proposez une solution à quelqu'un qui a un problème. La vente est un acte de service.",
    actionSteps: ["Écrire en quoi votre offre AIDE concrètement le client", "Faire 5 appels de prospection cette semaine", "Demander à chaque prospect quel est son plus gros problème"]
  },
  {
    id: 19, slug: "peur-visibilite", title: "Peur de la visibilité / personal branding",
    shortTitle: "Peur d'être visible", icon: Camera, category: "Mindset", phase: "PMF",
    signals: ["Ne publie rien sur les réseaux", "Refuse de montrer son visage", "Peur du jugement de l'entourage"],
    rootCause: "Peur du jugement (famille, amis, anciens collègues). Le coût perçu de l'exposition dépasse le bénéfice perçu.",
    solution: "Commencer petit : publier du contenu de valeur sans forcément montrer son visage. Progresser graduellement. Le jugement disparaît avec les résultats.",
    actionSteps: ["Publier 1 post de conseil cette semaine (pas besoin de vidéo)", "Partager un résultat client (anonymisé si nécessaire)", "Augmenter l'exposition progressivement sur 30 jours"]
  },
  {
    id: 20, slug: "garder-mauvais-collaborateur", title: "Garder un mauvais collaborateur",
    shortTitle: "Mauvais collaborateur", icon: UserMinus, category: "Opérations", phase: "Scale",
    signals: ["Performance insuffisante tolérée", "Ambiance d'équipe dégradée", "Vous faites le travail à sa place"],
    rootCause: "Attachement émotionnel, peur du conflit, ou peur de ne pas trouver de remplacement.",
    solution: "Feedback direct et deadline claire. Si pas d'amélioration en 2 semaines, séparer. Un mauvais élément contamine toute l'équipe.",
    actionSteps: ["Avoir une conversation franche cette semaine", "Fixer des objectifs mesurables sur 14 jours", "Préparer un plan de remplacement en parallèle"]
  },
  {
    id: 21, slug: "peur-echec", title: "Peur de l'échec",
    shortTitle: "Peur de l'échec", icon: AlertTriangle, category: "Mindset", phase: "Find",
    signals: ["Analyse excessive avant chaque décision", "Évite les risques même minimes", "Préfère ne rien faire plutôt que mal faire"],
    rootCause: "L'échec est perçu comme définitif et identitaire (je SUIS un échec) plutôt que comme informatif (j'ai APPRIS quelque chose).",
    solution: "Reframer l'échec : chaque échec est une donnée. Réduire la taille des paris pour rendre l'échec supportable.",
    actionSteps: ["Identifier la plus petite action possible pour tester votre idée", "La faire cette semaine — le pire scénario est de perdre quelques heures", "Documenter ce que vous avez appris, pas ce que vous avez perdu"]
  },
  {
    id: 22, slug: "copier-sans-comprendre", title: "Copier sans comprendre",
    shortTitle: "Copier aveuglément", icon: Copy, category: "Exécution", phase: "Find",
    signals: ["Reproduit les stratégies d'autres sans les adapter", "Ne comprend pas pourquoi ça marche pour les autres", "Résultats inexistants malgré la copie"],
    rootCause: "On copie le visible (tactiques) sans comprendre l'invisible (positionnement, audience, timing, ressources).",
    solution: "Comprendre les principes derrière la stratégie avant de copier l'exécution. Adapter au contexte, pas dupliquer.",
    actionSteps: ["Pour chaque stratégie que vous copiez, écrire POURQUOI elle fonctionne", "Adapter à votre contexte spécifique (audience, budget, compétences)", "Tester sur petit échantillon avant de déployer"]
  },
  {
    id: 23, slug: "desordre-financier", title: "Désordre financier / cash flow",
    shortTitle: "Désordre financier", icon: Calculator, category: "Opérations", phase: "PMF",
    signals: ["Ne sait pas combien il gagne réellement", "Mélange finances perso et pro", "Dépenses supérieures aux revenus"],
    rootCause: "Absence de suivi financier basique. L'argent entre et sort sans visibilité ni contrôle.",
    solution: "Séparer les comptes perso/pro. Tracker revenus et dépenses chaque semaine. Acompte de 50% obligatoire avant tout travail.",
    actionSteps: ["Ouvrir un compte dédié au business (même mobile money)", "Tracker chaque entrée et sortie dans un tableau", "Exiger 50% d'acompte sur chaque nouveau projet"]
  },
  {
    id: 24, slug: "pas-systeme-acquisition", title: "Pas de système d'acquisition répétable",
    shortTitle: "Pas d'acquisition", icon: Repeat, category: "Acquisition", phase: "PMF",
    signals: ["Les clients arrivent au hasard", "Pas de canal d'acquisition défini", "Revenus imprévisibles d'un mois à l'autre"],
    rootCause: "Pas de processus systématique pour générer des prospects. Dépendance au bouche-à-oreille ou à la chance.",
    solution: "Construire UN canal d'acquisition répétable : X messages/jour, X posts/semaine, X budget pub/mois. Prévisible = scalable.",
    actionSteps: ["Choisir 1 canal (prospection directe, contenu, ou pub)", "Définir un volume quotidien (ex: 10 messages/jour)", "Exécuter pendant 30 jours sans interruption"]
  },
  {
    id: 25, slug: "scope-creep", title: "Scope creep / pas de limites client",
    shortTitle: "Scope creep", icon: Expand, category: "Opérations", phase: "PMF",
    signals: ["Le client demande toujours plus sans payer", "Projets qui s'éternisent", "Frustration et épuisement"],
    rootCause: "Pas de cadrage initial clair : livrables, corrections incluses, délais. Le client comble le vide par des demandes.",
    solution: "Contrat avec périmètre précis : nombre de pages, corrections incluses, hors-périmètre listé. Tout extra = devis supplémentaire.",
    actionSteps: ["Rédiger un modèle de contrat avec périmètre clair", "Limiter les corrections à 2 tours inclus", "Facturer tout dépassement avec un tarif défini"]
  },
  {
    id: 26, slug: "scaler-trop-vite", title: "Scaler trop vite / trop compliquer",
    shortTitle: "Scale prématuré", icon: Gauge, category: "Opérations", phase: "Scale",
    signals: ["Embauche avant d'avoir le revenu stable", "Multiplie les outils et process", "Complexité croissante sans valeur ajoutée"],
    rootCause: "L'excitation des premiers résultats pousse à accélérer avant que les fondations soient solides.",
    solution: "Consolider avant de scaler : processus documentés, cashflow stable sur 3 mois, puis seulement recruter ou investir.",
    actionSteps: ["Vérifier que votre CA est stable depuis 3 mois", "Documenter vos 3 processus principaux", "Recruter uniquement quand VOUS êtes le goulot"]
  },
  {
    id: 27, slug: "pas-de-process", title: "Pas de process / chaos opérationnel",
    shortTitle: "Chaos opérationnel", icon: Cog, category: "Opérations", phase: "Scale",
    signals: ["Chaque projet est géré différemment", "Erreurs récurrentes", "Impossible de déléguer sans tout réexpliquer"],
    rootCause: "Le business fonctionne dans la tête du fondateur, pas dans un système documenté et réplicable.",
    solution: "Documenter les 3 processus clés (vente, production, livraison) en étapes simples. Ce qui est documenté peut être délégué et amélioré.",
    actionSteps: ["Choisir LE processus le plus répétitif", "L'écrire étape par étape (max 10 étapes)", "Le tester en le faisant exécuter par quelqu'un d'autre"]
  },
  {
    id: 28, slug: "mauvaise-hygiene-vie", title: "Mauvaise hygiène de vie → pas d'énergie",
    shortTitle: "Pas d'énergie", icon: Heart, category: "Mindset", phase: "Find",
    signals: ["Fatigue constante", "Manque de concentration", "Productivité en chute libre"],
    rootCause: "Sommeil insuffisant, alimentation déséquilibrée, sédentarité. Le corps est le hardware — s'il lâche, le software (business) plante.",
    solution: "Les basiques non-négociables : 7h de sommeil, 30 min d'activité physique, alimentation correcte. C'est un investissement business.",
    actionSteps: ["Se coucher à heure fixe cette semaine (7h de sommeil)", "Ajouter 30 min de marche quotidienne", "Éliminer un aliment ou habitude nuisible"]
  },
  {
    id: 29, slug: "burnout-surmenage", title: "Burnout / surmenage",
    shortTitle: "Burnout", icon: Flame, category: "Mindset", phase: "Scale",
    signals: ["Travaille 7j/7 sans pause", "Perte de passion", "Irritabilité, insomnie, anxiété"],
    rootCause: "Absence de limites entre vie pro et perso, incapacité à déléguer, identification totale au business.",
    solution: "Imposer des limites : jours off non-négociables, délégation urgente des tâches à faible valeur, et rappel que le business doit servir la vie, pas l'inverse.",
    actionSteps: ["Bloquer 1 jour off complet cette semaine", "Identifier 3 tâches à déléguer immédiatement", "Définir un horaire de fin de journée (et le respecter)"]
  },
  {
    id: 30, slug: "pas-de-motivation-profonde", title: "Pas de motivation profonde",
    shortTitle: "Pas de motivation", icon: Compass, category: "Mindset", phase: "Find",
    signals: ["Fait du business par défaut", "Abandonne au premier obstacle", "Pas de vision claire à long terme"],
    rootCause: "Le 'pourquoi' n'est pas assez fort. Sans motivation profonde, chaque difficulté est une raison d'arrêter au lieu d'une raison de persister.",
    solution: "Connecter le business à un enjeu personnel profond : famille, liberté, impact. Ce 'pourquoi' doit être assez fort pour survivre aux mauvais jours.",
    actionSteps: ["Écrire votre vie idéale dans 5 ans (détails concrets)", "Identifier comment votre business y contribue", "Relire cette vision chaque matin pendant 30 jours"]
  }
];

export const getCategories = () => [...new Set(entrepreneurProblems.map(p => p.category))];
export const getPhases = () => [...new Set(entrepreneurProblems.map(p => p.phase))];
export const getProblemBySlug = (slug: string) => entrepreneurProblems.find(p => p.slug === slug);
