<template>
  <el-container style="height: 100%">
    <el-aside class="user_aside" style="width: 300px;">
      <el-tree
        style="width: 99%;height: 100%"
        v-bind:data="treeData"
        show-checkbox
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        @check="treeCheckChange"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
          <span>
            <el-button
              type="text"
              size="mini"
              icon="el-icon-circle-plus"
              circle
              @click="() => openAddDialog(node,data)">
            </el-button>
            <el-button
              type="text"
              size="mini"
              icon="el-icon-edit"
              circle
              @click="() => openUpdateDialog(node)">
            </el-button>
            <el-button
              type="text"
              size="mini"
              icon="el-icon-remove"
              circle
              @click="() => remove(node,data)">
            </el-button>
          </span>
          <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="400px">
            <el-form :model="form">
              <el-form-item label="组织名称" :label-width="formLabelWidth">
                <el-input v-model="form.orgName" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="() => append(nodeData)">确 定</el-button>
            </div>
          </el-dialog>
        </span>
      </el-tree>
    </el-aside>
    <el-container style="height: 100%;">
      <el-header height="100px">
        <el-form>
          <el-form-item label="用户名称" :label-width="formLabelWidth">
            <el-input v-model="userForm.userName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item style="text-align: left">
              <el-button class="el-icon-search" @click="() => searchUsers()" circle></el-button>
              <el-button type="success" class="el-icon-plus" @click="() => addUsers('addUsers')" circle></el-button>
              <add-users ref="addUsers" v-if="addUsersVisible" :add-org-sid="orgSid" :current-user="currentRow" :user-visible="addUsersVisible" @closeAddUsers="closeAddUsers"></add-users>
              <el-button type="primary" class="el-icon-edit" @click="() => updateUsers()" circle></el-button>
              <el-button type="danger" class="el-icon-delete" @click="() => delUsers()" circle></el-button>
          </el-form-item>
        </el-form>
      </el-header>
      <el-main style="height: 100%;">
        <el-table
          v-bind:data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
          border
          @selection-change="handleCurrentChange"
          style="width: 100%;">
          <el-table-column
            type="selection">
          </el-table-column>
          <el-table-column
            prop="name"
            label="用户名"
            width="180">
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
        <el-pagination background
                       @size-change="pageCurrentChange"
                       @current-change="handleCurrentChange"
                       :current-page="currentPage"
                       :page-sizes="[5,10, 50, 100]"
                       :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="total">
        </el-pagination>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
    import AddUsers from './AddUsers';
    let id = 1000;
    export default {
        name: "UsersManage",
        data(){
          return {
            //tableHeight: window.innerHeight-400,
            currentRow:null,
            tableData:[],
            orgSid:null,
            nodeData:{},
            dialogTitle:'',
            dialogTableVisible: false,
            dialogFormVisible: false,
            addUsersVisible:false,
            formLabelWidth: '80px',
            form:{
              orgId:'',
              orgName:'',
              parentSid:'',
              sid:'',
              op:''
            },
            userForm:{
              userName:''
            },
            treeData:[],
            //分页参数
            total: 1,
            currentPage: 1,
            pageSize: 5
          }
        },
        components:{
          'add-users':AddUsers
        },
        created:function () {
          this.getTreeData();
        },
        methods: {
          openAddDialog(node,data){
            this.dialogTitle="添加节点";
            this.dialogFormVisible=true;
            this.form.orgName='';
            this.form.op="I";
            this.form.sid=node.data.id;
            this.nodeData=data;
          },
          openUpdateDialog(node){
            this.dialogTitle="修改节点";
            this.dialogFormVisible=true;
            this.form.orgName=node.label;
            this.form.op="U";
            this.form.sid=node.data.id;
          },
          append(data) {
            debugger
            let me=this;
            let orgId=this.form.orgId;
            let orgName=this.form.orgName;
            // if(orgId==""){
            //   this.$message('组织ID不能为空！');
            //   return;
            // }
            if(orgName==""){
              this.$message('组织名称不能为空！');
              return;
            }
            let op=this.form.op;
            let params={
              orgName:orgName,
              parentSid:this.form.sid
            };
            if(op=="I"){
              this.$axios.post('/org/save',this.$qs.stringify(params)).then(function(res){
                //关闭窗口
                me.dialogFormVisible=false;
                const newChild = { label: me.form.orgName, children: []};
                if (!data.children) {
                  me.$set(data, 'children', []);
                }
                data.children.push(newChild);
              })
            }else if(op=="U"){
              this.$axios.post('/org/save').then(function(res){
                me.dialogFormVisible=false;
              })
            }
          },
          remove(node, data) {
            debugger
            let sid=node.data.id;
            if(sid==0){
              this.$message('根节点不能删除');
              return;
            }
            let params={
              sid:sid
            };
            this.$axios.post('/org/deleteOrgCascade',this.$qs.stringify(params)).then(function(res){
              console.log(res)
              const parent = node.parent;
              const children = parent.data.children || parent.data;
              const index = children.findIndex(d => d.id === data.id);
              children.splice(index, 1);
            })
          },
          getTreeData(){
            let me=this;
            this.$axios.post('/org/findOrgTreeInfo').then(function(res){
              me.treeData=res.data;
              console.log(res)
            })
          },
          searchUsers(){
            let me=this;
            let cm={
              orgSid:this.orgSid
            };
            this.$axios.post('/user/selectByMap',this.$qs.stringify(cm)).then(function (res){
              if(res.data){
                debugger
                me.total = res.data.length;
                //me.currentPage = 1;
                me.tableData=res.data;
              }
            });
          },
          treeCheckChange(obj, checkedObj){
            this.orgSid=obj.id;
            this.searchUsers();
          },
          //添加新用户
          addUsers(refForm){
            if(!this.orgSid){
              this.$message('请先选择组织机构！');
              return;
            }
            this.addUsersVisible= true;
          },
          //关闭添加用户的窗口
          closeAddUsers(){
            this.addUsersVisible=false;
            this.searchUsers();
          },
          //行选择
          handleCurrentChange(selection){
            this.currentRow = selection[0];
          },
          //编辑用户
          updateUsers(){
            this.addUsersVisible= true;
          },
          //删除用户
          delUsers(){
            let me=this;
            let cm={
              id:this.currentRow.sid
            };
            this.$axios.post('/user/removeById',this.$qs.stringify(cm)).then(function(res){
              me.searchUsers();
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
          }
        }
    }
</script>

<style scoped>
  .user_aside{
    background-color: #8c939d;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
