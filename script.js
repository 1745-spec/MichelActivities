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
        const temp = Math.round((position * 40) - 20); // Range is -20 to +20
        tempVal.textContent = temp;
    };

    const handleMouseDown = (e) => {
        activeDot = e.target;
        offsetX = e.clientX - activeDot.getBoundingClientRect().left;
        activeDot.style.cursor = 'grabbing';
    };

    const handleMouseMove = (e) => {
        if (!activeDot) return;
        e.preventDefault();

        const lineRect = numberLine.getBoundingClientRect();
        let newX = e.clientX - lineRect.left - offsetX;

        if (newX < 0) newX = 0;
        if (newX > lineRect.width) newX = lineRect.width;

        activeDot.style.left = `${newX}px`;

        if (activeDot.id === 'dotA') {
            updateTemp(dotA, tempAVal);
        } else if (activeDot.id === 'dotB') {
            updateTemp(dotB, tempBVal);
        }
    };

    const handleMouseUp = () => {
        if (activeDot) {
            activeDot.style.cursor = 'grab';
            activeDot = null;
        }
    };

    dotA.addEventListener('mousedown', handleMouseDown);
    dotB.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
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
                    imgElement.previousElementSibling.style.display = 'none'; // Hide the 'City A' paragraph
                };
                reader.readAsDataURL(file);
            }
        });
    };

    handleFileSelect(fileA, imgA);
    handleFileSelect(fileB, imgB);
});