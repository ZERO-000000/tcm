<template>
  <el-container style="border: 1px solid #eee">
    <el-header style="font-size: 14px;background-color:rgb(203, 211, 220);line-height: 60px;">
      <el-row type="flex">
        <el-col style="text-align: left;">
          <el-image style="width: 60px; height: 60px"
                    :src='url'>></el-image>
        </el-col>
        <el-col style="text-align: right;">
          <span>登录人：smalldeng 登录时间：2019-06-13 23：25</span>
          <el-link icon="el-icon-table-lamp" style="margin-left: 20px;"><router-link to="/login" @click.native="logout">注销</router-link></el-link>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="150px" style="margin: 5px 5px;border-radius: 10px;text-align: left;">
        <el-menu :default-openeds="[1]" background-color="rgb(203, 211, 220)" style="height: 100%;" @select="handleSelect">
          <el-submenu
            v-for="(item,index) in menuList"
            :index="item.index"
            :key="item.index"
          >
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>{{item.name}}</span>
              <el-menu-item v-if="item.menuItemList"
                            v-for="(childItem,index) in item.menuItemList"
                            :index="childItem.index"
                            :key="childItem.index"
                            style="width: 114px"
              >
                <span>{{childItem.name}}</span>
              </el-menu-item>
            </template>
          </el-submenu>
        </el-menu>
       </el-aside>
      <el-main id="mainContainer" style="background-color: rgba(235, 238, 245, 1);margin: 5px 5px;border-radius: 10px;padding:5px;">
        <el-tabs type="border-card" style="height: 99%;" closable v-model="editableTabsValue" @edit="handleTabsEdit">
          <el-tab-pane
            :key="item.name"
            v-for="(item,index) in mainTabs"
            :label="item.title"
            :name="item.name"
            style="height: 79vh;"
          >
            <component :is="item.componentName"></component>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
    import Vue from 'vue'
    export default {
      name: "MainContainer",
      data(){
        return {
          url:'',
          editableTabsValue:'2',
          mainTabs:[],
          who:'UsersManage',
          menuList:[
            {
              name:'工作台',
              index:'1'
            },
            {
              name:'项目管理',
              index:'2'
            },
            {
              name:'合同管理',
              index:'3'
            },
            {
              name:'报表管理',
              index:'4'
            },
            {
              name:'系统设置',
              index:'5',
              menuItemList:[
                {
                  name:'组织管理',
                  index:'0',
                  componentPath:'user/UsersManage',
                  componentName:'UsersManage'
                },
                {
                  name:'角色管理',
                  index:'1',
                  componentPath:'role/RoleManage',
                  componentName:'RoleManage'
                },
                {
                  name:'资源管理',
                  index:'2',
                  componentPath:'resource/ResourceManage',
                  componentName:'ResourceManage'
                },
                {
                  name:'流程管理',
                  index:'3',
                  componentPath:'process/ProcessManage',
                  componentName:'ProcessManage'
                }
              ]
            }
          ]
        }
      },
      methods:{
        handleSelect(key, keyPath) {
          console.log(key+"key");
          console.log(keyPath+"keyPath");
          console.log(this.menuList[keyPath[0]-1].menuItemList[key].name);
          let tabName=this.menuList[keyPath[0]-1].menuItemList[key].name;
          let componentPath=this.menuList[keyPath[0]-1].menuItemList[key].componentPath;
          let componentName=this.menuList[keyPath[0]-1].menuItemList[key].componentName;
          console.log(componentPath+"**********componentPath");
          let tabNameIf=this.mainTabs.some((val,index,arr)=>{
            return val.name==tabName;
          })
          if(!tabNameIf){
            this.mainTabs.push({
              title: tabName,
              name: tabName,
              componentPath: componentPath,
              componentName:componentName
            });
          }
          this.editableTabsValue = tabName;
          let childComponent =() => import('../'+componentPath+'.vue');
          Vue.component(componentName,childComponent);
        },
        handleTabsEdit(targetName, action) {
          if (action === 'remove') {
            let tabs = this.mainTabs;
            let activeName = this.editableTabsValue;
            if (activeName === targetName) {
              tabs.forEach((tab, index) => {
                if (tab.name === targetName) {
                  let nextTab = tabs[index + 1] || tabs[index - 1];
                  if (nextTab) {
                    activeName = nextTab.name;
                  }
                }
              });
            }
            this.editableTabsValue = activeName;
            this.mainTabs = tabs.filter(tab => tab.name !== targetName);
          }
        },
        logout(){
          debugger
          this.$axios.post('/logout').then(function(res){
            debugger
            if(res.status==200){
              localStorage.removeItem('token');
            }
          })
        }
      }
    }
</script>

<style scoped>
  .el-submenu .el-menu-item{
    min-width:112px;
  }
</style>
