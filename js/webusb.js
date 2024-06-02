/* Tutaj dodaj swój kod JavaScipt.

Jeśli używasz jQuery, nie zapomnij ująć swój kod wewnątrz jQuery.ready() jak na przykładzie:

jQuery(document).ready(function( $ ){
    // Tutaj Twój kod
});

--

Jeśli chcesz podlinkować plik JavaScript, który znajduje się na innym serwerze
(np. <script src="https://przykladowa-domena.pl/twoj-plik.js"></script>), użyj opcji
"Dodaj wstawkę HTML", jako że jest to kod HTML linkujący do pliku JavaScript.

Koniec komentarza */

jQuery(document).ready(function ($) {


    // navigator.serial.addEventListener('connect', (e) => {
    //     console.log("connect", e)
    //     // Connect to `e.target` or add it to a list of available ports.
    // });

    // navigator.serial.addEventListener('disconnect', (e) => {
    //     console.log("disconnect", e)
    //     // Remove `e.target` from the list of available ports.
    // });

    // navigator.serial.getPorts().then((ports) => {
    //     console.log("ports", ports)
    //     // Initialize the list of available ports with `ports` on page load.
    // });

    // var button = document.getElementsByClassName('getdev')[0];
    // button.addEventListener('click', () => {
    //     const usbVendorId = 0x10C4;
    //     navigator.serial.requestPort({ filters: [{ usbVendorId }] }).then((port) => {
    //         console.log("port", port)

    //         while (port.readable) {
    //             const reader = port.readable.getReader();
    //             try {
    //                 while (true) {
    //                     const { value, done } = await reader.read();
    //                     if (done) {
    //                         // |reader| has been canceled.
    //                         break;
    //                     }
    //                     // Do something with |value|...
    //                 }
    //             } catch (error) {
    //                 // Handle |error|...
    //             } finally {
    //                 reader.releaseLock();
    //             }
    //         }
    //         // Connect to `port` or add it to the list of available ports.
    //     }).catch((e) => {
    //         console.log("error", e)
    //         // The user didn't select a port.
    //     });
    // });

    function getDevices() {
        let statusDiv = $('.devstatus')
        const filters = [
            { vendorId: 0x10C4, productId: 0xEA60 },
            { vendorId: 0x10c4, productId: 0xea61 }
        ];
        navigator.usb.requestDevice({ filters: filters })
            .then(selectedDevice => {
                console.log({selectedDevice})
                device = selectedDevice;
                return device.open(); // Begin a session.
            })
            .then(() => device.selectConfiguration(1)) // Select configuration #1 for the device.
            .then(() => device.claimInterface(0)) // Request exclusive control over interface #2.
            .then(() => device.controlTransferOut({
                requestType: 'class',
                recipient: 'interface',
                request: 0x22,
                value: 0x01,
                index: 0x00
            })) // Ready to receive data
            // .then(() => device.transferIn(5, 64)) // Waiting for 64 bytes of data from endpoint #5.
            // .then(result => {
            //     const decoder = new TextDecoder();
            //     console.log('Received: ' + decoder.decode(result.data));
            // })
            .catch(error => { 
                console.log({error}); 
                console.error(error); 
            });
    }

    $('.getdev').click(() => getDevices())

});