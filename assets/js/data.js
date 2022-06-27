function fetchAndRender (name) {
    fetch('/data/' + name + '.json')
        .then(response => response.json())
        .then(data => {
            const mysource = document.getElementById(name + '-template').innerHTML;
            const mytemplate = Handlebars.compile(mysource);
            const myresult = mytemplate(data);
            document.getElementById(name).innerHTML = myresult;
        });
}

document.addEventListener('DOMContentLoaded', () => {
    fetchAndRender('themes');
    fetchAndRender('apps');
    fetchAndRender('links');
    fetchAndRender('providers');
});
