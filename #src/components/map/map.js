function initMap() {

    var map = new google.maps.Map(document.querySelector('[data-google-map]'), {
        center: { lat: 55.75511609927905, lng: 37.79662218161654 },
        zoom: 17,
        disableDefaultUI: true,
    });

    var marker = new google.maps.Marker({
        position: { lat: 55.75511609927905, lng: 37.79662218161654 },
        map: map,
        title: '',
        label: '',
        icon: "img/icons/local.svg",
    });
}