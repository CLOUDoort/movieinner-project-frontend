import { AxiosError, AxiosResponse } from "axios";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { apiInstance } from "../../apis/setting";


export const getServerSidePropsUserPosts: GetServerSideProps = async (context) => {
    const { userIdx } = context.query as any
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery(['userPosts', userIdx], () => useGetUserPosts(userIdx))
    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    }
}

export const getUserPosts = (userIdx: any) => apiInstance.get(`/community/content/user`, {
    params: {
        userIdx: userIdx
    },
    withCredentials: true
})

const useGetUserPosts = (userIdx: any) => {
    const queryFn = () => getUserPosts(userIdx)
    return useQuery<AxiosResponse<any>, AxiosError>(['userPosts', userIdx], queryFn)
}

export default useGetUserPosts
