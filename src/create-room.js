// Ініціалізація Canvas
const canvas = new fabric.Canvas('canvas', {
    selection: true,
    preserveObjectStacking: true,
    isDrawingMode: false,
    imageSmoothingEnabled: true,
    renderOnAddRemove: true,
    skipOffscreen: false
});

// Перш ніж використовувати MetaMask, перевірте його наявність
if (typeof window.ethereum !== 'undefined') {
  console.log('MetaMask is installed!');
} else {
  console.log('Please install MetaMask!');
  // Можна показати повідомлення користувачеві
}

const addCircleBtn = document.getElementById('add-circle-btn');
const addRectBtn = document.getElementById('add-rect-btn');
const addTriangleBtn = document.getElementById('add-triangle-btn');
const addLineBtn = document.getElementById('add-line-btn');
const addStarBtn = document.getElementById('add-star-btn');
const addEllipseBtn = document.getElementById('add-ellipse-btn');
const addPolygonBtn = document.getElementById('add-polygon-btn');
const addSofaBtn = document.getElementById('add-sofa-btn');
const addToiletBtn = document.getElementById('add-toilet-btn');
const addPrinterBtn = document.getElementById('add-printer-btn');
const deleteSelectedBtn = document.getElementById('delete-selected-btn');
const openInstructionBtn = document.getElementById('open-instruction-btn');
const instructionModal = document.getElementById('instruction-modal');
const closeInstructionBtn = document.getElementById('close-instruction-btn');
openInstructionBtn.addEventListener('click', openInstruction);
deleteSelectedBtn.addEventListener('click', deleteSelected);
addCircleBtn.addEventListener('click', addCircle);
addRectBtn.addEventListener('click', addRect);
addTriangleBtn.addEventListener('click', addTriangle);
addLineBtn.addEventListener('click', addLine);
addStarBtn.addEventListener('click', addStar);
addEllipseBtn.addEventListener('click', addEllipse);
addPolygonBtn.addEventListener('click', addPolygon);
addSofaBtn.addEventListener('click', addSofa);
addToiletBtn.addEventListener('click', addToilet);
addPrinterBtn.addEventListener('click', addPrinter);

let zoom = 1; // початковий масштаб

const canvasPlotWidth = canvas.width; // ширина полотна
const canvasPlotHeight = canvas.height; // висота полотна

const scaleX = 100; // масштаб по X
const scaleY = 100; // масштаб по Y

function drawGrid() {
    // Очищаємо полотно
    canvas.clear();
    // Додаємо сітку
    for (let i = 0; i <= canvasPlotHeight + 100000; i = i + scaleY) {
        const line = new fabric.Line([-100000, i - 50000, canvasPlotWidth + 100000, i - 50000], {
            stroke: '#ccc',
            strokeWidth: 2,
            protected: true, // захищаємо лінії від видалення
            selectable: false // лінії не можна виділяти
        });
        canvas.add(line);
        canvas.sendToBack(line); // відправляємо лінії на задній план
    }

    for (let i = 0; i <= canvasPlotWidth + 100000; i = i + scaleX) {
        const line = new fabric.Line([i - 50000, 90000, i - 50000, canvasPlotHeight - 100000], {
            stroke: '#ccc',
            strokeWidth: 2,
            protected: true, // захищаємо лінії від видалення
            selectable: false // лінії не можна виділяти
        });
        canvas.add(line);
        canvas.sendToBack(line); // відправляємо лінії на задній план
    }
    canvas.renderAll();
}

// Додаємо прямокутник
function addRect() {
    const rect = new fabric.Rect({
        left: 100,
        top: 100,
        width: 60,
        height: 40,
        fill: 'lightblue',
        stroke: 'black',
        strokeWidth: 1,
        angle: 0, // початковий кут
        scaleX: 1, // масштаб по X
        scaleY: 1, // масштаб по Y
        hasControls: true, // показувати маркери для масштабування/обертання
        hasBorders: true // показувати рамку виділення
    });
    canvas.add(rect);
    canvas.setActiveObject(rect); // автоматично виділяємо
    canvas.renderAll();
}

// Додаємо коло
function addCircle() {
    const circle = new fabric.Circle({
        left: 200,
        top: 200,
        radius: 30,
        fill: 'lightgreen',
        stroke: 'black',
        strokeWidth: 1,
        hasControls: true,
        hasBorders: true
    });
    canvas.add(circle);
    canvas.setActiveObject(circle);
    canvas.renderAll();
}

