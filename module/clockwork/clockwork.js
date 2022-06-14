let do24H = false;
//let date = new Date();
let date = new Date("01/01/2001 23:50:55");

const h_24 = 440 / 24;
const h_12 = 440 / 12;
const m_s = 440 / 60;

setInterval(() => {
     date = new Date();

    document.getElementById('hours').innerHTML = formatTime(parseHours(date)) + "<br><span>Hours</span>";
    document.getElementById('minutes').innerHTML = formatTime(date.getMinutes()) + "<br><span>Minutes</span>";
    document.getElementById('seconds').innerHTML = formatTime(date.getSeconds()) + "<br><span>Seconds</span>";
    document.getElementById('ampm').innerHTML = date.getHours() < 12 ? "AM" : "PM";

    document.getElementById('hh').style.strokeDashoffset = 440 - parseHours(date) * (do24H ? h_24 : h_12);
    document.getElementById('mm').style.strokeDashoffset = 440 - date.getMinutes() * m_s;
    document.getElementById('ss').style.strokeDashoffset = 440 - date.getSeconds() * m_s;

    document.querySelector('.hh_dot').style.transform = `rotate(${parseHours(date) * (do24H ? 15 : 30)}deg)`;
    document.querySelector('.mm_dot').style.transform = `rotate(${date.getMinutes() * 6}deg)`;
    document.querySelector('.ss_dot').style.transform = `rotate(${date.getSeconds() * 6}deg)`;

})

function parseHours(h) {
    h = h.getHours();

    if (!do24H && h > 12) {
        h = h - 12;
    }
    return h;
}

function formatTime(t) {
    return (t < 10) ? "0" + t : t;
}