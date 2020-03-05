//

import {
  Controller,
  GetRequest,
  GetResponse,
  PostRequest,
  PostResponse
} from "/server/controller/controller";
import {
  verifyUser
} from "/server/controller/middle";
import {
  SERVER_PATH
} from "/server/controller/type";
import {
  SlimeDictionaryModel,
  SlimeDictionarySkeleton,
  SlimeWordSkeleton
} from "/server/model/dictionary/slime";
import {
  CustomErrorSkeleton
} from "/server/model/error";
import {
  before,
  controller,
  get,
  post
} from "/server/util/decorator";


@controller("/")
export class DictionaryController extends Controller {

  @post(SERVER_PATH["dictionaryCreate"])
  @before(verifyUser())
  public async postCreate(request: PostRequest<"dictionaryCreate">, response: PostResponse<"dictionaryCreate">): Promise<void> {
    let user = request.user!;
    let name = request.body.name;
    let dictionary = await SlimeDictionaryModel.createEmpty(name, user);
    let body = new SlimeDictionarySkeleton(dictionary);
    response.json(body);
  }

  @post(SERVER_PATH["dictionaryUpload"])
  @before(verifyUser())
  public async postUpload(request: PostRequest<"dictionaryUpload">, response: PostResponse<"dictionaryUpload">): Promise<void> {
    let user = request.user!;
    response.json("Not yet implemented");
  }

  @get(SERVER_PATH["dictionarySearch"])
  public async getSearch(request: GetRequest<"dictionarySearch">, response: GetResponse<"dictionarySearch">): Promise<void> {
    let number = parseInt(request.query.number, 10);
    let search = request.query.search;
    let mode = request.query.mode;
    let type = request.query.type;
    let offset = parseInt(request.query.offset, 10) || 0;
    let size = parseInt(request.query.size, 10) || 0;
    let dictionary = await SlimeDictionaryModel.findByNumber(number);
    if (dictionary) {
      let words = await dictionary.search(search, mode, type, offset, size);
      let body = words.map((word) => new SlimeWordSkeleton(word));
      response.json(body);
    } else {
      let body = new CustomErrorSkeleton("invalidNumber");
      response.status(400).json(body);
    }
  }

  @get(SERVER_PATH["dictionaryInfo"])
  public async getInfo(request: GetRequest<"dictionaryInfo">, response: GetResponse<"dictionaryInfo">): Promise<void> {
    let number = parseInt(request.query.number, 10);
    let dictionary = await SlimeDictionaryModel.findByNumber(number);
    if (dictionary) {
      let body = new SlimeDictionarySkeleton(dictionary);
      response.json(body);
    } else {
      let body = new CustomErrorSkeleton("invalidNumber");
      response.status(400).json(body);
    }
  }

  @get(SERVER_PATH["dictionaryList"])
  @before(verifyUser())
  public async getList(request: GetRequest<"dictionaryList">, response: GetResponse<"dictionaryList">): Promise<void> {
    let user = request.user!;
    let dictionaries = await SlimeDictionaryModel.findByUser(user);
    let body = [];
    for (let dictionary of dictionaries) {
      let innerSkeleton = new SlimeDictionarySkeleton(dictionary);
      await innerSkeleton.fetch(dictionary);
      body.push(innerSkeleton);
    }
    response.json(body);
  }

}