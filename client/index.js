const rx = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/;
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

const minorMapper = {
    'a': 'c4',
    'b': 'd4',
    'c': 'eb4',
    'd': 'f4',
    'e': 'g4',
    'f': 'bb4',
    'g': 'c5',
    'h': 'd5',
    'i': 'eb5',
    'j': 'f5',
    'k': 'g5',
    'l': 'bb5',
    'm': 'c6',
    'n': 'd6',
    'o': 'eb6',
    'p': 'f6',
    'q': 'g6',
    'r': 'bb6',
    's': 'c7',
    't': 'd7',
    'v': 'eb7',
    'x': 'f7',
    'y': 'g7',
    'z': 'bb7',
}

a = Synth2({ maxVoices:18, waveform:'Triangle', attack:ms(100), decay:ms(5000), amp: .8, resonance: 0, cutoff: 0.1, filterMult: 1, })

const webSocket = new WebSocket('ws://' + window.location.host + '/ws');

webSocket.onmessage = function (event) {
    const emojis = event.data.match(rx);
    let notes;
    if (emojis && emojis.indexOf('🙁') > -1) {
        notes = event.data.split('').map(l => minorMapper[l]);
    } else {
        notes = event.data.split('').map(l => mapper[l]);
    }
    a.play(notes, 1/8);
    document.querySelector('#message h1').innerHTML = event.data;
}