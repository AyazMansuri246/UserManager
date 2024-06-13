import { isUndefinedOrNull } from "./User";

export class RoleWellPermission {

    RoleID: number = 0;

    PermissionOn: string = "";

    ObjectID: string = "";

    static getCopy(pRoleWellPermission: RoleWellPermission): RoleWellPermission {
        try {
            let objRoleWellPermission: RoleWellPermission = new RoleWellPermission();

            objRoleWellPermission.RoleID = isUndefinedOrNull(pRoleWellPermission.RoleID, objRoleWellPermission.RoleID);
            objRoleWellPermission.PermissionOn = isUndefinedOrNull(pRoleWellPermission.PermissionOn, objRoleWellPermission.PermissionOn);
            objRoleWellPermission.ObjectID = isUndefinedOrNull(pRoleWellPermission.ObjectID, objRoleWellPermission.ObjectID);

            return objRoleWellPermission;
        } catch (error) {
            return new RoleWellPermission();
        }
    }
}