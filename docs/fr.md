# Gladys World Clocks — Documentation française

## Présentation

**Gladys World Clocks** est une intégration externe pour Gladys Assistant permettant d'afficher jusqu'à quatre horloges internationales dans un seul widget du tableau de bord.

Elle est particulièrement utile pour suivre l'heure de plusieurs villes ou pays sans effectuer de conversions horaires manuelles.

## Fonctionnalités

- Affichage de 1, 2, 3 ou 4 horloges.
- Nom personnalisable pour chaque horloge.
- Sélection du fuseau horaire dans une liste déroulante IANA.
- Format horaire 24 heures.
- Gestion automatique de l'heure d'été et de l'heure d'hiver.
- Configuration directement dans le dashboard Gladys.
- Cache du widget de 10 secondes.

## Prérequis

- Gladys Assistant 5.3.2.
- Raspberry Pi 64 bits ou autre serveur Docker compatible.
- Accès à l'interface web Gladys.
- Connexion Internet pour télécharger l'intégration.

Aucun accès SSH n'est nécessaire pour l'installation depuis Gladys.

## Installation

1. Ouvrez Gladys Assistant.
2. Accédez au menu **Intégrations**.
3. Choisissez **Installer une intégration**.
4. Ajoutez l'intégration à partir du dépôt GitHub :

   https://github.com/bnabih/gladys-world-clocks

5. Lancez l'installation.
6. Attendez que l'intégration soit démarrée.

Si l'intégration n'apparaît pas dans le catalogue, utilisez l'option d'installation depuis GitHub disponible dans votre version de Gladys.

## Ajouter le widget

1. Ouvrez le **Dashboard**.
2. Cliquez sur **Éditer**.
3. Sélectionnez **Ajouter un widget**.
4. Recherchez **World Clocks**.
5. Ajoutez le widget à votre tableau de bord.
6. Configurez les horloges.
7. Enregistrez les modifications.

## Configuration

Le widget propose neuf paramètres.

| Paramètre | Description |
|---|---|
| `clock_count` | Nombre d'horloges à afficher (1 à 4) |
| `name_1` | Nom de la première horloge |
| `timezone_1` | Fuseau horaire de la première horloge |
| `name_2` | Nom de la deuxième horloge |
| `timezone_2` | Fuseau horaire de la deuxième horloge |
| `name_3` | Nom de la troisième horloge |
| `timezone_3` | Fuseau horaire de la troisième horloge |
| `name_4` | Nom de la quatrième horloge |
| `timezone_4` | Fuseau horaire de la quatrième horloge |

Les paramètres des horloges non affichées sont conservés dans la configuration du widget.

### Configuration initiale

| Horloge | Nom | Fuseau horaire |
|---|---|---|
| 1 | Locale | Europe/Zurich |
| 2 | Beyrouth | Asia/Beirut |
| 3 | Casablanca | Africa/Casablanca |
| 4 | Paris | Europe/Paris |

Ces valeurs peuvent être modifiées à tout moment.

### Choisir un fuseau horaire

Chaque horloge dispose d'une liste déroulante contenant des fuseaux horaires géographiques IANA.

Exemples :

- `Europe/Zurich`
- `Europe/Paris`
- `Asia/Beirut`
- `Africa/Casablanca`
- `America/New_York`
- `Asia/Tokyo`
- `Pacific/Auckland`

La liste est définie dans le manifeste de l'intégration. Elle ne comprend pas nécessairement tous les alias historiques IANA.

### Modifier le nombre d'horloges

Dans les paramètres du widget, choisissez une valeur entre 1 et 4.

Si vous passez de quatre à deux horloges, seules les deux premières sont affichées. Les paramètres des autres horloges restent enregistrés.

## Fonctionnement de l'heure

L'intégration utilise l'API JavaScript `Intl.DateTimeFormat` pour calculer l'heure dans chaque fuseau horaire.

Les changements d'heure été/hiver sont gérés automatiquement selon les données de fuseaux horaires disponibles dans l'environnement Node.js.

Aucune API météo ou service horaire externe n'est nécessaire.

## Actualisation et synchronisation

Le widget utilise actuellement :

```javascript
ttl_seconds: 10
```

Cette valeur correspond à une durée de cache de 10 secondes.

Elle ne signifie pas que l'affichage est garanti exactement toutes les 10 secondes.

Contrairement à l'horloge native de Gladys, l'heure est calculée côté intégration puis transmise au dashboard.

Un léger décalage peut donc apparaître lors du changement de minute.

**Exemple :**

- Horloge native Gladys : `16:34`
- World Clocks : `16:33`

Le widget peut afficher la nouvelle minute quelques secondes plus tard.

Ce comportement ne signifie pas nécessairement que le fuseau horaire est incorrect.

## Dépannage

### L'intégration affiche « This integration has no configuration options »

C'est normal.

Les paramètres des horloges sont définis dans le widget du dashboard, et non dans la configuration générale de l'intégration.

### Le widget n'apparaît pas

Vérifiez que :

1. L'intégration est installée.
2. Son conteneur est démarré.
3. La version publiée contient le widget `world_clocks`.
4. Le dashboard est en mode édition.

### L'heure est en retard

Attendez le prochain rafraîchissement du widget.

Vérifiez que l'intégration installée utilise bien la version avec un cache de 10 secondes.

Un léger décalage reste possible.

### L'heure est incorrecte de plusieurs heures

Vérifiez le fuseau horaire sélectionné.

Par exemple, `Europe/Zurich` et `Europe/Paris` affichent normalement la même heure, tandis que `Asia/Beirut` utilise un autre fuseau.

### Une ville n'apparaît pas

Vérifiez que le nombre d'horloges configuré est suffisant et que le fuseau souhaité est disponible dans la liste déroulante.

## Mettre à jour l'intégration

Lorsqu'une nouvelle version est publiée :

1. Ouvrez **Intégrations** dans Gladys.
2. Sélectionnez **Gladys World Clocks**.
3. Vérifiez si une mise à jour est proposée.
4. Installez la nouvelle version.
5. Attendez le redémarrage de l'intégration.
6. Vérifiez le dashboard.

Les nouvelles versions sont publiées depuis GitHub Actions et distribuées sous forme d'images Docker.

## Limites connues

- La synchronisation avec l'horloge native n'est pas exacte à la seconde.
- Le widget actuel affiche les heures et les minutes, sans secondes défilantes.
- Les paramètres sont limités à quatre horloges par instance.
- Les options de fuseaux horaires sont définies dans le manifeste.

## Support et code source

Dépôt GitHub :

https://github.com/bnabih/gladys-world-clocks

Pour signaler un problème :

https://github.com/bnabih/gladys-world-clocks/issues

## Licence

Apache License 2.0.

Consultez le fichier `LICENSE` à la racine du dépôt.
