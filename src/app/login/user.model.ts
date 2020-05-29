export class User {
  constructor(
    private _token_type: string,
    private _token: string,
    private _tokenExpirationDate: Date,
    private _refresh_token: string,
    private _refresh_tokenExpirationDate: Date
  ) {}

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}
