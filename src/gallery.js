function loadProjects() {
    const gallery = document.getElementById('projects-gallery');
    if (!gallery) return;
    
    gallery.innerHTML = ''; // Очищаємо галерею
    
    const projects = JSON.parse(localStorage.getItem('projects') || '{}');
    
    if (Object.keys(projects).length === 0) {
        gallery.innerHTML = '<p>Немає збережених проектів</p>';
        return;
    }
    
    for (const [id, imageData] of Object.entries(projects)) {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.style.margin = '10px';
        projectCard.style.display = 'inline-block';
        
        const img = document.createElement('img');
        img.src = imageData;
        img.style.maxWidth = '200px';
        img.style.maxHeight = '200px';
        img.style.border = '1px solid #ccc';
        
        const openBtn = document.createElement('button');
        openBtn.textContent = 'Відкрити';
        openBtn.onclick = () => window.location.href = `create-room.html?id=${id}`;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Видалити';
        deleteBtn.onclick = () => {
            delete projects[id];
            localStorage.setItem('projects', JSON.stringify(projects));
            loadProjects(); // Перезавантажуємо галерею
        };
        
        projectCard.appendChild(img);
        projectCard.appendChild(document.createElement('br'));
        projectCard.appendChild(openBtn);
        projectCard.appendChild(deleteBtn);
        gallery.appendChild(projectCard);
    }
}

// Завантажуємо проекти при завантаженні сторінки
document.addEventListener('DOMContentLoaded', loadProjects);