// CreateElement
export function createElement (tag, className, text, type, placeholder) {
    let classArray = className.split(' ');
    let el = document.createElement(tag);

    text ? (el.innerText = text) : null;

    type ? (el.type = type) : null;

    placeholder ? (el.placeholder = placeholder) : null;

    if (classArray.length > 1) {
        classArray.forEach((cl) => {
            el.classList.add(cl);
        });
    } else {
        className ? el.classList.add(className) : null;
    }

    return el;
}

// GetDate
export function getDate() {
    let d = new Date();
    return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`
}
