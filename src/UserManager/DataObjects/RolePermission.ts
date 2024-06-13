import { isUndefinedOrNull } from "./User";

export class RolePermission {

    PermissionID: number = 0;

    PermissionName: string = "";

    static getCopy(pRolePermission: RolePermission): RolePermission {
        try {
            let objRolePermission: RolePermission = new RolePermission();

            objRolePermission.PermissionID = isUndefinedOrNull(pRolePermission.PermissionID, objRolePermission.PermissionID);
            objRolePermission.PermissionName = isUndefinedOrNull(pRolePermission.PermissionName, objRolePermission.PermissionName);

            return objRolePermission;
        } catch (error) {
            return new RolePermission();
        }
    }
}