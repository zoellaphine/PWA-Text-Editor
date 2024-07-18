const butInstall = document.getElementById('buttonInstall');
let stashedPrompt;

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    stashedPrompt = event;
    butInstall.removeAttribute('hidden');
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    stashedPrompt.prompt();
    const result = await stashedPrompt.userChoice;
    console.log(result);
    butInstall.setAttribute('hidden', '');
    stashedPrompt = null;
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('PWA has been installed', event);
});
