## Trigger Disparador

Componente para agregar eventos hover, click, focus, etc. a elementos y mostrar un cuadro desplegable.

### Uso básico

:::demo

```html
<div>
  <el-trigger trigger="hover" :show-arrow="true">
    <el-button>Hover</el-button>
    <template slot="content">
      <div style="padding: 12px;">
        Contenido del popup
      </div>
    </template>
  </el-trigger>
</div>
```
:::

### Atributos

| Atributo | Descripción | Tipo | Valores aceptados | Por defecto |
|------|------|------|--------|--------|
| popup-visible / v-model | Si el popup es visible | boolean | — | — |
| trigger | Método de activación | string | hover / click / focus / contextMenu | hover |
| position | Posición del popup | string | top / tl / tr / bottom / bl / br / left / lt / lb / right / rt / rb | bottom |
| show-arrow | Si mostrar flecha | boolean | — | false |

### Eventos

| Nombre | Descripción | Parámetros |
|--------|------|----------|
| popup-visible-change | Se activa cuando cambia la visibilidad | (visible: boolean) |

### Slots

| Nombre | Descripción |
|------|------|
| — | Contenido del disparador |
| content | Contenido del popup |
