document.addEventListener('DOMContentLoaded', () => {
    const numberLine = document.querySelector('.number-line');
    const dotA = document.getElementById('dotA');
    const dotB = document.getElementById('dotB');
    const tempAVal = document.getElementById('tempA-val');
    const tempBVal = document.getElementById('tempB-val');
    const fileA = document.getElementById('fileA');
    const fileB = document.getElementById('fileB');
    const imgA = document.getElementById('imgA');
    const imgB = document.getElementById('imgB');

    let activeDot = null;
    let offsetX = 0;

    // --- Drag and Drop for Dots ---
    const updateTemp = (dot, tempVal) => {
        const lineRect = numberLine.getBoundingClientRect();
        const dotRect = dot.getBoundingClientRect();
        const dotCenter = dotRect.left + dotRect.width / 2;

        const position = (dotCenter - lineRect.left) / lineRect.width;
        const temp = Math.round((position * 60) - 30); // Range is -30 to +30
        tempVal.textContent = temp;
    };

    // --- Unified Event Handlers for Mouse and Touch ---
    const startDrag = (e) => {
        // Prevent default browser behavior like scrolling on touch
        e.preventDefault(); 
        
        activeDot = e.target;
        // Use 'e.touches[0].clientX' for touch events, 'e.clientX' for mouse events
        const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
        offsetX = clientX - activeDot.getBoundingClientRect().left;
        activeDot.style.cursor = 'grabbing';
    };

    const moveDrag = (e) => {
        if (!activeDot) return;
        e.preventDefault();

        const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
        const lineRect = numberLine.getBoundingClientRect();
        let newX = clientX - lineRect.left - offsetX;

        // Constrain the dot within the number line bounds
        if (newX < 0) newX = 0;
        if (newX > lineRect.width) newX = lineRect.width;

        activeDot.style.left = `${newX}px`;

        // Update the temperature display
        if (activeDot.id === 'dotA') {
            updateTemp(dotA, tempAVal);
        } else if (activeDot.id === 'dotB') {
            updateTemp(dotB, tempBVal);
        }
    };

    const endDrag = () => {
        if (activeDot) {
            activeDot.style.cursor = 'grab';
            activeDot = null;
        }
    };

    // Add unified event listeners
    dotA.addEventListener('mousedown', startDrag);
    dotB.addEventListener('mousedown', startDrag);
    dotA.addEventListener('touchstart', startDrag);
    dotB.addEventListener('touchstart', startDrag);

    document.addEventListener('mousemove', moveDrag);
    document.addEventListener('touchmove', moveDrag);

    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);
    document.addEventListener('touchcancel', endDrag);

    // Initialize temperatures
    updateTemp(dotA, tempAVal);
    updateTemp(dotB, tempBVal);

    // --- File Input for Images ---
    const handleFileSelect = (fileInput, imgElement) => {
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    imgElement.src = event.target.result;
                    imgElement.style.display = 'block';
                    imgElement.previousElementSibling.style.display = 'none';
                };
                reader.readAsDataURL(file);
            }
        });
    };

    handleFileSelect(fileA, imgA);
    handleFileSelect(fileB, imgB);
});

