export default class CustomError extends Error {
constructor(message: string, public status?: number) {
  super(message);
  }
}