import { Dialog, DialogTitle, DialogContent, Stack, Button } from '@mui/material';
import { GridRowSelectionModel, DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react'
import { Role } from '../DataObjects/Role';

interface props {
  RoleDialogOpen: () => void;
  handleRoleArray: (arr: number[] | GridRowSelectionModel)=> void
}

const RolesEditor:React.FC<props> = (props) => {

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
    
        const rows = [
          { id: RolesArr[0].RoleID, name: RolesArr[0].RoleName},
          { id: RolesArr[1].RoleID, name: RolesArr[1].RoleName},
          { id: RolesArr[2].RoleID, name: RolesArr[2].RoleName},
          { id: RolesArr[3].RoleID, name: RolesArr[3].RoleName},
          { id: RolesArr[4].RoleID, name: RolesArr[4].RoleName},
        ];
        const columns = [
          { field: 'id', headerName: 'ID', width: 90 },
          { field: 'name', headerName: 'Role Name', width: 150 },
        ];
        
        const data = { rows, columns };

        const [RoleDialogOpen,setRoleDialogOpen] = useState<boolean>(true);
  function handleClose(): void {
    console.log("closed");
    props.RoleDialogOpen();

  }

  function HandleSubmit(): void {
    console.log("In Add roles ", selectionModel);

    props.handleRoleArray(selectionModel);

    props.RoleDialogOpen();
  }

        // const selectedRoleIDArr:number[] = props.identifyUserObj.Roles.map((role) => {return role.RoleID})   
    
        const [selectionModel, setSelectionModel] = React.useState<number[] | GridRowSelectionModel>([]);
        
        
  return (
    <div>
      
      <Dialog onClose={handleClose} maxWidth='xl' open={RoleDialogOpen} >
        <DialogTitle>User Editor</DialogTitle>
       <DialogContent>
        <form>
            

            <div className="form-group" style={{width:'500px', marginBottom:"20px"}}>
                <label style={{width:'50px'}}>Roles</label>
                <div style={{ height: 300, width: '78%' ,marginLeft: '20%' }}>
                  <DataGrid hideFooter {...data} checkboxSelection columns={columns} 
                  onRowSelectionModelChange={(newRowSelectionModel) => {
                    setSelectionModel(newRowSelectionModel);
                  }}
                  rowSelectionModel={selectionModel}
                  
                     />
                </div>
            </div>
  
            {/* <button type="submit" onClick={HandleSubmit} className="btn btn-primary">Submit</button> */}
            <Stack direction="row" spacing={4}>
              
            <Button variant="contained" color="success"  onClick={HandleSubmit}>Save</Button>
              
            <Button variant="contained" color="error" onClick={handleClose}> Cancel </Button>
            </Stack>
        </form>
        </DialogContent>
        </Dialog>
    </div>
  )
}

export default RolesEditor
