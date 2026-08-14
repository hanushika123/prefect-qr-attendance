let scanner = null;
let isProcessing = false;


function startScanner() {

    if (isProcessing) {
        return;
    }

    document.getElementById("status").innerHTML =
        "📷 Opening camera...";

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
            "❌ Camera Error";

        console.log(err);

    });

}


function onScanSuccess(decodedText) {

    // Already processing another scan
    if (isProcessing) {
        return;
    }

    // Lock immediately
    isProcessing = true;


    document.getElementById("status").innerHTML =
        "⏳ Processing...";


    // Stop camera immediately
    if (scanner) {

        scanner.stop().catch(function(err) {
            console.log(err);
        });

    }


    fetch(
        "https://script.google.com/macros/s/AKfycbyBooVusDKejBoHvYV5a-_98PHEHCZhebz74VwHJMlXUu3e6i1vi_ugK-wuCBc0-_qOTg/exec",
        {

            method: "POST",

            body: JSON.stringify({

                id: decodedText,

                deviceID: "IPHONE-01",

                secretKey: "@123"

            })

        }
    )

    .then(response => response.json())

    .then(result => {

        console.log(result);


        if (result.name) {

            document.getElementById("status").innerHTML =
                result.message;

            document.getElementById("lastScan").innerHTML =
                "<strong>" + result.name + "</strong>";

        }

        else {

            document.getElementById("status").innerHTML =
                result.message;

            document.getElementById("lastScan").innerHTML =
                "";

        }


        // Start scanner again after 2 seconds
        setTimeout(function() {

            isProcessing = false;

            startScanner();

        }, 2000);

    })


    .catch(error => {

        console.log(error);

        document.getElementById("status").innerHTML =
            "❌ Connection Error";

        document.getElementById("lastScan").innerHTML =
            "";


        setTimeout(function() {

            isProcessing = false;

            startScanner();

        }, 2000);

    });

}


window.onload = function() {

    startScanner();

};
