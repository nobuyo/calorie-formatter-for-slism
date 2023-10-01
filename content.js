const targetAreaToAddButton = document.querySelectorAll('#mainData table')[0];
let wrapper = document.createElement('div');
wrapper.classList.add('slism-formatter-wrapper');

let button = document.createElement('a');
const originalText = 'カロリーをコピーする';
button.innerText = originalText;
button.addEventListener('click', () => {
  const energyLabel = Array.from(document.querySelectorAll('#mainData td')).find((item) => { return item.innerHTML == 'エネルギー' });
  const energyValue = Array.from(energyLabel.parentElement.children)[1].innerText.replace(/[kcalKCAL]+/, '');

  const spans = Array.from(document.querySelectorAll('#mainData span'));
  const nutrients = spans.map((item) => { if (item.id.includes('content')) { return item.innerHTML } }).filter((i) => !!i);

  const formattedContent = [energyValue].concat(nutrients).join("\t");

  const clipboardData = { text: formattedContent };
  navigator.clipboard.writeText(clipboardData.text)
    .then(() => {
      console.log('[slism formatter] copied!');
      button.innerText = 'コピーしました✨'
      setTimeout(() => {
        button.innerText = originalText;
      }, 600);
    })
    .catch(err => {
      console.error('[slism formatter] err', err);
    });
})

wrapper.appendChild(button);
targetAreaToAddButton.parentNode.insertBefore(wrapper, targetAreaToAddButton);
