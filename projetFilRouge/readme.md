Quelle est la différence entre AngularJS et Angular?
AngularJS est basé sur JavaScript, tandis qu'Angular (version 2 et ultérieures) utilise TypeScript. Angular est également plus rapide, plus modulaire et a une architecture améliorée, tandis qu'AngularJS est plus ancien et moins performant.

Quelle est la nouveauté apporté depuis Angular14 et confirmer en Angular19
Les composants standalone : Angular 14 a introduit la possibilité de créer des composants, directives et pipes sans module NgModule. Cette fonctionnalité a été pleinement intégrée dans Angular 19, simplifiant ainsi la structure des applications.

Lister les étapes nécessaires  à l’installation et / ou configuration d’angularpour commencer  le développement sur son PC ?
Installer node.js et npm
Installer Angular CLI
Faire la commande ng new nom-du-projet –no-standalone
Pour lancer le projet il suffit maintenant de faire ng serve

C’est quoi un composant Angular?
Un composant Angular est une unité de base de l'interface utilisateur. Il associe un modèle (HTML), une logique (TypeScript) et un style (CSS) pour créer une vue spécifique dans l'application. Chaque composant est lié à un sélecteur et peut être utilisé pour afficher et interagir avec des données dans l'application.

C’est quoi une directive Angular? Donnez quelques exemples et dites à quoi servent
Une directive Angular est une classe qui permet de manipuler le DOM en ajoutant ou modifiant son comportement ou son apparence. Elles sont utilisées pour étendre le HTML en ajoutant des fonctionnalités réutilisables.
Exemples de directives :
ngIf : Affiche ou cache un élément basé sur une condition.
ngFor : Itère sur une collection et génère un élément pour chaque élément de la liste.
ngClass : Ajoute ou retire des classes CSS dynamiquement.
Utilité :
Les directives permettent de modifier l'apparence ou le comportement du DOM sans changer directement le code HTML, rendant l'interface plus dynamique et réactive.

C’est quoi un service angular?
Un service Angular est une classe qui contient des méthodes et des logiques réutilisables pour gérer des tâches spécifiques, comme la gestion des données, les appels HTTP, ou la logique métier. Les services sont utilisés pour partager des données et des fonctionnalités entre différents composants et sont injectés dans ces derniers via l'injection de dépendances. Les services permettent de séparer la logique métier du code de présentation, rendant l'application plus modulaire, testable et maintenable.

Que fait la fonction ngOnInit
ngOnInit est un hook de cycle de vie appelé après l'initialisation d'un composant. Il est utilisé pour initialiser des données ou exécuter des actions dès que le composant est prêt, comme récupérer des données depuis un service.

Quels sont les fichiers principaux générés dans un projet Angular
Les fichiers principaux générés dans un projet Angular sont :
src/app/app.component.ts : Composant principal de l'application.
src/app/app.module.ts : Module principal définissant les composants et autres dépendances.
src/index.html : Point d'entrée HTML de l'application.
src/main.ts : Point d'entrée TypeScript pour démarrer l'application.
angular.json : Fichier de configuration du projet Angular.
package.json : Gestion des dépendances du projet.
tsconfig.json : Configuration TypeScript.





C’est quoi le mécanisme de routage en Angular,  comment le met-on en œuvre
Le routage Angular permet de naviguer entre les composants via des URL. Pour le mettre en œuvre :
Importer RouterModule et définir les routes dans app.module.ts.
Ajouter RouterModule.forRoot(routes) dans les imports.
Placer <router-outlet> dans le template pour afficher les composants.
Utiliser routerLink pour naviguer entre les routes.

C’est quoi RxJs?
RxJS (Reactive Extensions for JavaScript) est une bibliothèque pour la programmation asynchrone et événementielle utilisant des flux de données observables. Elle permet de gérer les événements, les requêtes HTTP, et d'autres opérations asynchrones de manière déclarative et réactive avec des opérateurs comme map, filter, merge, etc.

Expliquer  brièvement la notion d’observable et comment l’utiiser
Un observable est un flux de données asynchrones qui émet des valeurs sur le temps. On peut s'y abonner pour recevoir et traiter ces valeurs dès qu'elles sont émises.

Expliquer  la différence entre un subject et un BehaviourSubject
Un Subject est un type d'observable qui permet à plusieurs observateurs de s'abonner et de recevoir des notifications. Il émet des valeurs à chaque abonnement, mais ne conserve pas la dernière valeur émise.
Un BehaviorSubject, quant à lui, est une extension du Subject. Il garde en mémoire la dernière valeur émise et la renvoie immédiatement aux nouveaux abonnés, garantissant qu'ils reçoivent toujours la valeur la plus récente.

Le fichier angular.jsonsert à quoi
Le fichier angular.json est le fichier de configuration principal d'un projet Angular. Il définit les paramètres du projet, comme les options de build, les chemins de fichiers, les configurations de développement, et les paramètres pour les environnements (production, développement, etc.).

Expliquer  à quoi serve ces commandes 
ng serve : Lance le serveur de développement Angular. L'application est accessible par défaut à l'adresse http://localhost:4200.
ng serve --port 4500 : Lance le serveur de développement Angular sur le port 4500 au lieu du port par défaut (4200).
ng g c moncomponent ou ng generate c moncomponent : Génère un nouveau composant nommé moncomponent.
ng g class MaClasse ou ng generate class MaClasse : Génère une nouvelle classe TypeScript nommée MaClasse.
ng g service MonService ou ng generate service MonService : Génère un service Angular nommé MonService.
ng g guard AuthGuard ou ng generate guard AuthGuard : Génère un guard nommé AuthGuard pour protéger les routes d'une application.
ng new GestionVols : Crée un nouveau projet Angular nommé GestionVols.
json-server --watch produit.json --port 3500 : Lance un serveur de simulation d'API REST avec json-server, en écoutant le fichier produit.json et en le servant sur le port 3500.

Comment appelle –t-oncet élément @component et quels sont ces attributs
L'élément @Component est un decorator en Angular utilisé pour définir un composant. Il indique à Angular que la classe qui suit est un composant et contient des métadonnées nécessaires à sa configuration.
Attributs principaux de @Component :
selector : Déclare le nom de la balise HTML utilisée pour inclure le composant dans un template.
templateUrl : Spécifie le fichier HTML associé au composant.
template : Contient directement le code HTML du composant (optionnel à la place de templateUrl).
styleUrls : Spécifie les fichiers CSS associés au composant.
styles : Contient directement les styles CSS du composant (optionnel à la place de styleUrls).
providers : Déclare des services spécifiques au composant pour l'injection de dépendances.
changeDetection : Définit la stratégie de détection de changements pour le composant (par exemple, ChangeDetectionStrategy.OnPush).


Expliquer le mécanisme de composant enfant et composant parent
Le composant parent passe des données à l'enfant avec @Input, et l'enfant envoie des événements au parent avec @Output. Cela permet aux composants de communiquer et d'échanger des informations.
