//

import {
  EventEmitter
} from "events";
import {
  createWriteStream
} from "fs";
import {
  Dictionary,
  Word,
  WordModel
} from "/server/model/dictionary";


export class DictionarySerializer extends EventEmitter {

  public path: string;
  public dictionary: Dictionary;
  private error: Error | null = null;

  public constructor(path: string, dictionary: Dictionary) {
    super();
    this.path = path;
    this.dictionary = dictionary;
  }

  public on<E extends keyof Event>(event: E, listener: (...args: Event[E]) => void): this;
  public on(event: string | symbol, listener: (...args: any) => void): this {
    super.on(event, listener);
    return this;
  }

  public start(): void {
    let stream = WordModel.find().where("dictionary", this.dictionary).cursor();
    let writer = createWriteStream(this.path);
    let first = true;
    writer.write("{\"words\":[");
    stream.on("data", (word) => {
      let string = this.createString(word);
      if (first) {
        first = false;
      } else {
        writer.write(",");
      }
      writer.write(string);
    });
    stream.on("end", () => {
      if (!this.error) {
        writer.write("]");
        let externalString = this.createExternalString();
        if (externalString) {
          writer.write(",");
          writer.write(externalString);
        }
        writer.write("}");
        writer.end(() => {
          this.emit("end");
        });
      }
    });
    stream.on("error", (error) => {
      this.error = error;
      this.emit("error", error);
    });
  }

  private createString(word: Word): string {
    let raw = {} as any;
    raw["entry"] = {};
    raw["entry"]["id"] = word.number;
    raw["entry"]["form"] = word.name;
    raw["translations"] = [];
    for (let equivalent of word.equivalents) {
      let rawEquivalent = {} as any;
      rawEquivalent["title"] = equivalent.title;
      rawEquivalent["forms"] = equivalent.names;
      raw["translations"].push(rawEquivalent);
    }
    raw["tags"] = word.tags;
    raw["contents"] = [];
    for (let information of word.informations) {
      let rawInformation = {} as any;
      rawInformation["title"] = information.title;
      rawInformation["text"] = information.text;
      raw["contents"].push(rawInformation);
    }
    raw["variations"] = [];
    for (let variation of word.variations) {
      let rawVariation = {} as any;
      rawVariation["title"] = variation.title;
      rawVariation["form"] = variation.name;
      raw["variations"].push(rawVariation);
    }
    raw["relations"] = [];
    for (let relation of word.relations) {
      let rawRelation = {} as any;
      rawRelation["title"] = relation.title;
      rawRelation["entry"] = {};
      rawRelation["entry"]["id"] = relation.number;
      rawRelation["entry"]["form"] = relation.name;
      raw["relations"].push(rawRelation);
    }
    let string = JSON.stringify(raw);
    return string;
  }

  private createExternalString(): string {
    let string = JSON.stringify(this.dictionary.externalData || {});
    string = string.slice(1, -1);
    return string;
  }

}


type Event = {
  end: [],
  error: [Error]
};