import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridSlots,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from '@mui/x-data-grid-generator';
import { Dialog, DialogTitle, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import UserEditor from './UserEditor';
import {User} from '../DataObjects/User';
import {Role} from "../DataObjects/Role";
import { RolePermission } from '../DataObjects/RolePermission';
import { RoleWellPermission } from '../DataObjects/RoleWellPermission';
  

const rolename=["Admin","Well Manager","Software Engineer","User","Widget Manager"];
let r1:Role[]=[];

for(let i=0;i<5;i++){
  const temprole:Role=new Role();
  temprole.RoleID=i+1;
  temprole.RoleName=rolename[i];
  temprole.RolePermissions=[];
  temprole.WellPermissions=[];
  temprole.LastError="";
  r1[i]=temprole;
}
// console.log(r1);
let usernames=["Shlok","ABC","DEF"];
let UserArr:User[]=[];
for(let i=0;i<3;i++){

  const tempUser:User =new User();
  tempUser.UserName=usernames[i];
  tempUser.UserID=i+1;
  tempUser.Password=usernames[i]+"12345";
  tempUser.LastError="";
  tempUser.Warnings="";
  tempUser.Roles=[randomArrayItem(r1),randomArrayItem(r1)];
  UserArr[i]=tempUser;
}




// const getRoles= (arr:Role[])=>{
//   let str = "";
//   arr.forEach((role)=>{
//     str = str + role.RoleName + ", ";
//   })
//   str = str.slice(0,str.length-2);
//   return str;
// }

// const initialRows: GridRowsProp = [
//   {
//     id: UserArr[0].UserID,
//     name: UserArr[0].UserName,
//     role:getRoles(UserArr[0].Roles),
//   },
//   {
//     id: UserArr[1].UserID,
//     name: UserArr[1].UserName,
//     role:getRoles(UserArr[1].Roles),
//   },
//   {
//     id: UserArr[2].UserID,
//     name: UserArr[2].UserName,
//     role:getRoles(UserArr[2].Roles),
//   },
  
// ];


export default function FullFeaturedCrudGrid() {
  
  // const [rows, setRows] = React.useState(initialRows);
  const [userRows,setUserRows] = React.useState<User[]>([]);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  const [dialog,setDialog] =React.useState<boolean>(false)
  const [EditObject , setEditObject] = React.useState<User>(new User());

  const handleClose = () => {
    setDialog(false);
    
  };

  const [MaxId,setMaxId] = React.useState(100);
  const onSaveUser = (pObjUser:User)=>{
console.log(userRows)
    let flag=1;
    userRows.forEach((UserObj)=>{
      if(UserObj.UserID == pObjUser.UserID){
        flag=0;
        UserObj.UserName=pObjUser.UserName;
        UserObj.Password=pObjUser.Password;
        UserObj.Roles=pObjUser.Roles;
        // MaxId++;
        // console.log("IN edit mode",MaxId)
      }
    })
    if(flag){
      setUserRows([...userRows,pObjUser]);
      setMaxId(MaxId+1)
      // console.log("In add mode",MaxId)
    }
  }

  const handleEditClick = (id: GridRowId) => () => {
    
    // const obj = initialRows.filter((obj)=>{
    //     return obj.id == id;
    // })
    // console.log(obj[0].id);

    let user = new User();
    for(let i=0;i<userRows.length;i++){
      if(id == userRows[i].UserID){
        user = userRows[i];
        break;
      }
    }
    console.log(user);


    setEditObject(user);
    setDialog(true);

  };



  const handleDeleteClick = (id: GridRowId) => () => {
    //  let confirmation =window.confirm("Your want to delete the user?");
    // if(confirmation){
    //   setRows(rows.filter((row) => row.id !== id));
    // }
  };



  const columns: GridColDef[] = [
    { field: 'UserName', headerName: 'Name', width: 180, editable: true },

    {
      field: 'Role',
      headerName: 'Roles',
      width: 220,
      editable: true,
      // renderCell: ArrayCellRenderer
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        // const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  

  function AddRecord(): void {
    console.log("add ")
    setEditObject(new User());
    setDialog(true)
  }

  

  return (
    <>
    <div>

    <Button color='primary' variant='contained' startIcon={<AddIcon/>} onClick={AddRecord}>Add Record</Button>
    </div>
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      
      
      <DataGrid
      hideFooter
        rows={userRows}
        getRowId={(r)=>r.UserID}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
      />
    </Box>
    {/* {console.log("hi")} */}
    {dialog && (<UserEditor onClose={handleClose} identifyUserObj={EditObject} MaxId={MaxId} onSave={onSaveUser} />)}

    </>
  );
}