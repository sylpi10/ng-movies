export class Movie {
    public idMovie: number;
    public title: string;
    public year: number;
    public likes: number = 0;

    public deserialize(datas: any): Movie {
        Object.assign(this, datas);
        return this;
    }
}
