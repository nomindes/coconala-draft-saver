# Coconala Draft Saver

ココナラのトークルームとメッセージ画面で下書き機能が使えるブラウザ拡張機能です。

![Version](https://img.shields.io/badge/version-1.0.1-blue.svg)
![License](https://img.shields.io/badge/license-Copyright-red.svg)

## 機能

- **自動下書き保存**: 文章を入力すると2秒後に自動保存
- **下書き復元**: ページを開き直しても下書きが残る
- **視覚的フィードバック**: 保存・復元・削除時にアニメーション表示
- **ページ別管理**: トークルームとメッセージごとに下書きを分けて管理
- **リアルタイム同期**: 入力中も緑のドットでタイピング状況を表示

## 対応ブラウザ

- **Firefox**: `firefox-extension/` フォルダを使用
- **Chrome**: `chrome-extension/` フォルダを使用

## インストール方法

**推奨: [Releases](https://github.com/nomindes/coconala-draft-saver/releases) からダウンロード**

### Firefox

**推奨: xpiファイル使用（再起動後も有効）**
1. [Releases](https://github.com/nomindes/coconala-draft-saver/releases) から `coconala-draft-saver-firefox-v1.0.1.xpi` をダウンロード
2. `about:config` で `xpinstall.signatures.required` を `false` に設定
3. `about:addons` → 「ファイルからアドオンをインストール」
4. ダウンロードしたxpiファイルを選択

**開発者モード（再起動時に削除される）**
1. [Releases](https://github.com/nomindes/coconala-draft-saver/releases) から `firefox-extension/` フォルダをダウンロード
2. Firefoxで `about:debugging` を開く
3. 「この Firefox」→「一時的なアドオンを読み込む」
4. `manifest.json` ファイルを選択

### Chrome  
1. [Releases](https://github.com/nomindes/coconala-draft-saver/releases) から `chrome-extension/` フォルダをダウンロード
2. Chromeで `chrome://extensions/` を開く
3. 「デベロッパー モード」をオンにする
4. 「パッケージ化されていない拡張機能を読み込む」でフォルダを選択

## 使い方

拡張機能をインストール後、ココナラのトークルームやメッセージ画面で：

1. 文章を入力すると自動的に下書き保存される
2. 保存時は**青色**のアニメーション「✓ 下書きを保存」が表示
3. ページを開き直すと**緑色**のアニメーション「✓ 下書きを復元」が表示  
4. 文章を削除すると**赤色**のアニメーション「✗ 下書きを削除」が表示
5. 下書きがない場合は「ー 下書きなし」が表示

## 対応ページ

- `https://coconala.com/talkrooms/*` (トークルーム)
- `https://coconala.com/mypage/direct_message/*` (メッセージ)

## ダウンロード

**[Releases](https://github.com/nomindes/coconala-draft-saver/releases) からダウンロードしてください**

**Firefox用:**
- **xpiファイル（推奨）**: `coconala-draft-saver-firefox-v1.0.1.xpi`
- **ソースコード**: `firefox-extension/` フォルダ

**Chrome用:**
- **ソースコード**: `chrome-extension/` フォルダ


## トラブルシューティング

### 拡張機能が動作しない
- ページを再読み込みしてください
- 拡張機能を一度削除して再インストールしてください

### アイコンが表示されない  
- `icons/icon-48.png` ファイルがあるか確認してください
- ファイル名とパスが正確か確認してください

## 技術仕様

- **保存間隔**: 入力から2秒後
- **ストレージ**: localStorage使用
- **対応要素**: textarea, input[type="text"], contenteditable
- **アニメーション**: CSS transitions + cubic-bezier

## ライセンス

このソフトウェアは著作権により保護されています。再配布、改変、商用利用を禁止します。

Copyright (c) 2024 nomin. All rights reserved.

詳細は [LICENSE](LICENSE) ファイルを参照してください。

## 作成者

**nomin**
- Website: https://nomin.jp

## 更新履歴

### v1.0.1 (2025-08-19)
- xpiファイル対応（永続インストール）
- インストール方法の詳細化
- Releasesからのダウンロード推奨

### v1.0.0 (2025-08-19)
- 初回リリース
- Firefox・Chrome対応
- 自動下書き保存機能
- 視覚的フィードバック機能