// Додаємо трикутник
function addTriangle() {
    const triangle = new fabric.Triangle({
        left: 200,
        top: 100,
        width: 60,
        height: 50,
        fill: 'pink',
        stroke: 'black',
        strokeWidth: 1,
        angle: 0,
        hasControls: true,
        hasBorders: true
    });
    canvas.add(triangle);
    canvas.setActiveObject(triangle);
    canvas.renderAll();
}

// Додаємо лінію
function addLine() {
    const line = new fabric.Line([50, 50, 200, 50], {
        stroke: 'red',
        strokeWidth: 3,
        hasControls: true,
        hasBorders: true
    });
    canvas.add(line);
    canvas.setActiveObject(line);
    canvas.renderAll();
}

// Додаємо зірку
function addStar() {
    const star = new fabric.Path('M 100 10 L 123 70 L 188 70 L 138 107 L 158 170 L 100 135 L 42 170 L 62 107 L 12 70 L 77 70 Z', {
        left: 250,
        top: 100,
        fill: 'gold',
        stroke: 'black',
        strokeWidth: 1,
        hasControls: true,
        hasBorders: true
    });
    canvas.add(star);
    canvas.setActiveObject(star);
    canvas.renderAll();
}

// Додаємо еліпс
function addEllipse() {
    const ellipse = new fabric.Ellipse({
        left: 300,
        top: 150,
        rx: 40, // радіус по X
        ry: 25, // радіус по Y
        fill: 'lightcoral',
        stroke: 'black',
        strokeWidth: 1,
        angle: 0,
        hasControls: true,
        hasBorders: true
    });
    canvas.add(ellipse);
    canvas.setActiveObject(ellipse);
    canvas.renderAll();
}

// Додаємо багатокутник (наприклад, шестикутник)
function addPolygon() {
    const polygon = new fabric.Polygon([
        { x: 350, y: 100 },
        { x: 380, y: 120 },
        { x: 380, y: 150 },
        { x: 350, y: 170 },
        { x: 320, y: 150 },
        { x: 320, y: 120 }
    ], {
        fill: 'lightseagreen',
        stroke: 'black',
        strokeWidth: 1,
        hasControls: true,
        hasBorders: true
    });
    canvas.add(polygon);
    canvas.setActiveObject(polygon);
    canvas.renderAll();
}

// Додаємо зображення з URL
function addSofa() {
    const imgUrl = "https://cdn-icons-png.flaticon.com/512/1010/1010398.png";
    fabric.Image.fromURL(imgUrl, function(img) {
        img.set({
            left: 400,
            top: 100,
            scaleX: 0.5,
            scaleY: 0.5,
            crossOrigin: 'anonymous'  // Додаємо цей параметр
        });
        canvas.add(img).renderAll();
    }, { crossOrigin: 'anonymous' });  // І тут теж
}

// Додаємо зображення з URL
function addToilet() {
    const imgUrl = "https://cdn-icons-png.flaticon.com/128/1047/1047139.png";
    fabric.Image.fromURL(imgUrl, function(img) {
        img.set({
            left: 400,
            top: 100,
            scaleX: 0.5,
            scaleY: 0.5,
            crossOrigin: 'anonymous'  // Додаємо цей параметр
        });
        canvas.add(img).renderAll();
    }, { crossOrigin: 'anonymous' });  // І тут теж
}

// Додаємо зображення з URL
function addPrinter() {
    const imgUrl = "https://cdn-icons-png.flaticon.com/128/2891/2891455.png";
    fabric.Image.fromURL(imgUrl, function(img) {
        img.set({
            left: 400,
            top: 100,
            scaleX: 0.5,
            scaleY: 0.5,
            crossOrigin: 'anonymous'  // Додаємо цей параметр
        });
        canvas.add(img).renderAll();
    }, { crossOrigin: 'anonymous' });  // І тут теж
}

// Видаляємо вибраний об'єкт
function deleteSelected() {
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
        canvas.remove(activeObject);
        canvas.renderAll();
    }
}

