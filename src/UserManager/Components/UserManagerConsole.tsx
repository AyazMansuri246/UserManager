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


//dialog
// const RootStyle = styled(Box)(({ theme }) => ({
//     width: '100%',
//     height: '100%',
//     padding: '5px 0',
//     margin: '10px 0',
//   }));
  

  



const roles = ['Market', 'Finance', 'Development'];
const randomRole = () => {
  return randomArrayItem(roles);
};





// let userList: User[] = [];
// const loadDummyData=()=>{
//     let objUser: User= new User();
//     objUser.UserID=1;
//     objUser.Password="123455";
//     objUser.UserName="Admin";
//       let objRole: Role= new Role();
//         objRole.RoleID =0;
//         objRole.RoleName="Admin";
//         let rolePremission1 = new RolePermission();
//         rolePremission1.PermissionID=1;
//         rolePremission1.PermissionName="Well Manager";
//         objRole.RolePermissions.push(rolePremission1);
//         let rolePremission2 = new RolePermission();
//         rolePremission2.PermissionID=2;
//         rolePremission2.PermissionName="Console Manager";
//         objRole.RolePermissions.push(rolePremission2);
        
//         let wellPermission1=new RoleWellPermission();
//         wellPermission1.PermissionOn = "country";
//         wellPermission1.RoleID = 0;
//         wellPermission1.ObjectID = "461";

//         objRole.WellPermissions.push(wellPermission1);

//     objUser.Roles.push(objRole);

//       let objRole1: Role= new Role();
//         objRole1.RoleID =1;
//         objRole1.RoleName="Manager";
//         let role1Premission1 = new RolePermission();
//         role1Premission1.PermissionID=1;
//         role1Premission1.PermissionName="Well Manager";
//         objRole1.RolePermissions.push(role1Premission1);
//         let role1Premission2 = new RolePermission();
//         role1Premission2.PermissionID=2;
//         role1Premission2.PermissionName="Console Manager";
//         objRole1.RolePermissions.push(role1Premission2);
        
//         let well1Permission1=new RoleWellPermission();
//         well1Permission1.PermissionOn = "country";
//         well1Permission1.RoleID = 0;
//         well1Permission1.ObjectID = "461";

//         objRole1.WellPermissions.push(well1Permission1);

//     objUser.Roles.push(objRole1);

//       return objUser;
// }

// const User1 = loadDummyData();
// userList.push(User1);
// User2.UserID=2;
// User2.UserName="Ayaz";
// const User2 = loadDummyData();
// userList.push(User2);


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
console.log(r1);
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


const MaxId = UserArr[UserArr.length-1].UserID;

const getRoles= (arr:Role[])=>{
  let str = "";
  arr.forEach((role)=>{
    str = str + role.RoleName + ", ";
  })
  str = str.slice(0,str.length-2);
  return str;
}

const initialRows: GridRowsProp = [
  {
    id: UserArr[0].UserID,
    name: UserArr[0].UserName,
    role:getRoles(UserArr[0].Roles),
  },
  {
    id: UserArr[1].UserID,
    name: UserArr[1].UserName,
    role:getRoles(UserArr[1].Roles),
  },
  {
    id: UserArr[2].UserID,
    name: UserArr[2].UserName,
    role:getRoles(UserArr[2].Roles),
  },
];


export default function FullFeaturedCrudGrid() {
  
  const [selectedValue, setSelectedValue] = React.useState("AYaz");
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  const [dialog,setDialog] =React.useState<boolean>(false)
  const [EditObject , setEditObject] = React.useState<User>(new User());

  const handleClose = (value: string) => {
    setDialog(false);
    setSelectedValue(value);
    setEditObject(new User());
  };


  const handleEditClick = (id: GridRowId) => () => {

    const obj = initialRows.filter((obj)=>{
        return obj.id == id;
    })
    console.log(obj[0].id);

    let user = new User();
    for(let i=0;i<UserArr.length;i++){
      if(id == UserArr[i].UserID){
        user = UserArr[i];
        break;
      }
    }


    setEditObject(user);
    setDialog(true);

  };



  const handleDeleteClick = (id: GridRowId) => () => {
     let confirmation =window.confirm("Your want to delete the user?");
    if(confirmation){
      setRows(rows.filter((row) => row.id !== id));
    }
  };



  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 180, editable: true },

    {
      field: 'role',
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
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
      />
    </Box>
    {console.log("hi")}
    {dialog && (<UserEditor selectedValue={selectedValue} onClose={handleClose} identifyUserObj={EditObject} MaxId={MaxId}  />)}

    </>
  );
}