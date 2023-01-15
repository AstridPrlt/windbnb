  export interface Urls {
      raw: string;
      full: string;
      regular: string;
      small: string;
      thumb: string;
      small_s3: string;
  }

  export interface Links {
      self: string;
      html: string;
      download: string;
      download_location: string;
  }

  export interface UnsplashImage {
      id: string;
      width: number;
      height: number;
      color: string;
      blur_hash: string;
      description: string;
      alt_description: string;
      urls: Urls;
      links: Links;
  }


