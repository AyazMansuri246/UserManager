import { RolePermission } from "./RolePermission";
import { RoleWellPermission } from "./RoleWellPermission";
import { isUndefinedOrNull } from "./User";

export class Role {

    RoleID: number = 0;

    RoleName: string = "";

    RolePermissions: RolePermission[] = [];

    WellPermissions: RoleWellPermission[] = [];

    LastError: string = "";

    static getCopy(pRole: Role): Role {
        try {
            let objRole: Role = new Role();

            objRole.RoleID = isUndefinedOrNull(pRole.RoleID, objRole.RoleID);
            objRole.RoleName = isUndefinedOrNull(pRole.RoleName, objRole.RoleName);
            objRole.RolePermissions = isUndefinedOrNull(Object.values(pRole.RolePermissions).map((item: any) => RolePermission.getCopy(item)), objRole.RolePermissions);
            objRole.WellPermissions = isUndefinedOrNull(Object.values(pRole.WellPermissions).map((item: any) => RolePermission.getCopy(item)), objRole.WellPermissions);
            objRole.LastError = isUndefinedOrNull(pRole.LastError, objRole.LastError);

            return objRole;
        } catch (error) {
            return new Role();
        }
    }
}