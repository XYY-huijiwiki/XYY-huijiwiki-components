# XYY-huiji-wiki-components
用Vue为羊羊百科编写的功能组件。


## 导出数据表格
用于将羊羊百科的剧集数据导出为表格。

### 对应关系
| Github页面 | 羊羊百科页面 | 备注 |
| --- | --- | --- |
| [导出数据表格.html](./src/导出数据表格.html) | [Html:导出数据表格](https://xyy.huijiwiki.com/wiki/Html:导出数据表格) |  |
| [导出数据表格.json](./src/导出数据表格.json) | [Data:导出数据表格.json](https://xyy.huijiwiki.com/wiki/Data:导出数据表格.json) | 在羊羊百科，所有用户都可以修改这个页面，可能会出现两者不一致的情况 |

### 更新记录
- 2023-01-28：更换cdn至jsDeliver，加载速度应该会快一点。
- 2023-01-21：添加羊羊百科内对应HTML代码页面的链接。
- 2023-01-13：更新记录移至Github。
- 2023-01-11：现在获取数据表格时会添加时间戳，避免获取到缓存的旧数据。现在表格中可以正确显示数组等特殊格式。表格文件额外导出一次作为备份。
- 2023-01-10：现在支持在**Data:导出数据表格.json**页面写入wikitext。修复了影响全局样式的问题。在页面其他内容加载完成后再运行。
- 2023-01-09：现在支持多种语言显示。新增在选择框内进行搜索的功能。现在通过**Data:导出数据表格.json**页面加载信息时，禁止打开界面，防止数据未加载完成时打开界面导致报错。
- 2023-01-08：优化选择器和按钮位置。修复自动聚焦模态框右上角叉叉的问题。现在通过**Data:导出数据表格.json**页面加载信息，所有用户都可以编辑。
- 2023-01-07：改为暗色模式，适配羊羊百科的主题颜色。添加更新记录。
- 2023-01-06：添加加载动画和强制间隔时间。
- 2023-01-05：实现基本功能。

### 计划更新
- 语言切换按钮。
- 待灰机把CHP的bug修复后，可以删掉CHP兼容性代码。


## JSON编辑器
尽量让普通用户更方便地编辑JSON文件页面。

### 对应关系
| Github页面 | 羊羊百科页面 |
| --- | --- |
| [JSON编辑器.html](./src/JSON编辑器.html) | [Html:导出数据表格](https://xyy.huijiwiki.com/wiki/Html:剧集卡片/编辑数据) |

### 更新记录
- 2023-01-28：更换cdn至jsDeliver，加载速度应该会快一点。
- 2023-01-13：修复了特殊情况下无法打开界面的问题。