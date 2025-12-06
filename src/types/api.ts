export interface ApiPartialResponse {
    products: Product[];
    categories: Category[];
    special_project_parameters_json?: {
        fast_search_strings?: {
            parameters_list: string[];
        };
    };
}

// === Product ===
export interface Image {
    Image_URL?: string;
    image_url?: string;
    MainImage?: boolean;
    title?: string;
}

export interface Mark {
    Mark_Name: string;
    color_code: string;
}

export interface Product {
    id: number;
    name: string;
    price: number;
    old_price: number | null;
    images: Image[];
    marks: Mark[];
}

  // === Category ===
export interface Category {
    Category_ID: number;
    Category_Name: string;
    Category_Image: string;
}

  // === Fast search ===
export type FastSearchString = string;