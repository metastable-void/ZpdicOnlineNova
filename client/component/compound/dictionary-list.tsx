//

import * as react from "react";
import {
  Component,
  ReactNode
} from "react";
import {
  DictionaryPane
} from "/client/component/compound";
import {
  applyStyle
} from "/client/util/decorator";
import {
  SlimeDictionarySkeleton
} from "/server/model/dictionary/slime";


@applyStyle(require("./dictionary-list.scss"))
export class DictionaryList extends Component<Props, State> {

  public render(): ReactNode {
    let dictionaryPanes = this.props.dictionaries.map((dictionary) => {
      return <DictionaryPane dictionary={dictionary} showsSetting={this.props.showsSetting} key={dictionary.id}/>;
    });
    let node = (
      <div styleName="root">
        {dictionaryPanes}
      </div>
    );
    return node;
  }

}


type Props = {
  dictionaries: Array<SlimeDictionarySkeleton>,
  showsSetting: boolean
};
type State = {
};