export class KRLApi {
    static #instance: KRLApi;
    private url: string;

    private constructor() {
        this.url = "https://corsproxy.io/?url=" + encodeURIComponent("https://kci.id/api/krl");
    }

    public static get instance() {
        if (!this.#instance)
            this.#instance = new KRLApi;
        return this.#instance;
    }

    public async callApi(path: string) {
        try {
            const res = await fetch(this.url + path);
            if (!res.ok)
                throw new Error(`status: ${res.status}`);

            const json = await res.json();
            return json;
        } catch (error: any) {
            console.error(error.message);
        }
    }
}

const api = KRLApi.instance;

export async function getStations() {
    var stations: Map<string, string> = new Map<string, string>;
    var areas: Array<string> = new Array<string>;

    try {
        const stationsJson = await api.callApi(encodeURIComponent("/stations"));
        if (!stationsJson || stationsJson.status != 200)
            throw new Error("failed to get stations")

        const data = stationsJson.data

        for (const station of data) {
            if (station.fg_enable == 0) {
                if (areas.length > 0) break;
                areas.push(station.sta_name)
                continue;
            }

            stations.set(station.sta_id, station.sta_name)
        }
    } catch (error: any) {
        console.error(error.message)
    }

    return {stations, areas};
}

class Train {
    id: string;
    line: string;

    constructor(id: string, line: string) {
        this.id = id
        this.line = line
    }

    public async getStops() {
        try {
            const res = await api.callApi(`/train-schedule?trainid=${this.id}`);
            if (!res || res.status != 200)
                throw new Error("failed to get stations")
            
            
        } catch (error: any) {
            console.error(error.message);
        }
    }
}
