class KRLApi {
    static #instance: KRLApi;
    private url: string;

    private constructor() {
        this.url = "https://cors.kendy.online?" + "https://kci.id/api/krl";
    }

    public static get instance() {
        if (!this.#instance)
            this.#instance = new KRLApi;
        return this.#instance;
    }

    public async callApi(path: string) {
        return fetch(this.url + path)
        .then(res => {
            if (!res.ok)
                throw new Error(`status: ${res.status}`);

            return res.json();
        })
    }
}

export const api = KRLApi.instance;

export async function getStations() {
    return api.callApi("/stations")
    .then(stationsJson => {
        let stations: Map<string, string> = new Map<string, string>;
        let areas: Array<string> = new Array<string>;

        if (!stationsJson || stationsJson.status != 200)
            throw new Error("failed to get stations")

        for (const station of stationsJson.data) {
            if (station.fg_enable == 0) {
                if (areas.length > 0) break;
                areas.push(station.sta_name)
                continue;
            }

            stations.set(station.sta_id, station.sta_name)
        }

        return {stations, areas};
    })
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