// Функція для відкриття інструкції
function openInstruction() {
    // Показуємо модальне вікно з інструкцією
    instructionModal.style.display = 'block';
    // Додаємо обробник для закриття модального вікна при кліку поза його межами
    window.addEventListener('click', function(event) {
        if (event.target === instructionModal) {
            instructionModal.style.display = 'none';
        }
    });
    // Додаємо обробник для закриття модального вікна при натисканні клавіші Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            instructionModal.style.display = 'none';
        }
    });
    // Додаємо обробник для закриття модального вікна при натисканні кнопки "Закрити"
    closeInstructionBtn.addEventListener('click', () => {
        instructionModal.style.display = 'none';
    });
}

// Обробник колеса миші
canvas.on('mouse:wheel', (opt) => {
    const delta = opt.e.deltaY;
    const zoomFactor = 0.01;

    // Отримуємо поточний zoom з канвасу, а не змінну
    let currentZoom = canvas.getZoom();

    // Центр канвасу
    const center = {
        x: canvas.getWidth() / 2,
        y: canvas.getHeight() / 2
    };

    // Зменшуємо масштаб
    if (delta > 0) {
        currentZoom -= zoomFactor;
        if (currentZoom < 0.1) currentZoom = 0.1; // Мінімальний масштаб
    }
    // Збільшуємо масштаб
    else {
        currentZoom += zoomFactor;
        if (currentZoom > 3.0) currentZoom = 3.0; // Максимальний масштаб (можна змінити)
    }

    // Застосовуємо новий zoom
    canvas.zoomToPoint(center, currentZoom);

    // Блокуємо прокрутку сторінки
    opt.e.preventDefault();
    opt.e.stopPropagation();
});

// Ініціалізація сітки
drawGrid();

let isDragging = false;
let lastPosX, lastPosY;

canvas.on('mouse:down', (opt) => {
    if (opt.e.ctrlKey) { // Утримуємо Ctrl для панорамування
        isDragging = true;
        lastPosX = opt.e.clientX;
        lastPosY = opt.e.clientY;
        canvas.selection = false; // Вимкнути виділення
    }
});

canvas.on('mouse:move', (opt) => {
    if (isDragging) {
        const deltaX = opt.e.clientX - lastPosX;
        const deltaY = opt.e.clientY - lastPosY;
        canvas.relativePan({ x: deltaX, y: deltaY });
        lastPosX = opt.e.clientX;
        lastPosY = opt.e.clientY;
    }
});

canvas.on('mouse:up', () => {
    isDragging = false;
    canvas.selection = true;
});

document.addEventListener('keydown', (e) => {
    if (e.key === '0') { // Натисніть "0", щоб скинути масштаб
        canvas.setZoom(1);
        canvas.viewportTransform = [1, 0, 0, 1, 0, 0]; // Скинути pan
    }
});

// Основний цикл малювання
// Глобальні змінні
let points = [];
let customShape = null;
let activePoint = null;
let canDrawDot = false;
let drawingEventHandlers = {};

// Додаємо кнопку для перемикання режиму малювання крапок
document.getElementById('draw-dot-btn').addEventListener('click', paintingDotMode)

