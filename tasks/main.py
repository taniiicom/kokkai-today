import time

print("コンテナが起動しました。Prisma操作を行うには、コンテナに入ってください。")
# [tips] docker コンテナ内で操作を継続するために無限ループを実行 ^^
while True:
    time.sleep(3600)  # 1時間ごとに待機を継続
