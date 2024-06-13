import { Role } from "./Role";

export class User {

    UserID: number = 0;

    UserName: string = "";

    Password: string = "";

    Roles: Role[] = [];

    LastError: string = "";

    Warnings: string = "";

    static getCopy(pUser: User): User {
        try {
            let objUser: User = new User();

            objUser.UserID = isUndefinedOrNull(pUser.UserID, objUser.UserID);
            objUser.UserName = isUndefinedOrNull(pUser.UserName, objUser.UserName);
            objUser.Password = isUndefinedOrNull(pUser.Password, objUser.Password);
            objUser.Roles = isUndefinedOrNull(Object.values(pUser.Roles).map((item: any) => Role.getCopy(item)), objUser.Roles);
            objUser.LastError = isUndefinedOrNull(pUser.LastError, objUser.LastError);
            objUser.Warnings = isUndefinedOrNull(pUser.Warnings, objUser.Warnings);

            return objUser;
        } catch (error) {
            return new User();
        }
    }
}

export function isUndefinedOrNull(value: any, defaultValue: any) {
    try {
        if (value === undefined || value === null) {
            return defaultValue;
        } else {
            return value;
        }
    } catch (error) {
        return defaultValue;
    }
}