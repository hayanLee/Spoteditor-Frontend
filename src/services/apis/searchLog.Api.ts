import { AxiosInstance } from "axios";
import { SearchLogResponse, SearchLogsAddressQueryParams, SearchLogsNameQueryParams } from "./types/searchLog";


class SearchLog {
  private axios;
  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async getSearchNameLogs(params: SearchLogsNameQueryParams): Promise<SearchLogResponse> {
    const response = await this.axios.get('api/search/placelogs/name', { params });
    return response.data;
  }

  async getSearchAddresLogs(params: SearchLogsAddressQueryParams): Promise<SearchLogResponse> {
    const response = await this.axios.get('api/search/placelogs/address', { params });
    return response.data;
  }
}

export default SearchLog;