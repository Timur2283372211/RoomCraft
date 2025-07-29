// Генерація унікального ID для проекту
function generateProjectId() {
  return 'project-' + Math.random().toString(36).substr(2, 9);
}

// Обробник кнопки "Створити проект"
document.getElementById('create-project-btn').addEventListener('click', () => {
  const projectId = generateProjectId();
  window.location.href = `../src/partials/create-room.html?id=${projectId}`;
});