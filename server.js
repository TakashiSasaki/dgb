const fastify = require('fastify')();
const sqlite3 = require('sqlite3').verbose();

// SQLiteデータベースのセットアップ
const db = new sqlite3.Database(':memory:'); // メモリ上にデータベースを作成（ファイルベースの場合はファイルパスを指定）

// ログテーブルの作成
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS logs (id INTEGER PRIMARY KEY AUTOINCREMENT, timestamp DATETIME, message TEXT)");
});

// Fastifyサーバのセットアップ
fastify.get('/', async (request, reply) => {
  return { hello: 'world' };
});

// 定期的なログの取得と保存
setInterval(() => {
  const logData = {
    timestamp: new Date().toISOString(),
    message: 'Some log message here'
  };

  // データベースにログを保存
  db.run("INSERT INTO logs (timestamp, message) VALUES (?, ?)", [logData.timestamp, logData.message], function(err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`A row has been inserted with rowid ${this.lastID}`);
  });
}, 60000); // 60秒ごとにログを保存

// サーバを起動
fastify.listen(3000, (err, address) => {
  if (err) throw err;
  console.log(`Server listening on ${address}`);
});
