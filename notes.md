## paper

paper: paper.PaperScope -- paper.js导出的唯一全局变量

通过new paper.PaperScope()来创建新的paper

paper变量一直引用的是最新创建的PaperScope

```javascript
class PaperScope {
    version: string, //
    settings: {insertItems: true, applyMatrix: true, handleSize: 4, hitTolerance: 0},
    project: Project,
    projects: Project[],
    view: View, // 当前激活project的view
    tool: Tool,
    tools: Tool[],

    function setup(HTMLCanvasElement) {} // 根据element初始化project和view
    function activate(){} // 激活paper，新创建的元素将添加到这个paper的激活project中
    function get(id){} // 获取指定id的paper
}
```

## project

project: paper.Project(element)

一个project对应一个canvas，project负责增删查改元素和持久化，当前激活的project可以通过paper.project访问。所有创建的project都存在于paper.projects数组中。

### 属性

- `view`: project’s view
- `currentStyle`: 当前样式，所有新添加的元素都将应用这个样式作为默认样式。
- `index`: 此project在paperScope.projects列表中的索引。[只读]

### 内容

- `layers`: project中的所有画布层的集合 [只读]
- `activeLayer`: project中当前激活的层，新创建的元素将添加到此层中 [只读]
- `symbolDefinitions`: 符号定义，用来共享图形元素 [只读]
- `selectedItems`: project中被选择的元素集合 [只读]

### 方法

- `activate()`: 激活当前project
- `clear()`: Clears the project by removing all project.layers.
- `isEmpty():Boolean` Checks whether the project has any content or not.
- `remove()`: 在projects中移除此project，同时也删除project的view
- `selectAll()`: 选择project中的所有元素
- `deselectAll()`: 全不选

### 层级操作

- `addLayer(layer)`: 向layers列表的末尾添加一个层layer。
- `insertLayer(index, item)`: 在指定位置插入层。

以上两个函数如果返回`null`则代表失败

### 点击测试，获取和匹配元素

- `hitTest(point[, options])`: 测试某点是否位于某元素上。
- `hitTestAll(point[, options])`: 
- `getItems(options)`: 选取特定的item
- `getItem(options)`:

### 导入/导出SVG或者JSON

- `exportJSON([options])`:
- `importJSON(json)`:
- `exportSVG([options])`:
- `importSVG(svg[, options])`:
- `importSVG(svg, onLoad)`:

