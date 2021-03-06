//

import * as react from "react";
import {
  ReactNode
} from "react";
import {
  Component
} from "/client/component/component";
import {
  DictionaryPane,
  PaneList
} from "/client/component/compound";
import {
  applyStyle
} from "/client/component/decorator";
import {
  DetailedDictionary,
  UserDictionary
} from "/server/skeleton/dictionary";


@applyStyle(require("./dictionary-list.scss"))
export class DictionaryList extends Component<Props, State> {

  public static defaultProps: Partial<Props> = {
    showUser: true,
    showUpdatedDate: true,
    showLinks: false
  };

  public render(): ReactNode {
    let outerThis = this;
    let renderer = function (dictionary: DetailedDictionary | UserDictionary): ReactNode {
      let showLinks = outerThis.props.showLinks && "authorities" in dictionary;
      let canOwn = "authorities" in dictionary && dictionary.authorities.indexOf("own") >= 0;
      let dictionaryNode = (
        <DictionaryPane
          dictionary={dictionary}
          key={dictionary.id}
          showUser={outerThis.props.showUser}
          showUpdatedDate={outerThis.props.showUpdatedDate}
          showSettingLink={showLinks && canOwn}
          showDownloadLink={showLinks}
        />
      );
      return dictionaryNode;
    };
    let node = (
      <PaneList items={this.props.dictionaries} size={this.props.size} renderer={renderer}/>
    );
    return node;
  }

}


type Props = {
  dictionaries: Array<DetailedDictionary>,
  showUser: boolean,
  showUpdatedDate: boolean,
  showLinks: boolean,
  size: number
};
type State = {
};