// Ініціалізація подій канвасу
function paintingDotMode() {
    canDrawDot = !canDrawDot;

    if (canDrawDot) {
        // Увімкнення режиму точок
        canvas.isDrawingMode = false;
        canvas.selection = false;
        canvas.defaultCursor = 'crosshair';

        // Обробник кліку миші (додавання нових точок)
        drawingEventHandlers.mouseDown = (options) => {
            const pointer = canvas.getPointer(options.e);

            // Якщо клікнули на існуючу точку - починаємо переміщення
            if (options.target?.isControlPoint) {
                activePoint = options.target.pointIndex;
                return;
            }

            // Додаємо нову точку
            points.push({ x: pointer.x, y: pointer.y });
            updateCustomShape();
            addControlPoints();
        };

        // Обробник переміщення миші (переміщення точок)
        drawingEventHandlers.mouseMove = (options) => {
            if (activePoint === null) return;

            const pointer = canvas.getPointer(options.e);
            points[activePoint] = { x: pointer.x, y: pointer.y };
            updateCustomShape();
            addControlPoints();
        };

        // Обробник відпускання миші
        drawingEventHandlers.mouseUp = () => {
            activePoint = null;
        };

        // Обробник подвійного кліку (додавання точки між існуючими)
        drawingEventHandlers.dblClick = (options) => {
            if (points.length < 2) return;

            const pointer = canvas.getPointer(options.e);
            let closestSegment = null;
            let minDistance = Infinity;

            // Знаходимо найближчий сегмент лінії
            for (let i = 0; i < points.length; i++) {
                const nextIndex = (i + 1) % points.length;
                const segmentDist = distanceToSegment(
                    pointer,
                    points[i],
                    points[nextIndex]
                );

                if (segmentDist < minDistance) {
                    minDistance = segmentDist;
                    closestSegment = i;
                }
            }

            // Додаємо нову точку, якщо клік ближче ніж 20 пікселів до лінії
            if (closestSegment !== null && minDistance < 20) {
                const insertIndex = closestSegment + 1;
                points.splice(insertIndex, 0, { x: pointer.x, y: pointer.y });
                updateCustomShape();
                addControlPoints();
            }
        };

        // Додаємо всі обробники подій
        canvas.on('mouse:down', drawingEventHandlers.mouseDown);
        canvas.on('mouse:move', drawingEventHandlers.mouseMove);
        canvas.on('mouse:up', drawingEventHandlers.mouseUp);
        canvas.on('mouse:dblclick', drawingEventHandlers.dblClick);

    } else {
        // Вимкнення режиму точок
        canvas.defaultCursor = 'default';

        // Видаляємо всі обробники подій
        if (drawingEventHandlers.mouseDown) {
            canvas.off('mouse:down', drawingEventHandlers.mouseDown);
        }
        if (drawingEventHandlers.mouseMove) {
            canvas.off('mouse:move', drawingEventHandlers.mouseMove);
        }
        if (drawingEventHandlers.mouseUp) {
            canvas.off('mouse:up', drawingEventHandlers.mouseUp);
        }
        if (drawingEventHandlers.dblClick) {
            canvas.off('mouse:dblclick', drawingEventHandlers.dblClick);
        }

        // Очищаємо посилання на обробники
        drawingEventHandlers = {};
    }
}

// Допоміжні функції
function updateCustomShape() {
    const path = pointsToPath(points);
    if (customShape) {
        canvas.remove(customShape);
    }
    if (points.length > 1) {
        customShape = new fabric.Path(path, {
            fill: 'rgba(100, 200, 255, 0.5)',
            stroke: 'blue',
            strokeWidth: 2,
            selectable: true
        });
        canvas.add(customShape);
    }
}

function addControlPoints() {
    // Видаляємо старі контрольні точки
    canvas.getObjects()
        .filter(obj => obj.isControlPoint)
        .forEach(obj => canvas.remove(obj));

    // Додаємо нові точки
    points.forEach((point, index) => {
        const circle = new fabric.Circle({
            left: point.x,
            top: point.y,
            radius: 5,
            fill: 'red',
            originX: 'center',
            originY: 'center',
            isControlPoint: true,
            pointIndex: index,
            selectable: false,
            hasControls: false,
            hasBorders: false
        });
        canvas.add(circle);
    });
}

function pointsToPath(points, closed = false) {
    if (points.length === 0) return '';
    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
        path += ` L ${points[i].x} ${points[i].y}`;
    }
    return closed ? path + ' z' : path;
}

function distanceToSegment(p, a, b) {
    const A = p.x - a.x;
    const B = p.y - a.y;
    const C = b.x - a.x;
    const D = b.y - a.y;

    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    let param = -1;

    if (lenSq !== 0) param = dot / lenSq;

    let xx, yy;

    if (param < 0) {
        xx = a.x;
        yy = a.y;
    } else if (param > 1) {
        xx = b.x;
        yy = b.y;
    } else {
        xx = a.x + param * C;
        yy = a.y + param * D;
    }

    return Math.sqrt((p.x - xx) ** 2 + (p.y - yy) ** 2);
}

// Ініціалізація
document.getElementById('draw-dot-btn').addEventListener('click', paintingDotMode);
document.getElementById('finish').addEventListener('click', () => {
    if (points.length >= 3) {
        const path = pointsToPath(points, true);
        updateShape(path);
    }
});

function updateShape(path) {
    if (customShape) canvas.remove(customShape);
    customShape = new fabric.Path(path, {
        fill: 'rgba(100, 200, 255, 0.5)',
        stroke: 'blue',
        strokeWidth: 2,
        selectable: true
    });
    canvas.add(customShape);
}

