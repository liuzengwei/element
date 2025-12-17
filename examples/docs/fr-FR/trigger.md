## Trigger Déclencheur

Composant pour ajouter des événements hover, click, focus, etc. aux éléments et afficher une boîte déroulante.

### Usage basique

:::demo

```html
<div>
  <el-trigger trigger="hover" :show-arrow="true">
    <el-button>Hover</el-button>
    <template slot="content">
      <div style="padding: 12px;">
        Contenu du popup
      </div>
    </template>
  </el-trigger>
</div>
```
:::

### Attributs

| Attribut | Description | Type | Valeurs acceptées | Par défaut |
|------|------|------|--------|--------|
| popup-visible / v-model | Si le popup est visible | boolean | — | — |
| trigger | Méthode de déclenchement | string | hover / click / focus / contextMenu | hover |
| position | Position du popup | string | top / tl / tr / bottom / bl / br / left / lt / lb / right / rt / rb | bottom |
| show-arrow | Afficher la flèche | boolean | — | false |

### Événements

| Nom | Description | Paramètres |
|--------|------|----------|
| popup-visible-change | Déclenché lors du changement de visibilité | (visible: boolean) |

### Slots

| Nom | Description |
|------|------|
| — | Contenu du déclencheur |
| content | Contenu du popup |
