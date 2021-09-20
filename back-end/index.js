const express = require('express');
const db = require("./database");
const app = express();
const port = 8082;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.text({ extended: true }));

//ROUTES
app.get('/', (req, res) => {
    res.send('Hello World!');
});


// app.post('/alarm', async function(req, res) {
//     console.log("Entrei em alarm");
//     //console.log({body: req.body});
//     const data = req.body;
//     sendToDatabase(data);
// });

const alarmTypesMap = {
    1: 'Intrusão',
    2: 'Temperatura',
    3: 'Pressão',
    4: 'Gás',
    5: 'Volume'
}

const deviceTypesMap = {
    1: 'Porta',
    2: 'Cozinha',
    3: 'Banheiro',
    4: 'Quarto',
    5: 'Jardim'
}

const parseDataToAlarmItem = (data) => ({
    ...data,
    type: alarmTypesMap[data.type],
    deviceType: deviceTypesMap[data.deviceType]
});

function sendToDatabase(data) {
    //console.log({parsedData: parseDataToAlarmItem(data)});
    db.insertAlarm(parseDataToAlarmItem(data));
}

async function fetchFromDatabase() {
    //console.log({parsedData: parseDataToAlarmItem(data)});
    db.getAllDocuments();
    //console.log(docs);
}

fetchFromDatabase();

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});