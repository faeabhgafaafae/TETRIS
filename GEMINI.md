# GEMINI.md - モダン・テトリス Webゲーム (JS & C# Blazor)

## プロジェクト概要
このプロジェクトは、クラシックなテトリスのモダンな実装です。
元々は JavaScript (ES6+) で実装されていましたが、現在は **C# (Blazor WebAssembly)** 版も含まれています。

### 主要技術
#### JavaScript版 (オリジナル)
- **フロントエンド:** HTML5, CSS3, JavaScript (ES6 Modules)
- **グラフィックス:** HTML5 Canvas API

#### C#版 (移植版)
- **フレームワーク:** Blazor WebAssembly (ASP.NET Core)
- **言語:** C# 13 / .NET 10
- **UI:** Razor Components, CSS Grid

### アーキテクチャ (C#版)
`TetrisBlazor/` ディレクトリに以下の構成で実装されています：
- **`Models/`**: ゲームロジックの中核
    - `TetrisConstants.cs`: 定数、形状、色の定義。
    - `Board.cs`: グリッド管理、衝突判定、ライン消去。
    - `Piece.cs`: ピースの回転、移動、形状保持。
- **`Pages/`**:
    - `Home.razor`: メインのゲーム画面、キーボード入力処理、ゲームループ。

## はじめに

### 前提条件
- **JavaScript版:** モダンなWebブラウザとローカルサーバー。
- **C#版:** .NET 10 SDK。

### 実行方法

#### JavaScript版
1.  ルートディレクトリでサーバーを起動：
    ```bash
    npx serve .
    ```

#### C#版 (Blazor)
1.  `TetrisBlazor` ディレクトリに移動：
    ```bash
    cd TetrisBlazor
    ```
2.  プロジェクトを実行：
    ```bash
    dotnet watch
    ```

## 開発規約
- **C#版:** Blazorの標準的なプラクティスに従い、ゲームロジックは `Models` に分離し、UIは `Razor` コンポーネントで記述しています。Canvasの代わりに CSS Grid を使用してレンダリングを行うことで、純粋なC#実装（JS Interopを最小限に抑える）を実現しています。

## TODO / 今後の機能強化
- [ ] 「ホールド」機能の追加。
- [ ] 配置を容易にするためのゴーストピース（投影）の実装。
- [ ] 効果音と背景音楽の追加。
- [ ] `localStorage` を使用したローカルハイスコアの保存。
