//

import * as react from "react";
import {
  ReactNode
} from "react";
import {
  StoreComponent
} from "/client/component/component";
import {
  ChangeDictionaryNameForm,
  ChangeDictionarySecretForm,
  DictionaryHeader,
  Header,
  Menu,
  PopupInformationPane,
  SettingPane,
  UploadDictionaryForm
} from "/client/component/compound";
import {
  applyStyle,
  inject,
  route
} from "/client/util/decorator";
import {
  SlimeDictionarySkeleton
} from "/server/model/dictionary/slime";


@route @inject
@applyStyle(require("./dictionary-setting-page.scss"))
export class DictionarySettingPage extends StoreComponent<Props, State, Params> {

  public state: State = {
    dictionary: null
  };

  public async componentDidMount(): Promise<void> {
    await this.fetchDictionary();
  }

  private async fetchDictionary(): Promise<void> {
    let number = +this.props.match!.params.number;
    let response = await this.requestGet("fetchDictionaryInfo", {number});
    if (response.status === 200 && !("error" in response.data)) {
      let dictionary = response.data;
      this.setState({dictionary});
    } else {
      this.setState({dictionary: null});
    }
  }

  private renderChangeDictionaryNameForm(): ReactNode {
    let label = "名称変更";
    let description = `
      この辞書の名称を変更します。
    `;
    let node = (
      <SettingPane label={label} key={label} description={description}>
        <ChangeDictionaryNameForm number={this.state.dictionary!.number} currentName={this.state.dictionary!.name} onSubmit={this.fetchDictionary.bind(this)}/>
      </SettingPane>
    );
    return node;
  }

  private renderChangeDictionarySecretForm(): ReactNode {
    let label = "一覧表示変更";
    let description = `
      この辞書を辞書一覧ページに表示するかどうかを変更します。
    `;
    let node = (
      <SettingPane label={label} key={label} description={description}>
        <ChangeDictionarySecretForm number={this.state.dictionary!.number} currentSecret={this.state.dictionary!.secret}/>
      </SettingPane>
    );
    return node;
  }

  private renderUploadDictionaryForm(): ReactNode {
    let label = "アップロード";
    let description = `
      ファイルをアップロードし、現在のデータを上書きします。
    `;
    let node = (
      <SettingPane label={label} key={label} description={description}>
        <UploadDictionaryForm number={this.state.dictionary!.number}/>
      </SettingPane>
    );
    return node;
  }

  public render(): ReactNode {
    let menuSpecs = [{mode: "general", label: "一般", iconLabel: "\uF013", href: ""}];
    let contentNodes = [];
    if (this.state.dictionary) {
      contentNodes.push(this.renderChangeDictionaryNameForm());
      contentNodes.push(this.renderChangeDictionarySecretForm());
      contentNodes.push(this.renderUploadDictionaryForm());
    }
    let node = (
      <div styleName="page">
        <Header/>
        <DictionaryHeader name={this.state.dictionary?.name || ""}/>
        <PopupInformationPane/>
        <div styleName="content">
          <Menu mode="general" specs={menuSpecs}/>
          {contentNodes}
        </div>
      </div>
    );
    return node;
  }

}


type Props = {
};
type State = {
  dictionary: SlimeDictionarySkeleton | null
};
type Params = {
  number: string;
};