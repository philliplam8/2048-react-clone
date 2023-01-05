const mongoDatabaseEndpoint = 'http://localhost:4000/scoreboard/rankings';

async function getapi() {

    // Store response
    const response = await fetch(mongoDatabaseEndpoint);

    // Store data in form of JSON
    var data = await response.json();
    // console.log(data);
    show(data);
}

getapi();

function show(data) {
    let table =
        `<tr>
        <th>Score</th>
        <th>Name</th>
        </tr>`;


    for (let i = 0; i < Object.keys(data).length; i++) {
        table += `<tr>
        <td>${data[i].score}</td>
        <td>${data[i].name}</td>
        </tr>`;
    }

    // Set innerHTML as table variable
    document.getElementById("scores").innerHTML = table;
}