//

import * as react from "react";
import {
  Component,
  ReactNode
} from "react";
import {
  WordPane
} from "/client/component/compound";
import {
  applyStyle
} from "/client/util/decorator";
import {
  SlimeWordSkeleton
} from "/server/model/dictionary/slime";


@applyStyle(require("./word-list.scss"))
export class WordList extends Component<Props, State> {

  public render(): ReactNode {
    let words = this.props.words;
    let displayedWords = words.slice(this.props.offset, this.props.offset + this.props.size);
    let wordPanes = displayedWords.map((word) => {
      return <WordPane word={word} key={word.id}/>;
    });
    let node = (
      <div styleName="root">
        {wordPanes}
      </div>
    );
    return node;
  }

}


type Props = {
  words: Array<SlimeWordSkeleton>
  size: number,
  offset: number
};
type State = {
};