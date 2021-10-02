export default {
  imageName: '',
  page: 1,
  async fetchImages(imageName) {
    const response = await fetch(
      `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.imageName}&page=${this.page}&per_page=12&key=23662524-8f9d066540a3192ffa9ff9d93`,
    );
    return await response.json();
  },
};
