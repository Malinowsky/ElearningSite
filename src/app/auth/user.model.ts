export class User {
    constructor(
      public uid: string,
      public email: string,
      private _token: string, 
      private _tokenExpirationDate: Date ,

      public displayName?: string,
      public role?: 'teacher' | 'student' | 'undefined',
      public avatarUrl?: string,
      public phoneNumber?: string,
      public dateOfBirth?: string,
      public address?: {
        street?: string;
        city?: string;
        postalCode?: string;
      },
      public lastActivity?: Date,
      public favorites?: string[],
      public loginHistory?: { timestamp: Date; ipAddress: string; }[],
      public permissions?: string[],
      
    ) {}
  
    // Getter dla tokenu
    get token() {
      if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
        console.error("Token expired)");
        return 'null';
      }
      return this._token;
    }
  }
  