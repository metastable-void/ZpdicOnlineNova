//

import * as react from "react";
import {
  ChangeEvent,
  ReactNode
} from "react";
import {
  Component
} from "/client/component/component";
import {
  applyStyle
} from "/client/component/decorator";


@applyStyle(require("./file-input.scss"))
export class FileInput extends Component<Props, State> {

  public static defaultProps: Partial<Props> = {
    file: null
  };
  public state: State = {
    fileName: ""
  };

  private handleChange(event: ChangeEvent<HTMLInputElement>): void {
    let files = event.target.files;
    if (files && files.length > 0) {
      let file = files[0];
      let fileName = file.name;
      this.setState({fileName});
      if (this.props.onSet) {
        this.props.onSet(file);
      }
    }
  }

  public render(): ReactNode {
    let inputLabelNode = (this.props.inputLabel !== undefined) && (
      <div styleName="label">{this.props.inputLabel}</div>
    );
    let node = (
      <div styleName="root" className={this.props.className}>
        <label styleName="input-wrapper">
          {inputLabelNode}
          <input styleName="input" type="text" value={this.state.fileName} readOnly={true}/>
        </label>
        <label styleName="button">
          {this.props.buttonLabel}
          <input styleName="file" type="file" onChange={this.handleChange.bind(this)}/>
        </label>
      </div>
    );
    return node;
  }

}


type Props = {
  file: File | null,
  inputLabel?: string,
  buttonLabel: string,
  onSet?: (file: File | null) => void,
  className?: string
};
type State = {
  fileName: string
};