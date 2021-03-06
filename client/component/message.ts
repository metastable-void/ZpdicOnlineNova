//

import {
  hasTypedOwnProperty
} from "/client/util/misc";


const MESSAGES = {
  emailChanged: "メールアドレスを変更しました。",
  passwordChanged: "パスワードを変更しました。",
  userResetTokenIssued: "パスワードリセット用の URL を記載したメールを送信しました。メールの指示に従って操作を進めてください。",
  userPasswordReset: "パスワードのリセットが完了しました。新しいパスワードを用いてログインしてください。",
  dictionaryNameChanged: "辞書の表示名を変更しました。",
  dictionaryParamNameChanged: "辞書の URL 用名称を変更しました。",
  dictionarySecretChanged: "辞書の一覧表示の設定を変更しました。",
  dictionaryExplanationChanged: "辞書の説明を変更しました。",
  dictionaryUploaded: "辞書のアップロードが完了しました。なお、データの反映には時間がかかる場合があります。",
  dictionaryDeleted: "辞書を削除しました。",
  editDictionaryInvited: "編集権限の付与をリクエストしました。相手ユーザーがこれを承認すれば編集権限が付与されます。",
  editDictionaryAccepted: "編集権限の付与の招待を承認しました。これ以降、該当の辞書を編集することができます。",
  editDictionaryRefused: "編集権限の付与の招待を拒否しました。",
  wordEdited: "単語の編集が完了しました。",
  wordDeleted: "単語の削除が完了しました。",
  invalidUserName: "ユーザー ID が不正です。半角英数字とアンダーバーとハイフンのみで構成され、数字以外の文字が 1 文字以上含まれており、全体で 30 文字以下である必要があります。",
  invalidEmail: "メールアドレスが不正です。",
  invalidPassword: "パスワードが不正です。6 文字以上 50 文字以下である必要があります。",
  duplicateUserName: "そのユーザー ID はすでに存在しています。別のユーザー ID を指定してください。",
  duplicateUserEmail: "そのメールアドレスはすでに登録済みです。別のメールアドレスを指定してください。",
  noSuchUser: "そのユーザーは存在しません。",
  noSuchUserEmail: "そのメールアドレスのユーザーは存在しません。",
  invalidResetToken: "パスワードのリセットに失敗しました。",
  loginFailed: "ログインに失敗しました。",
  noSuchDictionaryNumber: "この番号の辞書は存在しません。",
  noSuchDictionaryParamName: "この名称の辞書は存在しません。",
  duplicateDictionaryParamName: "その URL 用名称はすでに利用されています。別の名称をしてしてください。",
  invalidDictionaryParamName: "URL 用名称が不正です。半角英数字とアンダーバーとハイフンのみで構成され、数字以外の文字が 1 文字以上含まれており、全体で 30 文字以下である必要があります。",
  noSuchWordNumber: "存在しない単語を編集しようとしました。",
  userCanAlreadyEdit: "そのユーザーはすでに編集権限を保有しています。",
  editDictionaryAlreadyInvited: "同一の編集権限の付与がすでにリクエストされています。",
  noSuchInvitation: "そのような権限の招待は存在しません。",
  invalidArgument: "渡された引数が不正です。",
  unauthenticated: "ログインしていません。ログインし直してください。",
  forbidden: "このコンテンツにアクセスする権限がありません。",
  serverNotFound: "実行すべき処理を行う API が見つかりませんでした。",
  serverError: "サーバーでエラーが発生しました。時間を置いてもう一度お試しください。",
  serverTimeout: "サーバーが時間内に応答しませんでした。時間を置いてもう一度お試しください。",
  requestTimeout: "サーバーが時間内に応答しませんでした。時間を置いてもう一度お試しください。",
  messageNotFound: "ポップアップ用のメッセージが設定されていません。設定ミスの可能性がありますので、お手数ですが管理者までご連絡ください。",
  unexpected: "予期しないエラーが発生しました。バグの可能性がありますので、お手数ですが管理者までご連絡ください。"
};

export function getMessage(type: string): string {
  let nextType = (hasTypedOwnProperty(MESSAGES, type)) ? type : "messageNotFound";
  let message = MESSAGES[nextType];
  return message;
}