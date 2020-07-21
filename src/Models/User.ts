export class User {
  id: number;
  username: string;
  firstname?: string;
  lastname?: string;
  password: string;
  email: string;
  role: string; // Role will correspond to what level of authorization the user has.

  constructor(
    id: number,
    username: string,
    firstname: string,
    lastname: string,
    password: string,
    email: string,
    role: string
  ) {
    this.id = id;
    this.username = username;
    this.firstname = firstname;
    this.lastname = lastname;
    this.password = password;
    this.email = email;
    this.role = role;
  }
}
