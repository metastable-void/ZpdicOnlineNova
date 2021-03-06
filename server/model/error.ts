//

import {
  Error as MongooseError
} from "mongoose";


export class CustomError<E extends string> extends MongooseError {

  public name: "CustomError" = "CustomError";
  public type: E;

  public constructor(type: E, message: string = "") {
    super(message);
    this.type = type;
  }

}