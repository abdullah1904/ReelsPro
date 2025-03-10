import { IVideo } from "@/models/Video";
import axios, { AxiosResponse } from "axios";

type FetchOptions = {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
    body?: unknown | null,
    headers?: Record<string, string>,
}


class ApiClient {
    private async fetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
        const { method = "GET", body, headers = {} } = options;
        try{

            let response: AxiosResponse<T> = {} as AxiosResponse<T>;
            if(method === 'GET'){
                response = await axios.get(`/api${endpoint}`, { headers });
            }
            if(method === 'POST'){
                response = await axios.post(`/api${endpoint}`, body, { headers });
            }
            if(method === 'PUT'){
                response = await axios.put(`/api${endpoint}`, body, { headers });
            }
            if(method === 'DELETE'){
                response = await axios.delete(`/api${endpoint}`, { headers });
            }
            return response.data;
        }
        catch(error){
            console.error(error);
            throw error;
        }
    }
    async getVideos (){
        return this.fetch<IVideo[]>('/videos')
    }
    async getVideo (id: string){
        return this.fetch<IVideo>(`/videos/${id}`)
    }
    async createVideo (video: Omit<IVideo, '_id'>){
        return this.fetch<IVideo>('/videos', { method: 'POST', body: video })
    }
}

export const apiClient = new ApiClient();