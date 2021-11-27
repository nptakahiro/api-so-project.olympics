# api-so-project.olympics

### 概要

- Express および Relational database を使用して CRUD API サービスを作成する
- [東京オリンピック 2021](https://www.kaggle.com/arjunprasadsarkhel/2021-olympics-in-tokyo)のデータを用いた API であり、オリンピックへの参加国やメダル数が取得できる

### ディレクトリ構成

```
.
├── README.md
├── config.js
├── index.js
├── knexfile.js
├── migrations
│   └── 20211111213534_migration.js
├── package-lock.json
├── package.json
├── public
│   └── index.html
├── seeds
│   └── seed.js
└── tests
    └── test.js
```

### 依存パッケージのインストールとアプリの起動手順

依存パッケージをインストール：

```bash
  npm i
```

(オプション)knexfile.js の作成：

```bash
  npm run init
```

データベース`olympicsdb`の作成：

```
  echo "CREATE DATABASE olympicsdb;" | psql
```

マイグレーションの実行：

```
npm run migrate
```

seed ファイルから初期データ(国別メダル数)作成：

```
npm run seed
```

config.js に設定で必要な情報を埋めるため、下記の.env の[YOUR ***]を埋める。

```
[DB_INFO]
DB_HOST=[YOUR HOST]
DB_PORT=[YOUR PORT]
DB_NAME=olympicsdb
DB_USER=[YOUR PORT]
DB_PASSWORD=[YOUR PORT]
PORT=[YOUR PORT]
```

テストを実行する場合：

```bash
  npm run test
```

アプリを実行する場合：

```bash
  npm run start
```

※デフォルトでは、`localhost：3000`で起動する

開発時にアプリを実行する場合：

```bash
  npm run dev
```

サーバーを起動中に[http://localhost:3000/](http://localhost:3000/)にアクセスすることで、国別の金メダル取得数一覧が表示される。

### API エンドポイントの説明

- `GET /v1/team/list`

  - オリンピックでメダルを取得した国一覧を取得する
  - 金メダル取得数の上位`n`カ国のみ取得する場合は、クエリパラメータ`limit=n`を指定する

- `POST /v1/team/list`

  - オリンピックでメダルを取得した国一覧に、新たな国を追加する

- `DELETE /v1/team/list:team`

  - オリンピックでメダルを取得した国一覧の中から、`:team`で指定した国を削除する

- `PATCH /v1/team/list:team`
  - オリンピックでメダルを取得した国一覧の中から、`:team`で指定した国名を変更する
