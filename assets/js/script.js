"use strict";

let tableBody = document.querySelector("#dataTable tbody");
let modal = document.getElementById("myModal");
let modalBody = document.getElementById("modalBody");

async function getAllPosts() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const posts = await response.json();
        let rows = "";
        posts.forEach(post => {
            rows += `
                <tr>
                    <th scope="row">${post.id}</th>
                    <td class="post-name">${post.name}</td>
                    <td>${post.email}</td>
                    <td>${post.body}</td>
                </tr>`;
        });
        tableBody.innerHTML = rows;

        let postNames = document.querySelectorAll('.post-name');
        postNames.forEach(name => {
            name.addEventListener('click', async () => {
                let postId = parseInt(name.parentElement.querySelector('th').innerText);
                let postMessage = await getMessageById(postId);
                showModal(postMessage);
            });
        });
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
}

async function getMessageById(id) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        const post = await response.json();
        return post.body;
    } catch (error) {
        console.error("Error fetching message: ", error);
    }
}

function showModal(message) {
    modalBody.innerText = message;
    modal.style.display = "block";
}

document.querySelector(".close").addEventListener("click", function() {
    modal.style.display = "none";
});

window.addEventListener("click", function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

getAllPosts();
