export interface TaxData {
  id: number;
  name: string;
  tax_value: number;
  is_active: boolean;
}

export interface HsnData {
  id: number;
  taxes_data: TaxData[];
  state_taxes_data: TaxData[];
  code: string;
}

export interface ProductImage {
  id: number;
  image: string;
  sort_order: number;
  product_id: number;
  created_at: string;
}

export interface ManufacturerData {
  id: number;
  name: string;
  description: string | null;
}

export interface BlogData {
  id: number;
  title: string;
  slug: string;
  meta_description: string;
  featured_image: string;
  created_on: string;
  updated_on: string;
  status: string;
}

export interface Product {
  id: number;
  name: string;
  thumbnail: string;
  image_data: ProductImage[];
  description: string;
  short_description: string;
  retail_with_tax: number;
  retail_without_tax: number;
  discount: number;
  dosage: string;
  frequency: string;
  duration: string;
  duration_type: string;
  after_food: boolean;
  before_food: boolean;
  hsn_data: HsnData;
  manufacturer_data: ManufacturerData;
  blogs_data: BlogData[];
  is_active: boolean;
  new: boolean;
  stocking_unit: string;
  code: string | null;
}

export interface Review {
  id: number;
  author: string;
  text: string;
  rating: number;
  created_at: string;
  modified_at: string;
  status: boolean;
  product_id: number;
}
