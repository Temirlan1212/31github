interface IProductModelInfo {
  parameters: Record<string, string>[];
  title: string;
  price: string;
}

interface IProduct {
  title: string;
  description: string;
  images: string[];
  price: string;
  models: { title: string; info: IProductModelInfo }[];
}
