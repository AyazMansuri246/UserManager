import { Button, Dialog, DialogContent, DialogTitle, Stack } from '@mui/material';
import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { User } from '../DataObjects/User';
import { randomArrayItem, useDemoData } from '@mui/x-data-grid-generator';
import { DataGrid, GRID_CHECKBOX_SELECTION_COL_DEF, GridRowSelectionModel } from '@mui/x-data-grid';
import { Role } from '../DataObjects/Role';
import { setSelectionRange } from '@testing-library/user-event/dist/utils';
import RolesEditor from './RolesEditor';

// interface UserObj{
//     id:number;
//     name:string;
//     roles:Array<string>
//   }

interface props {
    onClose: () => void;
    identifyUserObj : User;
    MaxId : number;
}
const UserEditor:React.FC<props> = (props:props) => {
    const { onClose , identifyUserObj , MaxId} = props;
    console.log("The obj is" ,identifyUserObj)
  
    const handleClose = () => {
      onClose();
    };
  
    // const handleListItemClick = (value: string) => {
    //   onClose();
    // };
  
    const emails = [
      "ayaz", 
      "a"
    ]
   console.log("he")

    const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

    const [UserData,setUserData] = useState({
      name:identifyUserObj.UserName,
      password:identifyUserObj.Password

    })

    function inputHandler(e: React.FormEvent<EventTarget>): void {
        const {value,name} = e.target as HTMLInputElement;
        // console.log(value , name);

        setUserData((preval)=>{
          console.log(preval)
          return {
            ...preval,
            [name] : value
          }
          
        })
    }

    // console.log(personName)

    const HandleSubmit = (e: React.FormEvent<EventTarget>)=>{
      e.preventDefault();

      const NewUser = identifyUserObj;
      if(identifyUserObj.UserID==0){
        NewUser.UserID=MaxId +1 ;
      }
      NewUser.UserName = UserData.name;
      NewUser.Password = UserData.password;
      NewUser.Roles = [];
    for(let i=0;i<selectionModel.length;i++){
      for(let j=0;j<RolesArr.length;j++){
        if(selectionModel[i] == RolesArr[j].RoleID){
                   NewUser.Roles.push(RolesArr[j]);
                   break;
        }
      }
    }

    console.log(NewUser);

    handleClose();

    }

 
    //for datagrid for rows
    const rolename=["Admin","Well Manager","Software Engineer","User","Widget Manager"];
let RolesArr:Role[]=[];
    
for(let i=0;i<5;i++){
  const temprole:Role=new Role();
  temprole.RoleID=i+1;
  temprole.RoleName=rolename[i];
  temprole.RolePermissions=[];
  temprole.WellPermissions=[];
  temprole.LastError="";
  RolesArr[i]=temprole;
}

    let userRoles = [];
    for(let i=0;i<identifyUserObj.Roles.length;i++){
      let obj:{id:number,name:string}={id:0,name:"a"};
      obj.id=identifyUserObj.Roles[i].RoleID;
      obj.name=identifyUserObj.Roles[i].RoleName;
      userRoles.push(obj);
    }

    const rows =userRoles;
    const columns = [
      { field: 'id', headerName: 'ID', width: 90 },
      { field: 'name', headerName: 'Role Name', width: 150 },
    ];
    
    const data = { rows, columns };
    const selectedRoleIDArr:number[] = props.identifyUserObj.Roles.map((role) => {return role.RoleID})   

    const [selectionModel, setSelectionModel] = React.useState<number[] | GridRowSelectionModel>(selectedRoleIDArr);
    
    const [rolesDialog,setRoleDialog] = useState<boolean>(false);
    
    function AddRoleFunction(){
      setRoleDialog(true);
    }

    function RoleDialogOpen(){
      setRoleDialog(false);
    }

    return (
        <div className="dialog" >

        <Dialog onClose={handleClose} maxWidth='xl' open={true} >
        <DialogTitle>User Editor</DialogTitle>
       <DialogContent>
        <form>
            <div className="form-group" style={{width:'500px', marginBottom:"20px"}}>
                <label>Name</label>
                <input type="test" className="form-control" aria-describedby="emailHelp" placeholder="Enter Name" name='name' value={UserData.name} onChange={inputHandler}/>
            </div>
            <div className="form-group" style={{width:'500px', marginBottom:"20px"}}>
                <label >Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name='password' value={UserData.password} onChange={inputHandler}/>
            </div>

            {/* <div className="form-group" style={{width:'500px', marginBottom:"20px"}}>
            <label style={{width:'50px'}}>Roles</label>
                <div style={{ height: 300, width: '78%' ,marginLeft: '20%' }}>
                  <DataGrid hideFooter {...data} checkboxSelection columns={columns} 
                  onRowSelectionModelChange={(newRowSelectionModel) => {
                    setSelectionModel(newRowSelectionModel);
                  }}
                  rowSelectionModel={selectionModel}
                     />
                </div>
            </div> */}
  
            {/* <button type="submit" onClick={HandleSubmit} className="btn btn-primary">Submit</button> */}

            
            <label style={{width:'50px'}}>Roles</label>
            <Button variant='contained' onClick={AddRoleFunction} >Add Roles</Button>

            <div style={{ height: 300, width: '78%' ,marginLeft: '20%' }}>
                  <DataGrid hideFooter {...data}  columns={columns} 
                     />
                </div>
              
            {rolesDialog && <RolesEditor RoleDialogOpen={RoleDialogOpen}/>}

            <Stack direction="row" spacing={4}>
              
            <Button variant="contained" color="success" type="submit" 
            onClick={HandleSubmit}
            >Save</Button>
              
            <Button variant="contained" color="error" onClick={handleClose}> Cancel </Button>
            </Stack>
        </form>
        </DialogContent>
        </Dialog>
        </div>
    );
  }


export default UserEditor
