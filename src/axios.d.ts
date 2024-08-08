import 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    useAuth?: boolean; // Добавляем новое свойство useAuth
  }
}