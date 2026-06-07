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
        .then(res => res.ok ?
            res.json() :
            Promise.reject(new Error(`status: ${res.status}`)))
    }
}

export const api = KRLApi.instance;

export type Area = {
    area: string;
    stations: Map<string, string>;
}

export async function getStations(): Promise<Area> {
    const separateByArea = (arr: Array<any>) =>
        arr.reduce((acc: Array<any>, curr: any) =>
            curr.fg_enable == 0 ?
                [ ...acc, {
                    area: curr.sta_name, 
                    stations: new Map<string, string>
                }] :
                (({rest, last}) => 
                    [ ...rest, { 
                        ...last,
                        stations: new Map(last.stations).set(curr.sta_id, curr.sta_name)
                    }])
                ({
                    rest: acc.slice(0, -1), 
                    last: acc.at(-1)!
                }), [])

    return api.callApi("/stations")
    .then((res: { data: Array<any>, status: number }) => 
        res && res.status === 200 ?
            separateByArea(res.data)[0] :
            Promise.reject(new Error("failed to fetch stations")));
            
}

class Train {
    id: string;
    line: string;

    constructor(id: string, line: string) {
        this.id = id
        this.line = line
    }

    public async getStops() {}
}
