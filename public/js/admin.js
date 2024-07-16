document.addEventListener('DOMContentLoaded', async () => {
    await loadSpaces();

    document.getElementById('logoutButton').addEventListener('click', () => {
        window.location.href = '/index.html';
    });

    document.getElementById('spaceForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('spaceName').value;
        const capacidade = document.getElementById('capacity').value;
        await fetch('/spaces', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, capacidade })
        });
        document.getElementById('spaceForm').reset();
        loadSpaces();
    });
});

async function loadSpaces() {
    const response = await fetch('/spaces');
    const spaces = await response.json();
    const spaceList = document.getElementById('spaceList');
    spaceList.innerHTML = '';
    spaces.forEach(space => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div>${space.name} (Capacidade: ${space.capacidade})</div>
            <form class="editForm" data-id="${space.id}" style="display: none;">
                <input type="text" class="editName" placeholder="Novo nome" value="${space.name}" required>
                <input type="number" class="editCapacity" placeholder="Nova capacidade" value="${space.capacidade}" required>
                <button type="submit">Salvar</button>
            </form>
            <div>
                <button class="editButton" data-id="${space.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="deleteButton" data-id="${space.id}">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>`;
        spaceList.appendChild(li);
    });

    document.querySelectorAll('.editButton').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.currentTarget.dataset.id;
            const form = document.querySelector(`form[data-id="${id}"]`);
            form.style.display = form.style.display === 'none' ? 'flex' : 'none';
        });
    });

    document.querySelectorAll('.editForm').forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const id = e.currentTarget.dataset.id;
            const name = e.currentTarget.querySelector('.editName').value;
            const capacidade = e.currentTarget.querySelector('.editCapacity').value;
            await fetch(`/spaces/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, capacidade })
            });
            loadSpaces();
        });
    });

    document.querySelectorAll('.deleteButton').forEach(button => {
        button.addEventListener('click', async (e) => {
            const id = e.currentTarget.dataset.id;
            await fetch(`/spaces/${id}`, {
                method: 'DELETE'
            });
            loadSpaces();
        });
    });
}
