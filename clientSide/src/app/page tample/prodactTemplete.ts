export interface prodact{
    prodactId: number,
    pordactName: string,
    prodactImage: string,
    typeSize: number
}
export interface UpDateProdact{
    prodactId: number,
    pordactName: string,
    typeSize: number
}
export interface NewOrderpordact
{
    pordactId: number,
    size: Map<string,string>;
}

export interface NewOrder
{
  title: string,
  userid: number
  type: string,
  date: Date,
  status: number,
  isdarft: boolean,
  prodact: NewOrderpordact[]
}
