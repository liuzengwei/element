## AreaPicker

A city picker component based on Cascader, supporting three-level linkage selection of province/city/district.

### Basic Usage

:::demo Basic usage of area picker, supporting three-level selection of province/city/district by default.
```html
<template>
  <el-area-picker v-model="value" placeholder="Please select province/city/district"></el-area-picker>
</template>

<script>
export default {
  data() {
    return {
      value: ''
    };
  }
};
</script>
```
:::

### Level Selection

:::demo The `level` attribute can be used to set the selection level, 1-province only, 2-province and city, 3-province, city and district.
```html
<template>
  <div>
    <div class="block">
      <span class="demonstration">Province only</span>
      <el-area-picker v-model="provinceValue" :level="1" placeholder="Please select province"></el-area-picker>
    </div>
    <div class="block">
      <span class="demonstration">Province and city</span>
      <el-area-picker v-model="cityValue" :level="2" placeholder="Please select province and city"></el-area-picker>
    </div>
    <div class="block">
      <span class="demonstration">Province, city and district</span>
      <el-area-picker v-model="areaValue" :level="3" placeholder="Please select province, city and district"></el-area-picker>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      provinceValue: '',
      cityValue: '',
      areaValue: ''
    };
  }
};
</script>
```
:::

### Multiple Selection

:::demo The `props.multiple` attribute can be used to enable multiple selection mode.
```html
<template>
  <el-area-picker v-model="multipleValue" :props="{ multiple: true }" placeholder="Please select multiple cities"></el-area-picker>
</template>

<script>
export default {
  data() {
    return {
      multipleValue: []
    };
  }
};
</script>
```
:::

### Check Any Level

:::demo The `props.checkStrictly` attribute can be used to set whether to strictly observe the non-association between parent and child, and you can select any level of options.
```html
<template>
  <el-area-picker v-model="strictValue" :props="{ checkStrictly: true }" placeholder="Please select"></el-area-picker>
</template>

<script>
export default {
  data() {
    return {
      strictValue: ''
    };
  }
};
</script>
```
:::

### Disabled

:::demo The `disabled` attribute can be used to disable the area picker.
```html
<template>
  <el-area-picker v-model="disabledValue" :disabled="true" placeholder="Disabled"></el-area-picker>
</template>

<script>
export default {
  data() {
    return {
      disabledValue: '110000'
    };
  }
};
</script>
```
:::

### Clearable

:::demo The `clearable` attribute can be used to set whether it can be cleared.
```html
<template>
  <el-area-picker v-model="clearableValue" :clearable="true" placeholder="Clearable"></el-area-picker>
</template>

<script>
export default {
  data() {
    return {
      clearableValue: '110101'
    };
  }
};
</script>
```
:::

### Filterable

:::demo The `filterable` attribute can be used to enable the search function.
```html
<template>
  <el-area-picker v-model="filterableValue" :filterable="true" placeholder="Filterable"></el-area-picker>
</template>

<script>
export default {
  data() {
    return {
      filterableValue: ''
    };
  }
};
</script>
```
:::

### Custom Field Names

:::demo The `value-key`, `label-key` and `children-key` attributes can be used to customize the field names of options.
```html
<template>
  <el-area-picker 
    v-model="customKeyValue" 
    :value-key="'id'"
    :label-key="'name'"
    :children-key="'items'"
    placeholder="Custom field names">
  </el-area-picker>
</template>

<script>
export default {
  data() {
    return {
      customKeyValue: ''
    };
  }
};
</script>
```

### City Information Event

:::demo The `on-city` event can be used to get detailed information about the selected city, including complete path, code and name.
```html
<template>
  <div>
    <el-area-picker 
      v-model="cityValue" 
      placeholder="Please select city"
      @on-city="handleCityChange">
    </el-area-picker>
    
    <div class="city-info" v-if="cityInfo.city.length > 0">
      <h4>City Information:</h4>
      <p>Complete Path: {{ cityInfo.cityName.join(' / ') }}</p>
      <p>Code Array: {{ cityInfo.cityCode.join(', ') }}</p>
      <p>Last Level Code: {{ cityInfo.cityCodeLast }}</p>
      <p>Last Level Name: {{ cityInfo.cityNameLast }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cityValue: '',
      cityInfo: {
        city: [],
        cityCode: [],
        cityName: [],
        cityCodeLast: '',
        cityNameLast: ''
      }
    };
  },
  methods: {
    handleCityChange(info) {
      this.cityInfo = info;
      console.log('City Information:', info);
    }
  }
};
</script>
```
:::

### Attributes
| Attribute          | Description            | Type            | Accepted Values       | Default   |
|------------- |---------------- |---------------- |---------------------- |-------- |
| value / v-model | binding value | string / number / array | — | — |
| level | level of the cascader, 1-province, 2-province and city, 3-province, city and district | number | 1 / 2 / 3 | 3 |
| check-strictly | whether to strictly observe the non-association between parent and child | boolean | — | false |
| multiple | whether to select multiple options | boolean | — | false |
| placeholder | placeholder of input | string | — | Please select province/city/district |
| size | size of input | string | medium / small / mini | — |
| disabled | whether the area picker is disabled | boolean | — | false |
| clearable | whether the area picker can be cleared | boolean | — | true |
| filterable | whether the area picker is filterable | boolean | — | true |
| separator | option separator | string | — | / |
| show-all-levels | whether to display all levels of the selected value in the input | boolean | — | true |
| collapse-tags | whether to collapse tags in multiple selection mode | boolean | — | false |
| debounce | debounce delay when typing filter keyword, in milliseconds | number | — | 300 |
| before-filter | hook function before filtering with the value to be filtered as its parameter | function | — | — |
| popper-class | custom class name for area picker's dropdown | string | — | — |
| value-key | specify the key name of option value | string | — | value |
| label-key | specify the key name of option label | string | — | text |
| children-key | specify the key name of option children | string | — | children |

### Events
| Event Name      | Description    | Parameters      |
|---------- |-------- |---------- |
| change | triggers when the selected value changes | selected value |
| on-city | triggers when the selected value changes, returns detailed city information | city information object |
| expand-change | triggers when expand option changes | an array of the values of parent options |
| visible-change | triggers when the dropdown appears/disappears | true when it appears, and false otherwise |
| remove-tag | triggers when a tag is removed in multiple selection mode | the value of the tag removed |

### Methods
| Method Name      | Description    | Parameters |
|---------- |-------- |---------- |
| getCheckedNodes | Get selected nodes | — |
| clear | Clear selected options | — |
| toggleDropDownVisible | Toggle the visibility of the dropdown | visible |
| str2Code | Parse address string and display city information | addressStr: address string |

### Slots
| Name | Description |
|------|--------|
| — | Custom option content, parameters: { node, data } |
| empty | Content when there is no matching option |
