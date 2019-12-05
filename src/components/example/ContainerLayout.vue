<template>
  <el-container style="height:100%;">
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <div class="top">
          <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
            <el-button>上左</el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="Top Center 提示文字" placement="top">
            <el-button>上边</el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="Top Right 提示文字" placement="top-end">
            <el-button>上右</el-button>
          </el-tooltip>
        </div>
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item title="一致性 Consistency" name="1">
            <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
            <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
          </el-collapse-item>
          <el-collapse-item title="反馈 Feedback" name="2">
            <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
            <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
          </el-collapse-item>
          <el-collapse-item title="效率 Efficiency" name="3">
            <div>简化流程：设计简洁直观的操作流程；</div>
            <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
            <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
          </el-collapse-item>
          <el-collapse-item title="可控 Controllability" name="4">
            <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
            <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
          </el-collapse-item>
        </el-collapse>
        <div class="block">
          <div class="radio">
            排序：
            <el-radio-group v-model="reverse">
              <el-radio :label="true">倒序</el-radio>
              <el-radio :label="false">正序</el-radio>
            </el-radio-group>
          </div>

          <el-timeline :reverse="reverse">
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :timestamp="activity.timestamp">
              {{activity.content}}
            </el-timeline-item>
          </el-timeline>
        </div>
        <el-divider></el-divider>
        <div class="demo-image">
          <div class="block" v-for="fit in fits" :key="fit">
            <span class="demonstration">{{ fit }}</span>
            <el-image
              style="width: 100px; height: 100px"
              :src="url"
              :fit="fit"></el-image>
          </div>
        </div>
        <el-page-header @back="goBack" content="详情页面">
        </el-page-header>
        <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop>
        <div>
          <el-button :plain="true" @click="open">打开消息提示</el-button>
          <el-button :plain="true" @click="openVn">VNode</el-button>
          <el-button type="text" @click="open1">点击打开 Message Box</el-button>
          <el-button
            plain
            @click="open2">
            可自动关闭
          </el-button>
          <el-button
            plain
            @click="open3">
            不会自动关闭
          </el-button>
        </div>
        <div>
          <el-alert
            title="成功提示的文案"
            type="success">
          </el-alert>
          <el-alert
            title="消息提示的文案"
            type="info">
          </el-alert>
          <el-alert
            title="警告提示的文案"
            type="warning">
          </el-alert>
          <el-alert
            title="错误提示的文案"
            type="error">
          </el-alert>
        </div>
        <div>
          <el-badge :value="12" class="item">
            <el-button size="small">评论</el-button>
          </el-badge>
          <el-badge :value="3" class="item">
            <el-button size="small">回复</el-button>
          </el-badge>
          <el-badge :value="1" class="item" type="primary">
            <el-button size="small">评论</el-button>
          </el-badge>
          <el-badge :value="2" class="item" type="warning">
            <el-button size="small">回复</el-button>
          </el-badge>

          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              点我查看<i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item class="clearfix">
                评论
                <el-badge class="mark" :value="12" />
              </el-dropdown-item>
              <el-dropdown-item class="clearfix">
                回复
                <el-badge class="mark" :value="3" />
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        <el-progress type="circle" :percentage="0"></el-progress>
        <el-progress type="circle" :percentage="25"></el-progress>
        <el-progress type="circle" :percentage="100" status="success"></el-progress>
        <el-progress type="circle" :percentage="70" status="warning"></el-progress>
        <el-progress type="circle" :percentage="50" status="exception"></el-progress>
        <el-progress :percentage="100" status="success"></el-progress>
        <el-progress :percentage="100" status="warning"></el-progress>
        <el-progress :percentage="50" status="exception"></el-progress>
        <el-tag>标签一</el-tag>
        <el-tag type="success">标签二</el-tag>
        <el-tag type="info">标签三</el-tag>
        <el-tag type="warning">标签四</el-tag>
        <el-tag type="danger">标签五</el-tag>
        <el-transfer v-model="value4" :data="data"></el-transfer>
        <el-row>
          <el-button type="primary">主要按钮</el-button>
          <el-button type="success">成功按钮</el-button>
          <el-button type="warning">警告按钮</el-button>
        </el-row>
        <el-row>
          <el-button type="primary" round>主要按钮</el-button>
          <el-button type="success" round>成功按钮</el-button>
          <el-button type="warning" round>警告按钮</el-button>
        </el-row>
        <el-row>
          <el-button type="primary" circle>主要按钮</el-button>
          <el-button type="success" circle>成功按钮</el-button>
          <el-button type="warning" circle>警告按钮</el-button>
        </el-row>
        <div>
          <el-link type="primary" href="https://www.baidu.com/">百度</el-link>
        </div>
        <div>
          <el-radio v-model="radio" label="1">备选项</el-radio>
          <el-radio v-model="radio" label="2">备选项</el-radio>
          <el-checkbox v-model="checked">备选项</el-checkbox>
          <el-input v-model="input" placeholder="请输入内容"></el-input>
          <el-input-number v-model="num" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">

            </el-option>
          </el-select>
        </div>
        <div class="block">
          <span class="demonstration">默认 click 触发子菜单</span>
          <el-cascader
            v-model="value"
            :options="options"
            @change="handleChange"></el-cascader>
        </div>
        <div class="block">
          <span class="demonstration">hover 触发子菜单</span>
          <el-cascader
            v-model="value"
            :options="options"
            :props="{ expandTrigger: 'hover' }"
            @change="handleChange"></el-cascader>
        </div>
        <div class="block">
          <el-switch
            v-model="value1"
            active-color="#13ce66"
            inactive-color="#ff4949"></el-switch>
        </div>
        <div class="block">
          <span class="demonstration">自定义初始值</span>
          <el-slider v-model="value2"></el-slider>
        </div>
        <div>
          <el-time-select
            v-model="value"
            :picker-options="{
              start: '08:30',
              step: '00:15',
              end: '18:30'
            }"
            placeholder="选择时间">
          </el-time-select>
        </div>
        <div class="block">
          <span class="demonstration">默认</span>
          <el-date-picker
            v-model="value1"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
        <div class="block">
          <span class="demonstration">带快捷选项</span>
          <el-date-picker
            v-model="value2"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </div>
        <div class="block">
          <span class="demonstration">默认</span>
          <el-date-picker
            v-model="value"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </div>
        <div>
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </div>
        <div class="block">
          <span class="demonstration">默认不区分颜色</span>
          <el-rate v-model="value3"></el-rate>
        </div>
        <div class="block">
          <span class="demonstration">有默认值</span>
          <el-color-picker v-model="color1"></el-color-picker>
        </div>
        <el-table
          :data="tableData"
          style="width: 100%"
          v-loading="loading"
          :row-class-name="tableRowClassName">
          <el-table-column
            prop="date"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script>
    export default {
      name: "ContainerLayout",
      data(){
        const generateData= _=>{
            const data = [];
            for (let i = 1; i <= 15; i++) {
              data.push({
                key: i,
                label: `备选项 ${ i }`,
                disabled: i % 4 === 0
              })
            }
            return data;
        };
        return {
          loading: true,
          treeData:[{
            label: '一级 1',
            children: [{
              label: '二级 1-1',
              children: [{
                label: '三级 1-1-1'
              }]
            }]
          }, {
            label: '一级 2',
            children: [{
              label: '二级 2-1',
              children: [{
                label: '三级 2-1-1'
              }]
            }, {
              label: '二级 2-2',
              children: [{
                label: '三级 2-2-1'
              }]
            }]
          }, {
            label: '一级 3',
            children: [{
              label: '二级 3-1',
              children: [{
                label: '三级 3-1-1'
              }]
            }, {
              label: '二级 3-2',
              children: [{
                label: '三级 3-2-1'
              }]
            }]
          }],
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }],
          data: generateData(),
          value4: [1, 4],
          radio:"1",
          checked:true,
          input:'smalldeng',
          num:1,
          options:[
            {
              value:'选项1',
              label:'黄金糕'
            },
            {
              value:'选项2',
              label:'双皮奶'
            },
            {
              value:'选项3',
              label:'蚵仔煎'
            }
          ],
          reverse: true,
          activities: [{
            content: '活动按期开始',
            timestamp: '2018-04-15'
          }, {
            content: '通过审核',
            timestamp: '2018-04-13'
          }, {
            content: '创建成功',
            timestamp: '2018-04-11'
          }],
          value:'',
          value1:true,
          value2:20,
          fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
          url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          value3:null,
          color1: '#409EFF',
          fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
        }
      },
      methods: {
        handleChange(value) {
          console.log(value);
        },
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handlePreview(file) {
          console.log(file);
        },
        handleExceed(files, fileList) {
          this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
          return this.$confirm(`确定移除 ${ file.name }？`);
        },
        tableRowClassName({row, rowIndex}) {
          if (rowIndex === 1) {
            return 'warning-row';
          } else if (rowIndex === 3) {
            return 'success-row';
          }
          return '';
        },
        open() {
          this.$message('这是一条消息提示');
        },
        open1() {
          this.$alert('这是一段内容', '标题名称', {
            confirmButtonText: '确定',
            callback: action => {
              this.$message({
                type: 'info',
                message: `action: ${ action }`
              });
            }
          });
        },
        openVn() {
          const h = this.$createElement;
          this.$message({
            message: h('p', null, [
              h('span', null, '内容可以是 '),
              h('i', { style: 'color: teal' }, 'VNode')
            ])
          });
        },
        open2() {
          const h = this.$createElement;

          this.$notify({
            title: '标题名称',
            message: h('i', { style: 'color: teal'}, '这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案')
          });
        },

        open3() {
          this.$notify({
            title: '提示',
            message: '这是一条不会自动关闭的消息',
            duration: 0
          });
        },
        goBack() {
          console.log('go back');
        }
      }
    }
</script>

<style>
  .el-table .warning-row {
    background: oldlace;
  }
  .el-table .success-row {
    background: #f0f9eb;
  }
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: inherit;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
    border-radius: 30px;
  }

  body > .el-container {
    margin-bottom: 40px;
    height: 100%;
  }
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .item {
    margin-top: 10px;
    margin-right: 40px;
  }
</style>
