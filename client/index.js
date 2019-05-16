Gibber.init();

const mapper = {
    'a': 'c4',
    'b': 'd4',
    'c': 'e4',
    'd': 'f4',
    'e': 'g4',
    'f': 'b4',
    'g': 'c5',
    'h': 'd5',
    'i': 'e5',
    'j': 'f5',
    'k': 'g5',
    'l': 'b5',
    'm': 'c6',
    'n': 'd6',
    'o': 'e6',
    'p': 'f6',
    'q': 'g6',
    'r': 'b6',
    's': 'c7',
    't': 'd7',
    'v': 'e7',
    'x': 'f7',
    'y': 'g7',
    'z': 'b7',
}

a = Synth2({ maxVoices:18, waveform:'Triangle', attack:ms(100), decay:ms(5000), amp: .8, resonance: 0, cutoff: 0.1, filterMult: 1, })

const webSocket = new WebSocket('ws://' + window.location.host + '/ws');

webSocket.onmessage = function (event) {
    document.querySelector('#message h1').innerHTML = event.data;
    const notes = event.data.split('').map(l => mapper[l]);
    a.play(notes, 1/8);
}