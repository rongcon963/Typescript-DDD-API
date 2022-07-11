import { Entity } from '../../core/Entity';
import { IAggregateRoot } from '../../core/IAggregateRoot';

export interface IUserProps {
  email: string;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
}

export class User extends Entity<IUserProps> implements IAggregateRoot {
  private _email: string;
  private _firstname: string;
  private _lastname: string;
  private _username: string;
  private _password: string;

  constructor({ email, firstname, lastname, username, password }: IUserProps, guid?: string) {
    super(guid);
    this._email = email;
    this._firstname = firstname;
    this._lastname = lastname;
    this._username = username;
    this._password = password;
  }

  get email() {
    return this._email;
  }

  set email(email: string) {
    this._email = email;
  }

  get firstname() {
    return this._firstname;
  }

  set firstname(firstname: string) {
    this._firstname = firstname;
  }

  get lastname() {
    return this._lastname;
  }

  set lastname(lastname: string) {
    this._lastname = lastname;
  }

  get username() {
    return this._username;
  }

  set username(username: string) {
    this._username = username;
  }

  get password() {
    return this._password;
  }

  set password(password: string) {
    this._password = password;
  }

  public static create(props: IUserProps, guid?: string) {
    return new User(props, guid);
  }
}
