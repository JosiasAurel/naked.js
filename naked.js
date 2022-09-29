
const elementList = "h1 h2 h3 h4 h5 h6 p div em meta br script html head title a style aside section u i abbr address input area article code form kbd li ul ol nav header span".split(" ");

let elementsPseudoStyle = [];

for (let element of elementList) {
    switch (element) {
        case "a":
            elementsPseudoStyle.push(
                `
                    ${element}::before {
                        content: "<${element} href='"attr(href)"'>";
                    }
                    ${element}::after {
                        content: "</${element}>"
                    }
                `
            );
            break;
        case "script":
            elementsPseudoStyle.push(
                `
                    ${element}::before {
                        content: "<${element} src='"attr(sr)"'>";
                    }
                    ${element}::after {
                        content: "</${element}>"
                    }
                `
            );
            break;
        case "br":
            elementsPseudoStyle.push(
                `
                    ${element}::before {
                        content: "<br";
                    }
                    ${element}::after {
                        content: " />"
                    }
                `
            );
            break;
        default:
            elementsPseudoStyle.push(
                `
                    ${element}::before {
                        content: "<${element}>";
                    }
                    ${element}::after {
                        content: "</${element}>"
                    }
                `
            );
    }
    }

elementsPseudoStyle.push("*::before, *::after { color: grey;  }");
elementsPseudoStyle.push("* { display: block; } style, blockquote { white-space: pre-wrap;  } a, code, em, strong { display: inline;  }"); // y'all are now naked muhahaha

function injectNotSoMagical() {

    // get the first style tag
    let style;
    try {
        style = document.getElementsByTagName("style")[0];
        style.innerHTML += elementsPseudoStyle.join("");
    } catch(e) {
        style = document.createElement("style");
        style.innerHTML = elementsPseudoStyle.join("");
        document.body.appendChild(style);
    }
}

window.addEventListener("DOMContentLoaded", injectNotSoMagical);

// please work

