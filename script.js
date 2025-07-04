async function getData(id) {
    const tableBody = document.getElementById("data-body");
    tableBody.innerHTML = ""; // Clear previous data

    for (let i = 1; i <= id; i++) {
        try {
            let res = await fetch(`https://jsonplaceholder.typicode.com/todos/${i}`);
            let data = await res.json();

            const rowClass = data.completed ? 'row-green' : 'row-red';

            const row = `
                <tr class="${rowClass}">
                    <td>${data.id}</td>
                    <td>${data.title}</td>
                    <td>${data.completed ? "Yes" : "No"}</td>
                </tr>
            `;
            tableBody.innerHTML += row;
        } catch (error) {
            console.error(`Error fetching data for ID ${i}:`, error);
        }
    }
}

function getUser() {
    const id = parseInt(document.getElementById("id").value);
    if (isNaN(id) || id < 1) {
        alert("Please enter a valid positive number");
        return;
    }
    getData(id);
}

// Enable Enter key to trigger fetch
document.getElementById("id").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        getUser();
    }
});
