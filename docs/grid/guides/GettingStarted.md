# はじめに

## 概要

DevExtreme React Grid は，ローカルまたはリモートのソースからのテーブルデータを表示するコンポーネントです．ページング，ソート，フィルタリング，グループ化，その他のデータ整形オプション，行選択，データ編集をサポートします．制御された状態モードと制御されていない状態モードのサポートにより，通常のアプリケーションまたは Redux ベースのアプリケーションで Grid を使用することができます．DevExtreme Grid コンポーネントは，コンポーザブルで拡張可能なプラグインベースのアーキテクチャを持ち，Twitter Bootstrap および Material-UI のレンダリングとテーマ設定がすぐに提供されます．

## インストール

次のコマンドを使用して，dx-react-grid パッケージとその依存関係をインストールします．

```bash
npm i --save @devexpress/dx-react-core @devexpress/dx-react-grid
```

このパッケージには、ビジュアルコンポーネントは含まれていません。以下の例では、ビジュアルコンポーネントは Material-UI パッケージを使用してレンダリングされています。ただし、以下のいずれかを使用することができます。

```bash
npm i --save @devexpress/dx-react-grid-material-ui
```

Material-UI の依存関係がインストールされ、適切に設定されていることを確認します。設定の詳細については、[Material-UI の Getting Started](https://mui.com/material-ui/getting-started/installation/) の記事を確認してください。
