let notificationTimer;

export default function showAlert(status, message) {
  hideAlert();

  const notifier = document.createElement('div');
  notifier.setAttribute(
    'class',
    'side-notification bg-white text-black shadow fixed px-4 py-2 rounded show'
  );
  if (status === 'success') {
    const icon = document.createElement('i');
    icon.setAttribute('class', 'fas fa-check mr-2 text-green-600');
    notifier.appendChild(icon);
  }
  const textNode = document.createTextNode(message);
  notifier.appendChild(textNode);

  document.body.appendChild(notifier);

  notificationTimer = window.setTimeout(hideAlert, 3000);
}

function hideAlert() {
  if (notificationTimer) clearTimeout(notificationTimer);
  const notifier = document.querySelector('.side-notification');
  if (notifier) {
    notifier.parentElement.removeChild(notifier);
  }
}
