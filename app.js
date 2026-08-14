let scanner = null;

function startScanner() {

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
            "❌ Camera Error : " + err;

    });

}


function onScanSuccess(decodedText) {

    document.getElementById("status").innerHTML =
        "⏳ Processing...";


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


        // --------------------------------
        // Student name available
        // --------------------------------

        if (result.name) {

            document.getElementById("status").innerHTML =
                result.message;

            document.getElementById("lastScan").innerHTML =
                "<strong>" + result.name + "</strong>";

        }


        // --------------------------------
        // No student name
        // --------------------------------

        else {

            document.getElementById("status").innerHTML =
                result.message;

            document.getElementById("lastScan").innerHTML =
                "";

        }

    })


    .catch(error => {

        document.getElementById("status").innerHTML =
            "❌ Connection Error";

        document.getElementById("lastScan").innerHTML =
            "";

        console.log(error);

    });

}


window.onload = function () {

    startScanner();

};
