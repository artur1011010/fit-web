function subscribe(eventName : string, listener: EventListenerOrEventListenerObject) {
    window.addEventListener(eventName, listener);
}

function unsubscribe(eventName: string, listener: EventListenerOrEventListenerObject) {
    window.removeEventListener(eventName, listener);
}

function publish(eventName : string, data: any) {
    const event = new CustomEvent(eventName, { detail: data });
    window.dispatchEvent(event);
}

export { publish, subscribe, unsubscribe};