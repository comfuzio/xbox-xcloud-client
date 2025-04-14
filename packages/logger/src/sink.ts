export interface SinkData {
    timestamp: number;
    timeSinceStart: number;
    timestampSinceLastLog: number;
    data: string;
}

export default class Sink {
    static _startTimestamp:DOMHighResTimeStamp = performance.now()
    static _instance:Sink;
    static _instances:Map<string, Sink> = new Map<string, Sink>();

    private name;
    private data:SinkData[] = [];
    private _lastLogTimestamp:DOMHighResTimeStamp = performance.now()

    constructor(name:string){
        this.name = name
        const curInstance = Sink._instances.get(name)
        if(curInstance === undefined){
            Sink._instances.set(name, this)
            this._lastLogTimestamp = performance.now()
        } else {
            return curInstance
        }
    }

    addLog(log:string){
        const logData = {
            timestamp: Date.now(),
            timeSinceStart: performance.now() - Sink._startTimestamp,
            timestampSinceLastLog: performance.now() - this._lastLogTimestamp,
            data: log
        }
        Sink._instances.get(this.name)?.data.push(logData)
        return logData
    }

    getData(){
        return Sink._instances.get(this.name)?.data
    }
}