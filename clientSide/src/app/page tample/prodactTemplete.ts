export interface prodact{
  prodactId: number,
  pordactName: string,
  prodactImage: string,
  categoryId: number,
  typeSize: number
}
export interface demoprodact{
  prodactId: number,
  pordactName: string,
  prodactImage: string,
  typeSize: number,
  category: number
}

export interface UpDateProdact {
    prodactId: number,
    pordactName: string,
    typeSize: number
}

export interface NewOrderpordact {
    pordactId: number,
    size: Map<string,number>;
}

export interface NewOrderpordactsend {
    pordactId: number,
    sizes: Record<string,number>;
}

export interface NewOrder {
  title: string,
  userid: number
  type: string,
  date: Date,
  status: number,
  isdarft: boolean,
  prodact: NewOrderpordactsend[]
}

export interface Category {
  categoryName: string,
  categoryImage: string,
  categoryId: number
}
