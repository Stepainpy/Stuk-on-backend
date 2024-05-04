const BackendURL = "https://tonykostay-test.h1n.ru/journal";

function createRow(name, age, group, aca_perf) {
    const td_name = document.createElement("td");
    const td_age = document.createElement("td");
    const td_group = document.createElement("td");
    const td_aca_perf = document.createElement("td");
    const row = document.createElement("tr");

    td_name.innerText = name;
    td_age.innerText = age;
    td_group.innerText = group;
    td_aca_perf.innerText = aca_perf;

    row.appendChild(td_name);
    row.appendChild(td_age);
    row.appendChild(td_group);
    row.appendChild(td_aca_perf);

    return row;
}

function clearTable(table) {
    const header = table.querySelector("tr");
    table.innerHTML = "";
    table.appendChild(header);
}

async function getData() {
    let response;

    try {
        response = await fetch(BackendURL);
    } catch (e) {
        return {
            error: "Backend is not valid",
            data: {}
        }
    }

    if (response.ok) {
        let jorns = await response.json();
        return {
            error: "",
            data: jorns
        };
    } else {
        return {
            error: "Технические шоколодки",
            data: {}
        };
    }
}

async function updateData() {
    const data = await getData();

    if (data.error != "") {
        alert("Ошибка. " + data.error);
        return;
    }

    const journals = data.data;
    const table = document.getElementById("table-body");
    clearTable(table);

    for (let i = 0; i < journals.length; i++) {
        const row = createRow(journals[i].name, journals[i].age, journals[i].group, journals[i].rating);
        table.appendChild(row);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector("button");
    btn.addEventListener("click", updateData)
})