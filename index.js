const fs = require('fs');

// JSONファイルのパス
const filePath = 'config.json';

// 同期的にJSONファイルを読み込む
try {
    const data = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(data);
    console.log(jsonData);
} catch (err) {
    console.error('Error reading JSON file:', err);
}
