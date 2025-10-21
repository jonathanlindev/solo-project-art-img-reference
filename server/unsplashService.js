// Unsplash API service utility

class UnsplashService {
  constructor(accessKey) {
    this.accessKey = accessKey;
    this.baseURL = 'https://api.unsplash.com';
  }

  async searchPhotos(query, page = 1, perPage = 15) {
    try {
      // normal search query
      // const response = await fetch(
      //   `${this.baseURL}/search/photos?query=${encodeURIComponent(
      //     query
      //   )}&page=${page}&per_page=${perPage}&client_id=${this.accessKey}`
      // );
      const timestampMs = Date.now();

      // random every refresh
      // const response = await fetch(
      //   `${this.baseURL}/photos/random/?query=${encodeURIComponent(
      //     query
      //   )}&count=${perPage}&timestamp=${timestampMs}&client_id=${
      //     this.accessKey
      //   }`
      // );

      // random every 10 s refresh
      const response = await fetch(
        `${this.baseURL}/photos/random/?query=${encodeURIComponent(
          query
        )}&count=${perPage}&client_id=${this.accessKey}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // console.log('data: ' + JSON.stringify(data));
      return {
        photos: data,
        total: 10,
        totalPages: 5,
      };
    } catch (error) {
      console.error('Error fetching photos:', error);
      throw error;
    }
  }

  async getRandomPhotos(count = 12, collections = null, topics = null) {
    try {
      let url = `${this.baseURL}/photos/random?count=${count}&client_id=${this.accessKey}`;

      if (collections) {
        url += `&collections=${collections}`;
      }

      if (topics) {
        url += `&topics=${topics}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching random photos:', error);
      throw error;
    }
  }

  async getPhotoStats(photoId) {
    try {
      const response = await fetch(
        `${this.baseURL}/photos/${photoId}/statistics?client_id=${this.accessKey}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching photo stats:', error);
      throw error;
    }
  }

  // Track download for Unsplash API guidelines
  async trackDownload(photoId) {
    try {
      const response = await fetch(
        `${this.baseURL}/photos/${photoId}/download?client_id=${this.accessKey}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error tracking download:', error);
      throw error;
    }
  }
}

export default UnsplashService;
