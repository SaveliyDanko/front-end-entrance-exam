
document.getElementById('download-pdf').addEventListener('click', () => {
    const element = document.getElementById('resume');


    const options = {
      margin: 1,
      filename:     'resume.pdf',
      image:        { type: 'jpeg', quality: 1},
      html2canvas:  { scale: 2, scrollY: 0,},
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(options).from(element).save();
});

document.querySelectorAll('.editable-text').forEach((el) => {
  el.addEventListener('click', () => {
    el.contentEditable = true;
    el.setAttribute('spellcheck', 'false');
    el.focus();
  });

  el.addEventListener('keydown', (e) => {
    // Разрешаем спец-клавиши
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Enter'];
    if (allowedKeys.includes(e.key)) {
      // Завершение редактирования по Enter
      if (e.key === 'Enter') {
        e.preventDefault();
        el.contentEditable = false;
      }
      return;
    }

    // Предсказать текст после ввода
    const selection = window.getSelection();
    const currentText = el.textContent;
    const cursorPos = selection.anchorOffset;
    const futureText =
      currentText.slice(0, cursorPos) + e.key + currentText.slice(cursorPos);

    // Создаём временный скрытый элемент для измерения ширины
    const temp = document.createElement('span');
    temp.style.visibility = 'hidden';
    temp.style.position = 'absolute';
    temp.style.whiteSpace = 'nowrap';
    temp.style.font = getComputedStyle(el).font;
    temp.textContent = futureText;
    document.body.appendChild(temp);

    const futureWidth = temp.offsetWidth;
    const maxWidth = el.clientWidth;

    document.body.removeChild(temp);

    if (futureWidth > maxWidth) {
      e.preventDefault(); // блокируем ввод
    }
  });

  el.addEventListener('blur', () => {
    el.contentEditable = false;
  });
});

document.querySelectorAll('.editable-text').forEach((el) => {
  el.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');

    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

    this.appendChild(ripple);

    ripple.addEventListener('animationend', () => {
      ripple.remove();
    });
  });
});


