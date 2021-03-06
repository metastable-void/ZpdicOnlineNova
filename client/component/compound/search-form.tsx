//

import * as react from "react";
import {
  ReactNode
} from "react";
import {
  Input,
  RadioGroup
} from "/client/component/atom";
import {
  Component
} from "/client/component/component";
import {
  applyStyle
} from "/client/component/decorator";
import {
  SearchMode,
  SearchType
} from "/server/model/search-parameter";


@applyStyle(require("./search-form.scss"))
export class SearchForm extends Component<Props, State> {

  public static defaultProps: Props = {
    search: "",
    mode: "both",
    type: "prefix"
  };

  private handleSearchSet(search: string): void {
    this.setState({search});
    if (this.props.onSearchSet) {
      this.props.onSearchSet(search);
    }
    if (this.props.onSomeSet) {
      this.props.onSomeSet({search});
    }
  }

  private handleModeSet(mode: SearchMode): void {
    this.setState({mode});
    if (this.props.onModeSet) {
      this.props.onModeSet(mode);
    }
    if (this.props.onSomeSet) {
      this.props.onSomeSet({mode});
    }
  }

  private handleTypeSet(type: SearchType): void {
    this.setState({type});
    if (this.props.onTypeSet) {
      this.props.onTypeSet(type);
    }
    if (this.props.onSomeSet) {
      this.props.onSomeSet({type});
    }
  }

  public render(): ReactNode {
    let modeSpecs = [
      {value: "both", label: "単語＋訳語"},
      {value: "name", label: "単語"},
      {value: "equivalent", label: "訳語"},
      {value: "content", label: "全文"}
    ] as const;
    let typeSpecs = [
      {value: "prefix", label: "前方"},
      {value: "part", label: "部分"},
      {value: "exact", label: "完全"},
      {value: "regular", label: "正規"}
    ] as const;
    let node = (
      <form styleName="root" onSubmit={(event) => event.preventDefault()}>
        <Input value={this.props.search} onSet={this.handleSearchSet.bind(this)}/>
        <div styleName="radio-wrapper">
          <RadioGroup name="mode" value={this.props.mode} specs={modeSpecs} onSet={this.handleModeSet.bind(this)}/>
        </div>
        <div styleName="radio-wrapper">
          <RadioGroup name="type" value={this.props.type} specs={typeSpecs} onSet={this.handleTypeSet.bind(this)}/>
        </div>
      </form>
    );
    return node;
  }

}


type Props = {
  search: string,
  mode: SearchMode,
  type: SearchType,
  onSearchSet?: (search: string) => void;
  onModeSet?: (mode: SearchMode) => void;
  onTypeSet?: (type: SearchType) => void;
  onSomeSet?: (some: {search?: string, mode?: SearchMode, type?: SearchType}) => void;
};
type State = {
};