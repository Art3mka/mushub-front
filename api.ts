import { Drivers, UpdateTrip } from '../../components/DriversTable/types';
import { makeRequest } from '../makeRequest';
import { AssignDriver, ITrip, RequestEnum } from '../types';

const url = "http://199.247.18.191:7777";
interface IAuthData {
    login: string;
    password: string;
}

export const getAuth = async (authData: IAuthData) => {
    console.log(authData);

    const { data } = await makeRequest({
        url: `${url}/api/auth/admin`,
        method: RequestEnum.POST,
        data: authData,
    });

    return data;
};

export const getOrders = async (token: string) => {
    const { data } = await makeRequest({
        url: `${url}/api/orders`,
        method: RequestEnum.GET,
        headers: {
            Authorization: `bearer ${token}`,
        },
        mode: 'cors',
    });

    return data;
};

export const getDrivers = async (token: string) => {
    const { data } = await makeRequest({
        url: `${url}/users`,
        method: RequestEnum.GET,
        headers: {
            Authorization: `bearer ${token}`,
        },
    });
    console.log(token)
    return data;
};

export const createOrder = async (postData: any, token: string) => {
    const { data } = await makeRequest({
        url: `${url}/api/orders`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        method: RequestEnum.POST,
        data: postData,
    });

    return data;
};
export const createDriver = async (postData: Drivers, token: string) => {
    const { login, password, phone } = postData;
    const { data } = await makeRequest({
        url: `${url}/users/drivers?Login=${login}&Password=${password}&Phone=${phone}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        method: RequestEnum.POST,
        data: postData,
    });

    return data;
};

export const updateOrder = async (postData: any, token: string) => {
    const { data } = await makeRequest({
        url: `${url}/api/orders`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        method: RequestEnum.PATCH,
        data: postData,
    });

    return data;
};

export const deleteOrder = async (orderId: number, token: string) => {
    const { data } = await makeRequest({
        url: `${url}/api/orders/cancel?orderToDeleteId=${orderId}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        method: RequestEnum.DELETE,
    });

    return data;
};

export const deleteDriver = async (userId: number, token: string) => {
    const { data } = await makeRequest({
        url: `${url}/users?userId=${userId}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        method: RequestEnum.DELETE,
    });

    return data;
};

export const updateDriver = async (postData: Drivers, token: string) => {
    const { data } = await makeRequest({
        url: `${url}/users/updateDriver`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        method: RequestEnum.PATCH,
        data: postData,
    });

    return data;
};

export const assignDriver = async (postData: AssignDriver, token: string) => {
    const { data } = await makeRequest({
        url: `${url}/api/trips/assign`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        method: RequestEnum.PUT,
        data: postData,
    });

    return data;
};

export const deleteTrip = async (
    tripId: number,
    token: string
) => {
    const { data } = await makeRequest({
        url: `${url}/api/trips/${tripId}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        method: RequestEnum.DELETE,
    });

    return data;
};

export const getRoutes = async () => {
    const { data } = await makeRequest({
        url: `${url}/api/routes`,
        method: RequestEnum.GET,
    });

    return data;
};

export const getTrips = async (id: string, date: number) => {
    const { data } = await makeRequest({
        url: `${url}/api/trips?RouteId=${id}&DayOfWeekNumber=${date}`,
        method: RequestEnum.GET,
    });

    return data;
};

export const getAllTrips = async () => {
    const { data } = await makeRequest({
        url: `${url}/api/trips/getAll`,
        method: RequestEnum.GET,
    });

    return data;
};

export const createTrip = async (postData: ITrip, token: string) => {
    const { data } = await makeRequest({
        url: `${url}/api/trips`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        method: RequestEnum.POST,
        data: postData,
    });

    return data;
};

export const updateTrip = async (postData: UpdateTrip, token: string) => {
    const { data } = await makeRequest({
        url: `${url}/api/trips`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        method: RequestEnum.PUT,
        data: postData,
    });

    return data;
};
