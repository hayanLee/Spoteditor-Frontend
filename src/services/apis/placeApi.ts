import { AxiosInstance } from 'axios';

class PlaceAPI {
  #axios;
  constructor(axios: AxiosInstance) {
    this.#axios = axios;
  }
  // 장소 북마크
  async addPlaceBookMark(placeId: number) {
    try {
      const path = `/api/bookmark`;
      const res = await this.#axios.post(path, { placeId });
      console.log('장소 북마크 추가', res);
      // if (res.status !== 201) throw new Error('장소 북마크 실패');
    } catch (error) {
      console.log(error);
    }
  }

  async deletePlaceBookMark(placeId: number) {
    try {
      const path = `/api/bookmark`;
      const res = await this.#axios.delete(path, { data: { placeId } });
      console.log('장소 북마크 삭제', res);
      // if (res.status !== 204) throw new Error('장소 북마크 삭제 실패');
    } catch (error) {
      console.log(error);
    }
  }
}

export default PlaceAPI;
