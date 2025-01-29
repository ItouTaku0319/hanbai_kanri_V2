# 1. Node.js の公式イメージを使用
FROM node:18

# 2. 作業ディレクトリを設定
WORKDIR /app

# 3. package.jsonとlockファイルを先にコピー（キャッシュを活用）
COPY package.json package-lock.json ./
RUN npm install

# 4. ソースコードをコピー
COPY . .

# 5. ホットリロードを有効化（--host を追加）
CMD ["npm", "run", "dev", "--", "--host"]
