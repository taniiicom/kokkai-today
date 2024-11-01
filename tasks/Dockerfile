# ベースイメージとしてPython 3.9を使用
FROM python:3.9-slim

# 作業ディレクトリの作成と移動
WORKDIR /app

# 必要なパッケージをインストール
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Node.jsとnpmをインストール (Prisma CLIに必要)
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y nodejs

# pipをアップグレード
RUN pip install --upgrade pip

# Pythonの依存パッケージファイルをコピー
COPY requirements.txt .

# Pythonパッケージのインストール
RUN pip install --no-cache-dir -r requirements.txt

# アプリケーションコードをコンテナにコピー
COPY . .

# スクリプト実行用のエントリーポイント
CMD ["python", "main.py"]
