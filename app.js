let scanner = null;

function startScanner() {

    document.getElementById("status").innerHTML = "📷 Opening camera...";

    scanner = new Html5Qrcode("reader");

    Html5Qrcode.getCameras().then(devices => {

        if (devices.length) {

            scanner.start(
                devices[0].id,
                {
                    fps: 10,
                    qrbox: 250
                },
                onScanSuccess,
                errorMessage => {}
            );

        }

    }).catch(err => {

        document.getElementById("status").innerHTML =
        "❌ Camera Error : " + err;

    });

}

function onScanSuccess(decodedText){

    document.getElementById("status").innerHTML =
        "✅ QR Detected";

    document.getElementById("lastScan").innerHTML =
        decodedText;

    if(scanner){
        scanner.stop();
    }

    fetch("https://script.google.com/macros/s/AKfycbzU7ofMGyxf56FxtXR5Mz_ObUr5RTXT9SmnA2P0CqFZkR0_XbR9nHqu64dJ3Ay2Jqo2ZQ/exec", {

    method: "POST",

    body: JSON.stringify({

        id: decodedText,

        deviceID: "IPHONE-01",

        secretKey: "@123"

    })

})
.then(response => response.json())

.then(result => {

    document.getElementById("status").innerHTML =
        result.message;

})

.catch(error => {

    document.getElementById("status").innerHTML =
        "❌ Error : " + error;

});
}
