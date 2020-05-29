import { Ingredient } from '../shared/ingredient.model';

export class Organization {
  public id: string;
  public name: string;
  public logo?: string;
  public members?: OrganizationMember[];
}

export class OrganizationSummary {
  public id: string;
  public name: string;
  public logo?: string;  
}

export class OrganizationMember {
  public user: AppUser;
  public tags: string[];
  public role: string = "owner" || "admin" || "editor" || "member";  
}

export class AppUser {
  public id: string;
  public email: string;
  public username: string;
  public emotar?: string;
  public avatar?: string;
}
