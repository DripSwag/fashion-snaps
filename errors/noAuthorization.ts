export class NoAuthorization extends Error {
  constructor() {
    super("No Authorization for Action");
    this.name = "No Authorization";
  }
}
