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

export type Area = {
    area: string;
    stations: Map<string, string>;
}

export async function getStations() {
    return api.callApi("/stations")
    .then((res: { data: Array<any>, status: number }) => {
        if (!res || res.status != 200)
            throw new Error("failed to get stations")

        const area = res.data
        .reduce((acc: Array<Area>, curr: any) => {
            if (curr.fg_enable == 0)
                acc.push({ area: curr.sta_name, stations: new Map<string, string> });
            else
                acc.at(-1)?.stations.set(curr.sta_id, curr.sta_name);

            return acc;
        }, []);

        const jabodetabek = area[0]

        return jabodetabek;
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
