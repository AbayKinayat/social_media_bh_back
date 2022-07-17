import { Users } from "../users.model"

export class UserDto {
  id: number
  firstName: string
  lastName: string
  secondName: string
  email: string
  phone: string
  sexId: number
  sex: object
  dateBirth: Date
  isBan: boolean

  constructor(model: Users) {
    this.id = model.id;
    this.firstName = model.firstName;
    this.lastName = model.lastName;
    this.secondName = model.secondName;
    this.email = model.email;
    this.phone = model.phone;
    this.sexId = model.sexId;
    this.sex = model.sex;
    this.dateBirth = model.dateBirth;
    this.isBan = model.isBan;
  }
}