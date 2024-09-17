// import axios from 'axios';

// export default async function baseQuery(props) {
//   const {
//     path,
//     method,
//     params = {},
//   } = props;

//   try {
//     return await axios({
//       baseURL: 'http://localhost:3000/api',
//       url: path,
//       params: params,
//       method: method
//     });;
//   } catch(error) {
//     console.error(error);
//     throw error;
//   }
// }

import axios, { AxiosRequestConfig } from 'axios';

interface BaseQueryProps {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'; // Add other HTTP methods as needed
  params?: Record<string, any>;
}

export default async function baseQuery(props: BaseQueryProps): Promise<any> {
  const {
    path,
    method,
    params = {},
  } = props;

  try {
    return await axios({
      baseURL: 'http://localhost:3000/api',
      url: path,
      params: params,
      method: method
    } as AxiosRequestConfig);
  } catch (error) {
    // error catcher ex. BugSnag
    console.error(error);
    throw error;
  }
}


