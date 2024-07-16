document.addEventListener('DOMContentLoaded', async () => {
    // Função para mostrar notificações
    function showNotification(message, type = 'success') {
        const notificationContainer = document.getElementById('notificationContainer');
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerText = message;
        notificationContainer.appendChild(notification);
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notificationContainer.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Função para carregar os espaços
    async function loadSpaces() {
        try {
            const response = await fetch('/spaces');
            if (!response.ok) throw new Error('Erro ao buscar espaços');
            const spaces = await response.json();
            const spaceSelect = document.getElementById('spaceSelect');
            spaceSelect.innerHTML = '<option value="" disabled selected>Selecione um Espaço</option>';
            for (const space of spaces) {
                const option = document.createElement('option');
                option.value = space.id;
                option.textContent = `${space.name} (Capacidade: ${space.capacidade})`;
                spaceSelect.appendChild(option);
            }
        } catch (error) {
            console.error('Erro ao carregar espaços:', error);
            showNotification('Erro ao carregar espaços.', 'error');
        }
    }

    // Função para carregar as reservas
    async function loadBookings() {
        try {
            const response = await fetch('/bookings');
            if (!response.ok) throw new Error('Erro ao buscar reservas');
            const bookings = await response.json();
            const bookingList = document.getElementById('bookingList');
            bookingList.innerHTML = '';
            for (const booking of bookings) {
                const spaceResponse = await fetch(`/spaces/${booking.spaceId}`);
                if (!spaceResponse.ok) throw new Error('Erro ao buscar espaço');
                const space = await spaceResponse.json();
                const li = document.createElement('li');
                const formattedDate = new Date(booking.date).toLocaleDateString('pt-BR');
                li.innerHTML = `
                    <div>
                        Espaço: ${space.name}<br>
                        Data: ${formattedDate}<br>
                        Horário: ${booking.startTime} - ${booking.endTime}
                    </div>
                    <button class="cancelButton" data-id="${booking.id}">Cancelar</button>
                `;
                bookingList.appendChild(li);
            }
            document.querySelectorAll('.cancelButton').forEach(button => {
                button.addEventListener('click', async (e) => {
                    const id = e.currentTarget.dataset.id;
                    await fetch(`/bookings/${id}`, {
                        method: 'DELETE'
                    });
                    loadBookings();
                    showNotification('Reserva cancelada com sucesso.', 'success');
                });
            });
        } catch (error) {
            console.error('Erro ao carregar reservas:', error);
            showNotification('Erro ao carregar reservas.', 'error');
        }
    }

    // Submissão do formulário de reservas
    document.getElementById('bookingForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        try {
            const spaceId = document.getElementById('spaceSelect').value;
            const date = document.getElementById('bookingDate').value;
            const startTime = document.getElementById('startTime').value;
            const endTime = document.getElementById('endTime').value;
            const response = await fetch('/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ spaceId, date, startTime, endTime })
            });
            if (!response.ok) throw new Error('Erro ao criar reserva');
            document.getElementById('bookingForm').reset();
            loadBookings();
            showNotification('Reserva criada com sucesso.', 'success');
        } catch (error) {
            console.error('Erro ao criar reserva:', error);
            showNotification('Erro ao criar reserva. Verifique se o horário está disponível.', 'error');
        }
    });

    // Atualização do horário de término com base na duração
    document.getElementById('startTime').addEventListener('change', () => {
        const duration = document.getElementById('duration').value;
        const startTime = document.getElementById('startTime').value;
        if (startTime) {
            const [hours, minutes] = startTime.split(':').map(Number);
            const endTime = new Date(0, 0, 0, hours + Number(duration), minutes);
            const formattedEndTime = endTime.toTimeString().slice(0, 5);
            document.getElementById('endTime').value = formattedEndTime;
        }
    });

    await loadSpaces();
    await loadBookings();
});