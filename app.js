let scanner = null;

function startScanner() {

    document.getElementById("status").innerHTML = "📷 Opening camera...";

    scanner = new Html5Qrcode("reader");

    scanner.start(
        {
            facingMode: "environment"
        },
        {
            fps: 10,
            qrbox: {
                width: 250,
                height: 250
            }
        },
        onScanSuccess,
        function(error){
            // Ignore scan errors
        }

    ).catch(function(err){
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

    // මෙතනින් පස්සේ Apps Script API එකට data යවනවා.
}
