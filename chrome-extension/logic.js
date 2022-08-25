function parseResponse() {
    var txt = this.responseText;
    const regexp = /"email"\s*:\s*"(.*?)"/g;
    const matches = [...txt.matchAll(regexp)];
    const group1s = matches.map(x => x[1])
    const uniques = Array.from(new Set(group1s));
    uniques.sort(compareEmails);
    el("answer").innerHTML = uniques.join("<br>");
    el("answer-head").style.display = "inherit";
}

function getEmailCategory(email) {
    if (/.*@example.com/.test(email)) {
        return 2;
    } else if (/.*@users.noreply.github.com/.test(email)) {
        return 1;
    } else {
        return 0;
    }
}

function compareEmails(a, b) {
    aCat = getEmailCategory(a);
    bCat = getEmailCategory(b);
    if (aCat != bCat) {
        return aCat - bCat;
    }
    return a < b ? -1 : a > b ? 1 : 0;
}

function el(id) {
    return document.getElementById(id);
}

function getEmails() {
    el("answer").innerText = "...";
    var request = new XMLHttpRequest();
    handle = el("handle").value;
    request.onload = parseResponse;
    url = 'https://api.github.com/users/' + handle + '/events/public'
    request.open('get', url);
    request.send()
}

function acceptEnter(e) {
    e = window.event;
    if (e.keyCode === 13) {
        getEmails();
    }
}
