import { Role } from "../enums/role";

export class User {
  constructor(user, token, isLoggedIn) {
    this.user = user;
    this.token = token;
    this.isLoggedIn = isLoggedIn;
  }

  userEntity() {
    return this.user;
  }

  fullName() {
    return `${this.user.firstName} ${this.user.lastName}`;
  }

  token() {
    return this.token;
  }

  isLoggedIn() {
    return this.isLoggedIn;
  }

  isInvestor() {
    return this.user.roleId == Role.INVESTOR;
  }

  isStartup() {
    return this.user.roleId == Role.STARTUP;
  }
}
