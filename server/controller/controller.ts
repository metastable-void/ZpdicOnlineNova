//

import {
  Express,
  Router
} from "express";
import {
  Params as ExpressParams,
  Request as ExpressRequest,
  Response as ExpressResponse
} from "express-serve-static-core";
import {
  MethodType,
  ProcessName,
  RequestType,
  ResponseType,
  ResponseTypeSep
} from "/server/controller/type";
import {
  Dictionary
} from "/server/model/dictionary";
import {
  User
} from "/server/model/user";


export class Controller {

  protected router: Router;
  protected path: string;

  public constructor() {
    this.router = Router();
    this.path = "/";
    this.setup();
  }

  protected setup(): void {
  }

  protected static response<N extends ProcessName, M extends MethodType>(response: Response<N, M>, body: ResponseTypeSep<N, M, 200>): void {
    response.json(body).end();
  }

  // ステータスコード 400 でレスポンスボディを送ります。
  // 第 3 引数の error が指定された場合のみ、body として undefined を渡すのが許されます。
  // この場合は、body が undefined ならば error を例外として投げ、そうでないならば通常通り body をレスポンスとして送ります。
  protected static responseError<N extends ProcessName, M extends MethodType>(response: Response<N, M>, body: ResponseTypeSep<N, M, 400>): void;
  protected static responseError<N extends ProcessName, M extends MethodType>(response: Response<N, M>, body: ResponseTypeSep<N, M, 400> | undefined, error: any): void;
  protected static responseError<N extends ProcessName, M extends MethodType>(response: Response<N, M>, body: ResponseTypeSep<N, M, 400> | undefined, error?: any): void {
    if (body !== undefined) {
      response.status(400).json(body).end();
    } else if (error !== undefined) {
      throw error;
    }
  }

  protected static responseForbidden<N extends ProcessName, M extends MethodType>(response: Response<N, M>): void {
    response.status(403).end();
  }

  // このクラスを継承したクラスのインスタンスを生成し、引数として渡されたアプリケーションオブジェクトに対してルーターの設定を行います。
  // このときに生成したインスタンスを返します。
  public static use<C extends Controller>(this: new() => C, application: Express): C {
    let controller = new this();
    application.use(controller.path, controller.router);
    return controller;
  }

}


export interface Request<N extends ProcessName, M extends MethodType> extends ExpressRequest<ExpressParams, ResponseType<N, M>, RequestType<N, M>, any> {

  // GET リクエストの際のクエリ文字列をパースした結果です。
  // 型安全性のため、別ファイルの型定義に従って Express が定まる型より狭い型を指定してあります。
  query: RequestTypeChoose<N, M, "get">;

  // POST リクエストの際のリクエストボディをパースした結果です。
  // 型安全性のため、別ファイルの型定義に従って Express が定まる型より狭い型を指定してあります。
  body: RequestTypeChoose<N, M, "post">;

  // ユーザーの検証の結果として得られた JSON トークンが格納されます。
  // このプロパティは、authenticate ミドルウェアが呼び出された場合にのみ、値が格納されます。
  token?: string;

  // 認証に成功した場合にユーザーデータが格納されます。
  // このプロパティは、authenticate ミドルウェアおよび verifyUser ミドルウェアが呼び出された場合にのみ、値が格納されます。
  user?: User;

  // ユーザ－に辞書の編集権限があった場合に辞書データが格納されます。
  // このプロパティは、verifyDictionary ミドルウェアが呼び出された場合にのみ、値が格納されます。
  dictionary?: Dictionary;

}


export interface Response<N extends ProcessName, M extends MethodType> extends ExpressResponse<ResponseType<N, M>> {

}


export type GetRequest<N extends ProcessName> = Request<N, "get">;
export type PostRequest<N extends ProcessName> = Request<N, "post">;
export type GetResponse<N extends ProcessName> = Response<N, "get">;
export type PostResponse<N extends ProcessName> = Response<N, "post">;

type RequestTypeChoose<N extends ProcessName, M extends MethodType, T extends MethodType> = M extends T ? RequestType<N, M> : never;