// Збереження проекту
document.getElementById('save-btn').addEventListener('click', () => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const projectId = urlParams.get('id') || generateProjectId();
        
        const dataURL = canvas.toDataURL({
            format: 'png',
            quality: 0.8
        });
        
        const projects = JSON.parse(localStorage.getItem('projects') || '{}');
        projects[projectId] = dataURL;
        localStorage.setItem('projects', JSON.stringify(projects));
        
        alert('Проект успішно збережено!');
    } catch (error) {
        console.error('Помилка збереження:', error);
        alert('Сталася помилка при збереженні');
    }
});

// Генерація ID проекту
function generateProjectId() {
    return 'project-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

// Завантаження проекту
if (window.location.search.includes('id=')) {
    const projectId = new URLSearchParams(window.location.search).get('id');
    const projects = JSON.parse(localStorage.getItem('projects') || '{}');
    
    if (projects[projectId]) {
        fabric.Image.fromURL(projects[projectId], function(img) {
            canvas.add(img).renderAll();
        }, { crossOrigin: 'anonymous' });
    }
}

// Функція для видалення незахищених об'єктів
document.getElementById("clear-btn").addEventListener('click', () => {
    canvas.getObjects().forEach(obj => {
        if (!obj.protected) {
            canvas.remove(obj);
        }
    });
    canvas.renderAll();
});

let isDrawingMode = false;
let currentPath = null;

// Кнопка режиму малювання
document.getElementById('draw-btn').addEventListener('click', function () {
    isDrawingMode = !isDrawingMode;

    if (isDrawingMode) {
        this.textContent = 'Зупинити малювання';
        canvas.selection = false;
        canvas.defaultCursor = 'crosshair';
    } else {
        this.textContent = 'Режим малювання';
        canvas.selection = true;
        canvas.defaultCursor = 'default';
    }
});

// Обробники малювання
canvas.on('mouse:down', function (options) {
    if (!isDrawingMode) return;

    const pointer = canvas.getPointer(options.e);
    currentPath = new fabric.Path(`M ${pointer.x} ${pointer.y}`, {
        stroke: document.getElementById('color-picker').value,
        strokeWidth: 3,
        fill: 'transparent',
        selectable: false
    });
    canvas.add(currentPath);
});

canvas.on('mouse:move', function (options) {
    if (!isDrawingMode || !currentPath) return;

    const pointer = canvas.getPointer(options.e);
    currentPath.path.push(['L', pointer.x, pointer.y]);
    canvas.requestRenderAll();
});

canvas.on('mouse:up', function () {
    currentPath = null;
});

let textObject = null;
let isEditing = false;

// Додавання тексту
document.getElementById('add-text-btn').addEventListener('click', () => {
    if (isEditing) return;

    textObject = new fabric.Textbox('Натисніть для редагування', {
        left: 100,
        top: 100,
        width: 200,
        fontSize: 20,
        fill: '#000000',
        borderColor: '#3f51b5',
        cornerColor: '#3f51b5',
        cornerSize: 10,
        transparentCorners: false,
        hasControls: true,
        lockUniScaling: true,
        padding: 5
    });

    canvas.add(textObject);
    canvas.setActiveObject(textObject);
    canvas.requestRenderAll();
});

// Редагування тексту
document.getElementById('edit-text-btn').addEventListener('click', () => {
    const activeObject = canvas.getActiveObject();
    if (!activeObject || !(activeObject instanceof fabric.Textbox)) {
        alert('Виберіть текстовий об\'єкт для редагування');
        return;
    }

    isEditing = true;
    activeObject.enterEditing();
    activeObject.hiddenTextarea.focus();

    // Вихід з режиму редагування при втраті фокусу
    activeObject.on('editing:exited', () => {
        isEditing = false;
    });
});

// Додаткові налаштування для кращого досвіду
canvas.on('object:selected', (e) => {
    if (e.target instanceof fabric.Textbox) {
        e.target.set({
            borderColor: '#ff5722',
            cornerColor: '#ff5722'
        });
        canvas.requestRenderAll();
    }
});

canvas.on('object:modified', (e) => {
    console.log('Об\'єкт змінено:', e.target);
});