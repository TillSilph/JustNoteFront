import axios from 'axios';
import { useMutation, useQueryClient } from "react-query";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_NOTION_URL??'http://localhost:9010/',
    timeout: 10000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});


export async function getNotes() {
    const { data } = await apiClient.get("/notes")
    return data;
}
export async function makeNote(note) {
    const { data } = await apiClient.post("/notes", note)

    return data;
}
export async function editNote(note) {
    const { data } = await apiClient.patch("/notes/"+note.id, note)

    return data;
}
export async function deleteNote(note) {
    const { data } = await apiClient.delete("/notes/"+note.id)

    return data;
}


// export const useAcceptFriend = ()=>{
//     // const queryClient = useQueryClient();

//     return useMutation(
//         (login) => acceptFriend(login),
//         {
//             onSuccess: (newFriend) => {
//                 toast.success("Запрос принят")
//             },
//             onError: (error) => {
//                 toast.error("Что-то пошло не так.");
//             },
//         }
//     );
// }
