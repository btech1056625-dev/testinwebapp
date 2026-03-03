document.addEventListener("DOMContentLoaded", () => {
    const noteForm = document.getElementById("noteForm");

    if (noteForm) {
        noteForm.addEventListener("submit", async function (e) {
            e.preventDefault();

            const noteInput = document.getElementById("noteText");
            const note = noteInput.value.trim();
            if (!note) return;

            try {
                const response = await fetch("/notes", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ note })
                });

                const data = await response.json();

                if (response.ok) {
                    // Alert success message as requested
                    alert(data.message);

                    // Add the note to the UI
                    const notesGrid = document.getElementById('notesGrid');
                    const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

                    const noteCard = document.createElement('div');
                    noteCard.className = 'note-card';

                    // XSS prevention mock
                    const safeText = note.replace(/</g, "&lt;").replace(/>/g, "&gt;");

                    noteCard.innerHTML = `
                        <div class="note-content">${safeText}</div>
                        <div class="note-meta">
                            <span>${date}</span>
                            <button class="btn-delete" title="Delete Note" onclick="this.closest('.note-card').remove()">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    `;

                    // Insert at the beginning of the grid
                    notesGrid.insertBefore(noteCard, notesGrid.firstChild);

                    // Clear textarea
                    noteInput.value = '';
                } else {
                    alert(data.error || "Failed to add note");
                }
            } catch (err) {
                console.error("Error adding note:", err);
                alert("An error occurred while adding the note.");
            }
        });
    }
});
