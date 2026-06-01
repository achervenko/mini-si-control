import express from 'express';
const app = express();
const port = 3000;

type InstrumentStatus = 'reserve' | 'issued' | 'written-off' | 'repair';
type VerificationType = 'verification' | 'calibration' | 'vsi';
interface MeasuringInstrument {
    id: number;
    name: string;
    serialNumber: string;
    inventoryNumber: string;
    status: InstrumentStatus;
    verificationType: VerificationType;
}

const instruments: MeasuringInstrument[] = [
    {
        id: 1,
        name: 'Штангенциркуль ШЦ-1',
        serialNumber: 'SN-001',
        inventoryNumber: 'SI-001',
        status: 'reserve',
        verificationType: 'verification'
    },
    {
        id: 2,
        name: 'Микрометр МК-25',
        serialNumber: 'SN-002',
        inventoryNumber: 'SI-002',
        status: 'issued',
        verificationType: 'calibration'
    },
    {
        id: 3,
        name: 'Линейка металлическая 300 мм',
        serialNumber: 'SN-003',
        inventoryNumber: 'VSI-001',
        status: 'reserve',
        verificationType: 'vsi'
    }
];

app.get('/', (req, res) => {
    res.send('Mini SI Control server is running');
});

app.get('/api/instruments', (req, res) => {
    res.json(instruments);
});
app.get('/api/instruments/:id', (req, res) => {
    const idFromUrl = req.params.id;
    const instrumentId = Number(idFromUrl);
    const instrument = instruments.find((instrument) => {
        return instrument.id === instrumentId;
    });

    if (instrument === undefined) {
        res.status(404).json({
            error: 'Instrument not found'
        });

        return;
    }

    res.json(instrument);
});
app.listen(port, () => {
    console.log('Server started: http://localhost:' + port);
});