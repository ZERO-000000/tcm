<template>
    <el-dialog ref="userDialog" title="添加用户" :visible.sync="userVisible" width="400px" :before-close="closeUserDialog">
      <el-form ref="userForm">
        <el-form-item label="用户ID：" prop="id">
          <el-input v-model="userForm.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名称：" prop="name">
          <el-input v-model="userForm.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="() => addUserConfirm()">确 定</el-button>
      </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "RoleAddUsers",
        props: {
          userVisible: {
            type: Boolean,
            default: false
          },
          selectedRoleSid:null,
          currentUser:null
        },
        data(){
          return {
            userForm:{
              sid:null,
              id:'',
              name:'',
              orgSid:null
            }
          }
        },
        created:function () {
          this.initForm();
        },
        methods:{
          initForm:function () {
            this.userForm.id=this.currentUser.id;
            this.userForm.name=this.currentUser.name;
            this.userForm.orgSid=this.currentUser.orgSid;
            this.userForm.sid=this.currentUser.sid;
          },
          addUserConfirm:function(){
            let me=this;
            if(this.userForm.id==''){
              this.$message('用户ID不能为空');
              return;
            }else if(this.userForm.name==''){
              this.$message('用户名不能为空');
              return;
            }
            this.userForm.orgSid=this.addOrgSid;
            this.$axios.post('/user/save',this.$qs.stringify(this.userForm)).then(function(res){
              me.$emit('closeAddUsers')
            })
          },
          closeUserDialog:function () {
            this.$emit('closeAddUsers')
          }
        }
    }
</script>

<style scoped>

</style>
