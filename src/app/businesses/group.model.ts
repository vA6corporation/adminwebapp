import { UserModel } from "../users/user.model"

export class GroupModel {
    _id: string = ''
    ruc: string = ''
    userIds: string[] = []
    users: UserModel[] = []
}