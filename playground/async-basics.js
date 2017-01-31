console.log('Starting app');

setTimeout(() => {
    console.log('Inside the callback');
}, 2000); //2 secs

setTimeout(() => {
    console.log('NO DELAY');
}, 0);

console.log('Finishing up');