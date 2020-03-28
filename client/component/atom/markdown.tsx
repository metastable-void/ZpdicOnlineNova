//

import * as react from "react";
import {
  ReactNode
} from "react";
import * as ReactMarkdown from "react-markdown";
import {
  NodeType
} from "react-markdown";
import {
  Link
} from "/client/component/atom";
import {
  Component
} from "/client/component/component";
import {
  applyStyle
} from "/client/component/decorator";


@applyStyle(require("./markdown.scss"))
export class Markdown extends Component<Props, State> {

  public render(): ReactNode {
    let renderers = {link: Link};
    let allowedTypes = ["text", "paragraph", "link"] as Array<NodeType>;
    let node = (
      <div styleName="root">
        <ReactMarkdown source={this.props.source} renderers={renderers} allowedTypes={allowedTypes} linkTarget="blank"/>
      </div>
    );
    return node;
  }

}


type Props = {
  source: string
};
type State = {
};