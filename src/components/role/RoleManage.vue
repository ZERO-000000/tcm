<template>
  <el-container>
    <el-aside width="300px" style="background-color: rgba(230, 232, 235, 0.39)" highlight-current-row>
      <el-header height="100px">
        <el-form>
          <el-form-item label="角色名" label-width="60px">
            <el-input v-model="roleForm.roleName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="el-icon-search" @click="() => searchRoles()" circle></el-button>
          </el-form-item>
        </el-form>
      </el-header>
      <el-main>
        <el-table
          :data="roleTableData"
          @select="roleCheckChange"
        >
          <el-table-column
            type="selection">
          </el-table-column>
          <el-table-column prop="roleId" label="角色ID"> </el-table-column>
          <el-table-column prop="roleName" label="角色名称" min-width="100px"> </el-table-column>
        </el-table>
      </el-main>
    </el-aside>
    <el-container style="border:5px solid rgb(219, 230, 241)">
      <el-main>
        <el-table
          :height="tableHeight+120"
          :data="roleUserTableData"
          @select="roleUserCheckChange"
          border>
          <el-table-column
            type="selection">
          </el-table-column>
          <el-table-column
            prop="name"
            label="用户名"
            width="120">
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
    <el-container direction="vertical" style="vertical-align: middle;margin: auto;width: 50px;position: relative;display: initial;">
      <el-button class="el-icon-arrow-left" @click="() => addUsers('addUsers')" circle></el-button>
      <el-button style="margin-left: 2px;margin-top: 10px;" class="el-icon-arrow-right" @click="() => delRoleUsers()" circle></el-button>
    </el-container>
    <el-container style="border:5px solid rgb(219, 230, 241)">
      <el-header>
        <el-form :inline="true">
          <el-form-item label="用户名称" :label-width="formLabelWidth">
            <el-input v-model="userForm.userName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="el-icon-search" @click="() => searchUsers()" circle></el-button>
          </el-form-item>
        </el-form>
      </el-header>
      <el-main>
        <el-table
          border
          @selection-change="handleCurrentChange"
          style="width: 100%;">
          <el-table-column
            type="selection">
          </el-table-column>
          <el-table-column
            prop="name"
            label="用户名"
            width="120">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="联系方式">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
    import RoleAddUsers from './RoleAddUsers';
    let id = 1000;
    export default {
        name: "RoleManage",
        data(){
          return {
            tableHeight: window.innerHeight-400,
            addUsersVisible:false,
            currentRow:null,
            roleSid:null,
            roleUserSid:null,
            formLabelWidth: '80px',
            roleForm:{
              roleName:''
            },
            userForm:{
              userName:''
            },
            roleTableData:[],
            roleUserTableData:[],
            tableData:[],
            //分页参数
            total: 1,
            currentPage: 1,
            pageSize: 5
          }
        },
        components:{
          'role-add-users':RoleAddUsers
        },
        created:function(){
        },
        methods:{
          tableRowClassName({row, rowIndex}){
            if (rowIndex === 1) {
              return 'warning-row';
            } else if (rowIndex === 3) {
              return 'success-row';
            }
            return '';
          },
          searchRoles:function () {
            let me=this;
            let params={
              roleName:'系统管理员'
            };
            this.$axios.post('/role/selectByMap',this.$qs.stringify(params)).then(function (res) {
              console.log(res)
              //debugger
              if(res.data){
                me.roleTableData=res.data;
              }
            })
          },
          //添加新用户
          addUsers(refForm){
            if(!this.roleSid){
              this.$message('请先选择角色！');
              return;
            }
            this.addUsersVisible= true;
          },
          //选择角色
          roleCheckChange(selection,row){
            var me=this;
            this.roleSid=row.sid;
            let params={
              roleSid:row.sid
            };
            this.$axios.post('/user/findUserByRoleSid',this.$qs.stringify(params)).then(function (res) {
              debugger
              if(res.data){
                me.roleUserTableData=res.data;
              }
            })
          },
          //行选择
          roleUserCheckChange(selection,row){
            var me=this;
            let params={
              roleUserSid:row.roleUserSid
            };
            this.$axios.post('/user/delUserByRoleUserSid',this.$qs.stringify(params)).then(function (res) {
              debugger
            })
          },
          //分页
          pageCurrentChange(val){
            this.pageSize = val;
            this.currentPage = 1;
            this.searchUsers();
          },
          handleCurrentChange(val){
            this.currentPage = val;
            this.searchUsers();
          },
          //关闭添加用户的窗口
          closeAddUsers(){
            this.addUsersVisible=false;
            //this.searchUsers();
          },
          delRoleUsers(){
            //从角色中删除用户

          }
        }
    }
</script>
<style scoped>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
