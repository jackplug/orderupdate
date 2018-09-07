/*jshint esversion: 6 */

//create an empty array on startup
let exampleHistory = [];
const API_BASE = "https://api.thecatapi.com/";
const API_EXAMPLE = API_BASE + "v1/images/search/?";
const API_SIZE = '&size=small';

/**
 * generate example tag from a Javascript Object that containt the example information
 */
function buildExampleMarkup(example) {
    return `<div class="example_item"><img class='example_image' src=${example[0].url} />
        <h2 class='example_name'>${example[0].id}</h2></div>`;
}

/**
 * add an example to the history and updates display
 */
function updateHistory(example) {
    exampleHistory.push(example);
    //update display
    addExampleToHistoryTag(example);
}

/**
 * Update the DOM
 */
function addExampleToHistoryTag(example) {
    document.querySelector('#history').innerHTML = buildExampleMarkup(example) + document.querySelector('#history').innerHTML;
}

/**
 * loadAnExample from the internet and place it on a target element
 */
async function onOkButtonClickAsync() {
    let targetElementId = '#main_example';
    let exampleId = document.querySelector("#example_id_input").value;
    try {
        const response = await fetch(API_EXAMPLE + exampleId + API_SIZE);
        if (!response.ok) {
            return;
        }
        let example = await response.json();
        console.log("example", example);
        document.querySelector(targetElementId).innerHTML = buildExampleMarkup(example);

        updateHistory(example);
    } catch (err) {
        console.error(`error ${err}`);
    }
}

/**
 * Install the service worker
 */
async function installServiceWorkerAsync() {
    if ('serviceWorker' in navigator) {
        try {
            let serviceWorker = await navigator.serviceWorker.register('/sw.js')
            console.log(`Service worker registered ${serviceWorker}`)
        } catch (err) {
            console.error(`Failed to register service worker: ${err}`)
        }
    }
}
