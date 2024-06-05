actualiserPosition()
setInterval(actualiserPosition, 10000);

async function actualiserPosition() {
    try {
        const response = await fetch('http://api.open-notify.org/iss-now.json')
        const json = await response.json()
        console.log("json = ", json)

        let position = json.iss_position
        console.log("position = ", position)

        let latitude = position.latitude
        let longitude = position.longitude

        const container = document.getElementById('position')
        container.textContent = "Latitude = " + latitude + " | Longitude = " + longitude

        var myIcon = L.icon({
            iconUrl: "./img/marker-station-spacial.png",
            iconSize: [38, 38],
            iconAnchor: [22, 94],
            popupAnchor: [-3, -76],
            shadowSize: [68, 95],
            shadowAnchor: [22, 94]
        });



        var map = L.map('map').setView([latitude, longitude], 5);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        var marker = L.marker([latitude, longitude], { icon: myIcon }).addTo(map);


    } catch (e) {
        console.error(e)
    }
}

