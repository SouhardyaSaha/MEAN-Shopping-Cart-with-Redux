export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public createdAt: Date,
    public updatedAt: Date,
    public role: string
  ) {}

  get isAdmin(): boolean {
    return this.role === 'admin';
  }
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface RegistrationBody {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponseData {
  status: string;
  token: string;
  data: {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      updatedAt: string;
      createdAt: string;
    };
  };
}
